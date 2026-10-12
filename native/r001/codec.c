/* LabOS R001 production codec boundary: one LJ01 frame, direct libjpeg API.
 * The process installs its own Windows Job Object before reading stdin. */
#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <fcntl.h>
#include <io.h>
#include <setjmp.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <jpeglib.h>

#define MAX_INPUT 33554432U
#define MAX_AXIS 9000U
#define MAX_PIXELS 50000000ULL
#define PRIVATE_LIMIT ((SIZE_T)384U * 1024U * 1024U)

typedef struct { struct jpeg_error_mgr base; jmp_buf jump; } StrictError;
typedef struct {
  struct jpeg_decompress_struct jpeg;
  StrictError error;
  unsigned char *encoded;
  unsigned char *row;
  size_t encoded_allocated;
  int jpeg_created;
} DecodeState;

static void fail_decoder(j_common_ptr context) {
  StrictError *error = (StrictError *)context->err;
  longjmp(error->jump, 1);
}

static void fail_warning(j_common_ptr context, int level) {
  if (level < 0) fail_decoder(context);
}

static DWORD WINAPI watch_parent(void *value) {
  HANDLE parent = (HANDLE)value;
  if (WaitForSingleObject(parent, INFINITE) == WAIT_OBJECT_0)
    TerminateProcess(GetCurrentProcess(), 5);
  return 0;
}

static int establish_containment(const char *parent_text, HANDLE *job_out,
                                 HANDLE *parent_out) {
  char *end = NULL;
  unsigned long pid;
  HANDLE parent, job, watcher;
  JOBOBJECT_EXTENDED_LIMIT_INFORMATION limits;
  if (!parent_text || !*parent_text) return 0;
  pid = strtoul(parent_text, &end, 10);
  if (*end || !pid || pid > UINT32_MAX || pid == GetCurrentProcessId()) return 0;
  parent = OpenProcess(SYNCHRONIZE | PROCESS_QUERY_LIMITED_INFORMATION,
                       FALSE, (DWORD)pid);
  if (!parent || WaitForSingleObject(parent, 0) != WAIT_TIMEOUT) {
    if (parent) CloseHandle(parent);
    return 0;
  }
  job = CreateJobObjectW(NULL, NULL);
  if (!job) { CloseHandle(parent); return 0; }
  memset(&limits, 0, sizeof limits);
  limits.BasicLimitInformation.LimitFlags =
      JOB_OBJECT_LIMIT_PROCESS_MEMORY | JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE;
  limits.ProcessMemoryLimit = PRIVATE_LIMIT;
  if (!SetInformationJobObject(job, JobObjectExtendedLimitInformation,
                               &limits, sizeof limits) ||
      !AssignProcessToJobObject(job, GetCurrentProcess())) {
    CloseHandle(job);
    CloseHandle(parent);
    return 0;
  }
  watcher = CreateThread(NULL, 0, watch_parent, parent, 0, NULL);
  if (!watcher) { CloseHandle(job); CloseHandle(parent); return 0; }
  CloseHandle(watcher);
  *job_out = job;
  *parent_out = parent;
  return 1;
}

static int read_exact(unsigned char *target, size_t length) {
  while (length) {
    size_t n = fread(target, 1, length, stdin);
    if (!n) return 0;
    target += n;
    length -= n;
  }
  return 1;
}

static int read_frame(DecodeState *state, unsigned long *length) {
  unsigned char header[8];
  uint32_t count;
  if (!read_exact(header, sizeof header) || memcmp(header, "LJ01", 4)) return 0;
  count = (uint32_t)header[4] | ((uint32_t)header[5] << 8) |
          ((uint32_t)header[6] << 16) | ((uint32_t)header[7] << 24);
  if (!count || count > MAX_INPUT) return 0;
  state->encoded = (unsigned char *)malloc(count);
  state->encoded_allocated = count;
  if (!state->encoded || !read_exact(state->encoded, count)) return 0;
  if (fgetc(stdin) != EOF || ferror(stdin)) return 0;
  *length = (unsigned long)count;
  return 1;
}

static int decode(DecodeState *state, unsigned long length,
                  unsigned int *width, unsigned int *height,
                  int *components, unsigned int *scanlines) {
  struct jpeg_decompress_struct *jpeg = &state->jpeg;
  JSAMPROW row[1];
  size_t row_bytes;
  if (setjmp(state->error.jump)) return 0;
  jpeg->err = jpeg_std_error(&state->error.base);
  state->error.base.error_exit = fail_decoder;
  state->error.base.emit_message = fail_warning;
  jpeg_create_decompress(jpeg);
  state->jpeg_created = 1;
  jpeg_mem_src(jpeg, state->encoded, length);
  if (jpeg_read_header(jpeg, TRUE) != JPEG_HEADER_OK ||
      jpeg->data_precision != 8 ||
      (jpeg->num_components != 1 && jpeg->num_components != 3) ||
      !jpeg->image_width || !jpeg->image_height ||
      jpeg->image_width > MAX_AXIS || jpeg->image_height > MAX_AXIS ||
      (uint64_t)jpeg->image_width * jpeg->image_height > MAX_PIXELS) return 0;
  jpeg->out_color_space = jpeg->num_components == 1 ? JCS_GRAYSCALE : JCS_RGB;
  if (!jpeg_start_decompress(jpeg) ||
      jpeg->output_width != jpeg->image_width ||
      jpeg->output_height != jpeg->image_height ||
      (jpeg->output_components != 1 && jpeg->output_components != 3) ||
      jpeg->output_width > SIZE_MAX / jpeg->output_components) return 0;
  row_bytes = (size_t)jpeg->output_width * jpeg->output_components;
  state->row = (unsigned char *)malloc(row_bytes);
  if (!state->row) return 0;
  row[0] = state->row;
  while (jpeg->output_scanline < jpeg->output_height) {
    if (jpeg_read_scanlines(jpeg, row, 1) != 1) return 0;
  }
  if (jpeg->output_scanline != jpeg->output_height ||
      !jpeg_finish_decompress(jpeg)) return 0;
  *width = (unsigned int)jpeg->image_width;
  *height = (unsigned int)jpeg->image_height;
  *components = jpeg->num_components;
  *scanlines = (unsigned int)jpeg->output_scanline;
  return 1;
}

int main(int argc, char **argv) {
  HANDLE job = NULL, parent = NULL;
  DecodeState *state;
  unsigned long length = 0;
  unsigned int width = 0, height = 0, scanlines = 0;
  int components = 0, result = 4;
  if (argc != 2 || !establish_containment(argv[1], &job, &parent)) return 4;
  if (_setmode(_fileno(stdin), _O_BINARY) == -1 ||
      _setmode(_fileno(stdout), _O_BINARY) == -1) goto done;
  state = (DecodeState *)calloc(1, sizeof *state);
  if (!state) goto done;
  if (!read_frame(state, &length)) { result = 2; goto cleanup; }
  if (!decode(state, length, &width, &height, &components, &scanlines)) {
    result = 3; goto cleanup;
  }
  if (printf("LJ01 OK %u %u %d %u\n", width, height, components, scanlines) < 0 ||
      fflush(stdout) != 0) goto cleanup;
  result = 0;
cleanup:
  if (state->jpeg_created) jpeg_destroy_decompress(&state->jpeg);
  free(state->row);
  if (state->encoded) SecureZeroMemory(state->encoded, state->encoded_allocated);
  free(state->encoded);
  free(state);
done:
  /* Keep the self-assigned kill-on-close Job handle open until process exit.
   * Closing it here would terminate this process before its result is returned. */
  (void)parent;
  (void)job;
  return result;
}
