/* Test-only launcher: puts containment-test in an outer host Job Object. */
#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <stdio.h>
#include <string.h>

int main(int argc, char **argv) {
  HANDLE job;
  JOBOBJECT_EXTENDED_LIMIT_INFORMATION limits;
  STARTUPINFOA startup;
  PROCESS_INFORMATION child;
  char command[4096];
  DWORD exit_code = 0;
  if (argc != 2) return 4;
  job = CreateJobObjectW(NULL, NULL);
  if (!job) return 4;
  memset(&limits, 0, sizeof limits);
  limits.BasicLimitInformation.LimitFlags = JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE;
  if (!SetInformationJobObject(job, JobObjectExtendedLimitInformation,
                               &limits, sizeof limits)) return 4;
  memset(&startup, 0, sizeof startup);
  memset(&child, 0, sizeof child);
  startup.cb = sizeof startup;
  if (_snprintf_s(command, sizeof command, _TRUNCATE,
                  "\"%s\" %lu", argv[1], GetCurrentProcessId()) < 0) return 4;
  if (!CreateProcessA(argv[1], command, NULL, NULL, FALSE,
                      CREATE_SUSPENDED | CREATE_NO_WINDOW, NULL, NULL,
                      &startup, &child)) return 4;
  if (!AssignProcessToJobObject(job, child.hProcess)) {
    TerminateProcess(child.hProcess, 5);
    return 4;
  }
  ResumeThread(child.hThread);
  if (WaitForSingleObject(child.hProcess, 5000) != WAIT_OBJECT_0 ||
      !GetExitCodeProcess(child.hProcess, &exit_code)) {
    TerminateProcess(child.hProcess, 5);
    return 4;
  }
  CloseHandle(child.hThread);
  CloseHandle(child.hProcess);
  CloseHandle(job);
  if (exit_code != 0) return 3;
  puts("NESTED JOB OK");
  return 0;
}
