/* Test-only executable: compiles the production containment function in place. */
#define main r001_production_main
#include "codec.c"
#undef main

int main(int argc, char **argv) {
  HANDLE job = NULL, parent = NULL;
  JOBOBJECT_EXTENDED_LIMIT_INFORMATION limits;
  void *too_large;
  if ((argc != 2 && argc != 3) || !establish_containment(argv[1], &job, &parent)) return 4;
  memset(&limits, 0, sizeof limits);
  if (!QueryInformationJobObject(job, JobObjectExtendedLimitInformation,
                                 &limits, sizeof limits, NULL)) return 3;
  if (!(limits.BasicLimitInformation.LimitFlags & JOB_OBJECT_LIMIT_PROCESS_MEMORY) ||
      !(limits.BasicLimitInformation.LimitFlags & JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE) ||
      limits.ProcessMemoryLimit != PRIVATE_LIMIT) return 3;
  too_large = VirtualAlloc(NULL, PRIVATE_LIMIT + 1, MEM_RESERVE | MEM_COMMIT,
                           PAGE_READWRITE);
  if (too_large) { VirtualFree(too_large, 0, MEM_RELEASE); return 2; }
  if (argc == 3 && strcmp(argv[2], "--wait") == 0) {
    puts("READY");
    fflush(stdout);
    Sleep(30000);
    return 6;
  }
  puts("CONTAINMENT OK");
  (void)parent;
  (void)job;
  return 0;
}
