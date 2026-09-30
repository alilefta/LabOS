/* Offline R001 codec-completion probe. Not an application validator. */
#include <limits.h>
#include <fcntl.h>
#include <io.h>
#include <setjmp.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <jpeglib.h>

#define MAX_INPUT_BYTES 33554432U
#define MAX_AXIS 9000U
#define MAX_PIXELS 50000000U

typedef struct {
  struct jpeg_error_mgr base;
  jmp_buf jump;
  int kind;
  int message_code;
} FatalError;

typedef struct {
  struct jpeg_decompress_struct decoder;
  FatalError error;
  unsigned char *input;
  unsigned char *row;
  int decoder_created;
} State;

static void fatal_error(j_common_ptr decoder) {
  FatalError *error = (FatalError *)decoder->err;
  error->kind = 1;
  error->message_code = decoder->err->msg_code;
  longjmp(error->jump, 1);
}

static void fatal_warning(j_common_ptr decoder, int level) {
  if (level < 0) {
    FatalError *error = (FatalError *)decoder->err;
    error->kind = 2;
    error->message_code = decoder->err->msg_code;
    longjmp(error->jump, 1);
  }
}

static int read_exact(unsigned char *destination, size_t length) {
  while (length != 0) {
    size_t count = fread(destination, 1, length, stdin);
    if (count == 0) return 0;
    destination += count;
    length -= count;
  }
  return 1;
}

static int read_frame(State *state, unsigned long *length) {
  unsigned char header[8];
  uint32_t count;
  if (!read_exact(header, sizeof header)) return 0;
  if (memcmp(header, "LJ01", 4) != 0) return 0;
  count = (uint32_t)header[4] | ((uint32_t)header[5] << 8) |
          ((uint32_t)header[6] << 16) | ((uint32_t)header[7] << 24);
  if (count == 0 || count > MAX_INPUT_BYTES) return 0;
  state->input = (unsigned char *)malloc(count);
  if (state->input == NULL) return 0;
  if (!read_exact(state->input, count)) return 0;
  if (fgetc(stdin) != EOF || ferror(stdin)) return 0;
  *length = (unsigned long)count;
  return 1;
}

static int decode(State *state, unsigned long length) {
  struct jpeg_decompress_struct *decoder = &state->decoder;
  JSAMPROW rows[1];
  size_t row_bytes;
  if (setjmp(state->error.jump) != 0) return 0;

  decoder->err = jpeg_std_error(&state->error.base);
  state->error.base.error_exit = fatal_error;
  state->error.base.emit_message = fatal_warning;
  state->decoder_created = 1;
  jpeg_create_decompress(decoder);
  jpeg_mem_src(decoder, state->input, length);
  if (jpeg_read_header(decoder, TRUE) != JPEG_HEADER_OK) return 0;
  if (decoder->data_precision != 8 ||
      (decoder->num_components != 1 && decoder->num_components != 3) ||
      decoder->image_width == 0 || decoder->image_height == 0 ||
      decoder->image_width > MAX_AXIS || decoder->image_height > MAX_AXIS ||
      (uint64_t)decoder->image_width * decoder->image_height > MAX_PIXELS)
    return 0;

  decoder->out_color_space = decoder->num_components == 1 ? JCS_GRAYSCALE : JCS_RGB;
  if (!jpeg_start_decompress(decoder)) return 0;
  if (decoder->output_width != decoder->image_width ||
      decoder->output_height != decoder->image_height ||
      (decoder->output_components != 1 && decoder->output_components != 3) ||
      decoder->output_width > SIZE_MAX / decoder->output_components)
    return 0;
  row_bytes = (size_t)decoder->output_width * decoder->output_components;
  state->row = (unsigned char *)malloc(row_bytes);
  if (state->row == NULL) return 0;
  rows[0] = state->row;

  while (decoder->output_scanline < decoder->output_height) {
    if (jpeg_read_scanlines(decoder, rows, 1) != 1) return 0;
  }
  if (decoder->output_scanline != decoder->output_height) return 0;
  if (!jpeg_finish_decompress(decoder)) return 0;
  printf("LJ01 OK %u %u %d %u\n", (unsigned int)decoder->image_width,
         (unsigned int)decoder->image_height, decoder->num_components,
         (unsigned int)decoder->output_scanline);
  return 1;
}

int main(void) {
  State *state = (State *)calloc(1, sizeof *state);
  unsigned long length = 0;
  int result = 0;
  if (state == NULL) return 4;
  if (_setmode(_fileno(stdin), _O_BINARY) == -1 ||
      _setmode(_fileno(stdout), _O_BINARY) == -1) {
    free(state);
    return 4;
  }
  if (!read_frame(state, &length)) {
    puts("LJ01 ERR FRAME");
    result = 2;
  } else if (!decode(state, length)) {
    printf("LJ01 ERR DECODE %d %d\n", state->error.kind,
           state->error.message_code);
    result = 3;
  }
  if (state->decoder_created) jpeg_destroy_decompress(&state->decoder);
  free(state->row);
  free(state->input);
  free(state);
  return result;
}
