// Non-production R001 structural probe. Decoder validation is a separate step.
export const APPROVED = Object.freeze({
  maxEncodedBytes: 33_554_432,
  maxWidth: 9_000,
  maxHeight: 9_000,
  maxDecodedPixels: 50_000_000,
  maxMetadataBytes: 262_144,
});

const SOF = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
const NO_LENGTH = new Set([0xd8, 0xd9, 0x01, 0xd0, 0xd1, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7]);

function reject(reason) {
  throw new Error(reason);
}

export function inspectJpeg(bytes, { maxSegmentCount, maxProgressiveScans, signal } = {}) {
  if (!Number.isSafeInteger(maxSegmentCount) || maxSegmentCount < 1) reject('segment control required');
  if (!Number.isSafeInteger(maxProgressiveScans) || maxProgressiveScans < 1) reject('scan control required');
  if (!(bytes instanceof Uint8Array) || bytes.length === 0) reject('empty input');
  if (bytes.length > APPROVED.maxEncodedBytes) reject('encoded bytes exceeded');
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) reject('missing SOI');

  let pos = 2;
  let inEntropy = false;
  let sawFrame = false;
  let progressive = false;
  let width = 0;
  let height = 0;
  let components = 0;
  let segments = 0;
  let scans = 0;
  let metadataBytes = 0;
  let expectedRestart = null;

  while (pos < bytes.length) {
    if (signal?.aborted) reject('aborted');
    if (inEntropy) {
      // Entropy-coded data may contain FF00 byte stuffing, FF fill and restart
      // markers. Every other marker exits the scan and is parsed below.
      while (pos < bytes.length && bytes[pos] !== 0xff) {
        if ((pos & 0xffff) === 0 && signal?.aborted) reject('aborted');
        pos++;
      }
      if (pos === bytes.length) reject('truncated entropy');
      const markerStart = pos;
      while (pos < bytes.length && bytes[pos] === 0xff) pos++;
      if (pos === bytes.length) reject('truncated marker');
      const marker = bytes[pos++];
      if (marker === 0x00) continue;
      if (marker >= 0xd0 && marker <= 0xd7) {
        if (expectedRestart === null) reject('restart without DRI');
        if (marker !== 0xd0 + expectedRestart) reject('restart order');
        expectedRestart = (expectedRestart + 1) & 7;
        continue;
      }
      inEntropy = false;
      pos = markerStart;
    }

    if (bytes[pos++] !== 0xff) reject('expected marker');
    while (pos < bytes.length && bytes[pos] === 0xff) pos++;
    if (pos === bytes.length) reject('truncated marker');
    const marker = bytes[pos++];
    if (marker === 0x00) reject('stuffing outside entropy');
    if (marker === 0xd9) {
      if (!sawFrame || scans === 0) reject('EOI before image');
      if (pos !== bytes.length) reject('trailing bytes');
      return { width, height, pixels: width * height, components, progressive, segments, scans, metadataBytes };
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) reject('unexpected standalone marker');
    if (NO_LENGTH.has(marker)) reject('unexpected marker');
    if (pos + 2 > bytes.length) reject('truncated length');
    const length = (bytes[pos] << 8) | bytes[pos + 1];
    if (length < 2 || pos + length > bytes.length) reject('malformed segment length');
    const start = pos + 2;
    const end = pos + length;
    const payload = length - 2;
    pos = end;
    if (++segments > maxSegmentCount) reject('segment count exceeded');

    if ((marker >= 0xe0 && marker <= 0xef) || marker === 0xfe) {
      metadataBytes += payload;
      if (metadataBytes > APPROVED.maxMetadataBytes) reject('metadata bytes exceeded');
    }
    if (SOF.has(marker)) {
      if (sawFrame || scans) reject('multiple frames');
      if (marker !== 0xc0 && marker !== 0xc2) reject('unsupported coding');
      if (payload < 6 || bytes[start] !== 8) reject('unsupported precision');
      height = (bytes[start + 1] << 8) | bytes[start + 2];
      width = (bytes[start + 3] << 8) | bytes[start + 4];
      components = bytes[start + 5];
      if (components !== 1 && components !== 3) reject('unsupported components');
      if (payload !== 6 + components * 3) reject('malformed SOF');
      if (!width || !height || width > APPROVED.maxWidth || height > APPROVED.maxHeight || BigInt(width) * BigInt(height) > BigInt(APPROVED.maxDecodedPixels)) reject('dimensions exceeded');
      progressive = marker === 0xc2;
      sawFrame = true;
    } else if (marker === 0xda) {
      if (!sawFrame || payload < 4) reject('SOS before frame');
      const scanComponents = bytes[start];
      if (scanComponents < 1 || scanComponents > components || payload !== 1 + scanComponents * 2 + 3) reject('malformed SOS');
      if (++scans > maxProgressiveScans) reject('scan count exceeded');
      expectedRestart = expectedRestart === null ? null : 0;
      inEntropy = true;
    } else if (marker === 0xdd) {
      if (payload !== 2) reject('malformed DRI');
      const interval = (bytes[start] << 8) | bytes[start + 1];
      expectedRestart = interval ? 0 : null;
    } else if (marker !== 0xc4 && marker !== 0xdb && marker !== 0xdd && marker !== 0xfe && !(marker >= 0xe0 && marker <= 0xef)) {
      reject('unsupported marker');
    }
  }
  reject('missing EOI');
}
