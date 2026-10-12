param(
    [Parameter(Mandatory = $true)][string]$InstallerPath
)
$ErrorActionPreference = 'Stop'
$repo = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$installer = [System.IO.Path]::GetFullPath($InstallerPath)
$expectedInstaller = '662761d8ba8dae04aec74023ebaeceb856c2b56b9b59cfd180759d26300dda42'
$expectedHeader = 'ea0fbba47e9e5da192a487df4df3cf01a338b86a0a85d154ef329dd7b5439043'
$expectedLibrary = 'b9640752d84cfbac3efcce70096c3a586ab6ad95b1163541ba9a11446a3337cc'
$expectedLicense = 'cff8701dc999e39b5044ece8f22ed65b3a10d6a8dbddca8ffb802d24580181db'
$expectedIjg = 'db16a04128171879c60708d171b88d97345a2dd20f9bfc173680a4497c73f704'
function Hash([string]$path) { (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash.ToLowerInvariant() }
if ((Hash $installer) -ne $expectedInstaller) { throw 'Pinned installer hash mismatch' }
if ((Get-AuthenticodeSignature -LiteralPath $installer).Status -ne 'Valid') { throw 'Installer signature invalid' }
$sevenZip = 'C:\Program Files\7-Zip\7z.exe'
$vcvars = 'F:\Microsoft Visual Studio 2022\VC\Auxiliary\Build\vcvars64.bat'
$compiler = 'F:\Microsoft Visual Studio 2022\VC\Tools\MSVC\14.44.35207\bin\Hostx64\x64\cl.exe'
$linker = 'F:\Microsoft Visual Studio 2022\VC\Tools\MSVC\14.44.35207\bin\Hostx64\x64\link.exe'
foreach ($tool in @($sevenZip, $vcvars, $compiler, $linker)) {
    if (-not (Test-Path -LiteralPath $tool)) { throw 'Approved build tool unavailable' }
}
$run = Join-Path ([System.IO.Path]::GetTempPath()) ('labos-r001-build-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $run | Out-Null
try {
    $extract = Join-Path $run 'extracted'
    & $sevenZip x $installer ('-o' + $extract) -y | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'Extraction failed' }
    $header = Join-Path $extract 'include\jpeglib.h'
    $library = Join-Path $extract 'lib\jpeg-static.lib'
    $license = Join-Path $extract 'doc\LICENSE.md'
    $ijg = Join-Path $extract 'doc\README.ijg'
    if ((Hash $header) -ne $expectedHeader -or (Hash $library) -ne $expectedLibrary -or
        (Hash $license) -ne $expectedLicense -or (Hash $ijg) -ne $expectedIjg) {
        throw 'Extracted pinned component mismatch'
    }
    $source = Join-Path $PSScriptRoot 'codec.c'
    $output = Join-Path $repo 'native\bin\win32-x64\r001-codec.exe'
    $object = Join-Path $run 'r001-codec.obj'
    $batch = Join-Path $run 'compile.cmd'
    @(
        '@echo off',
        "call `"$vcvars`" >nul",
        'if errorlevel 1 exit /b 1',
        "cl /nologo /std:c11 /TC /W4 /WX /wd4324 /I`"$(Join-Path $extract 'include')`" /Fo:`"$object`" /Fe:`"$output`" `"$source`" /link /Brepro `"$library`""
    ) | Set-Content -LiteralPath $batch -Encoding ascii
    & cmd /c $batch
    if ($LASTEXITCODE -ne 0) { throw 'Native build failed' }
    Copy-Item -LiteralPath $license -Destination (Join-Path $PSScriptRoot 'LICENSE.libjpeg-turbo.md')
    Copy-Item -LiteralPath $ijg -Destination (Join-Path $PSScriptRoot 'README.ijg')
    $manifest = [ordered]@{
        protocol = 'LJ01'
        platform = 'win32'
        architecture = 'x64'
        libjpegTurboVersion = '3.2.0'
        installerSha256 = $expectedInstaller
        headerSha256 = $expectedHeader
        staticLibrarySha256 = $expectedLibrary
        sourceSha256 = Hash $source
        executableSha256 = Hash $output
        compilerVersion = (Get-Item -LiteralPath $compiler).VersionInfo.FileVersion
        linkerVersion = (Get-Item -LiteralPath $linker).VersionInfo.FileVersion
        flags = '/std:c11 /TC /W4 /WX /wd4324 /link /Brepro'
    }
    $manifest | ConvertTo-Json -Depth 3 | Set-Content -LiteralPath (Join-Path $repo 'native\bin\win32-x64\r001-codec.manifest.json') -Encoding utf8
    $manifest | ConvertTo-Json -Compress
} finally {
    $fullRun = [System.IO.Path]::GetFullPath($run).TrimEnd('\')
    $tempRoot = [System.IO.Path]::GetFullPath([System.IO.Path]::GetTempPath()).TrimEnd('\')
    if (-not $fullRun.StartsWith($tempRoot + '\', [System.StringComparison]::OrdinalIgnoreCase) -or
        -not [System.IO.Path]::GetFileName($fullRun).StartsWith('labos-r001-build-')) {
        throw 'Unsafe temporary cleanup path'
    }
    Remove-Item -LiteralPath $fullRun -Recurse -Force
}
