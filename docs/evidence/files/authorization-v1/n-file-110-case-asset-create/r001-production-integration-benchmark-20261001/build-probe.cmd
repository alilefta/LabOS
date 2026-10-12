@echo off
call "F:\Microsoft Visual Studio 2022\VC\Auxiliary\Build\vcvars64.bat" >nul
if errorlevel 1 exit /b 1
cl /nologo /std:c11 /TC /W4 /WX /wd4324 /I"C:\Users\alnaseem\AppData\Local\Temp\labos-r001-archbench-20261001-d3ffcab0ddd1\extracted\include" /Fo:"C:\Users\alnaseem\AppData\Local\Temp\labos-r001-archbench-20261001-d3ffcab0ddd1\r001-codec-probe.obj" /Fe:"C:\Users\alnaseem\AppData\Local\Temp\labos-r001-archbench-20261001-d3ffcab0ddd1\r001-codec-probe.exe" "F:\Software_Engineering\Phase 1 Web Development\Project 7 Freelancer Command Center\next-projects\lab-os-project-4\scripts\authorization\files\jpeg-r001\native-helper-feasibility.c" /link "C:\Users\alnaseem\AppData\Local\Temp\labos-r001-archbench-20261001-d3ffcab0ddd1\extracted\lib\jpeg-static.lib"
