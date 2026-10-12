param([Parameter(Mandatory = $true)][string]$InstallerPath)
$ErrorActionPreference = 'Stop'
$installer = [System.IO.Path]::GetFullPath($InstallerPath)
function Hash([string]$path) { (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash.ToLowerInvariant() }
if ((Hash $installer) -ne '662761d8ba8dae04aec74023ebaeceb856c2b56b9b59cfd180759d26300dda42' -or
    (Get-AuthenticodeSignature -LiteralPath $installer).Status -ne 'Valid') { throw 'Pinned installer attestation failed' }
$run = Join-Path ([System.IO.Path]::GetTempPath()) ('labos-r001-containment-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $run | Out-Null
try {
    $extract = Join-Path $run 'extracted'
    & 'C:\Program Files\7-Zip\7z.exe' x $installer ('-o' + $extract) -y | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'Extraction failed' }
    $header = Join-Path $extract 'include\jpeglib.h'
    $library = Join-Path $extract 'lib\jpeg-static.lib'
    if ((Hash $header) -ne 'ea0fbba47e9e5da192a487df4df3cf01a338b86a0a85d154ef329dd7b5439043' -or
        (Hash $library) -ne 'b9640752d84cfbac3efcce70096c3a586ab6ad95b1163541ba9a11446a3337cc') { throw 'Pinned component mismatch' }
    $vcvars = 'F:\Microsoft Visual Studio 2022\VC\Auxiliary\Build\vcvars64.bat'
    $containment = Join-Path $run 'containment-test.exe'
    $outer = Join-Path $run 'enclosing-job-test.exe'
    $batch = Join-Path $run 'compile-tests.cmd'
    @(
        '@echo off',
        "call `"$vcvars`" >nul",
        'if errorlevel 1 exit /b 1',
        "cl /nologo /std:c11 /TC /W4 /WX /wd4324 /I`"$(Join-Path $extract 'include')`" /Fo:`"$(Join-Path $run 'containment.obj')`" /Fe:`"$containment`" `"$(Join-Path $PSScriptRoot 'containment-test.c')`" /link /Brepro `"$library`"",
        'if errorlevel 1 exit /b 1',
        "cl /nologo /std:c11 /TC /W4 /WX /Fo:`"$(Join-Path $run 'outer.obj')`" /Fe:`"$outer`" `"$(Join-Path $PSScriptRoot 'enclosing-job-test.c')`" /link /Brepro"
    ) | Set-Content -LiteralPath $batch -Encoding ascii
    & cmd /c $batch
    if ($LASTEXITCODE -ne 0) { throw 'Containment test build failed' }
    $direct = & $containment $PID
    if ($LASTEXITCODE -ne 0 -or $direct -ne 'CONTAINMENT OK') { throw '384 MiB Job limit test failed' }
    $nested = & $outer $containment
    if ($LASTEXITCODE -ne 0 -or $nested -notcontains 'NESTED JOB OK') { throw 'Enclosing Job test failed' }
    $deadParent = & node (Join-Path $PSScriptRoot 'test-parent-death.mjs') $containment
    if ($LASTEXITCODE -ne 0) { throw 'Parent-death cleanup test failed' }
    $invalid = & $containment 0
    if ($LASTEXITCODE -ne 4 -or $invalid) { throw 'Invalid parent did not fail closed' }
    [pscustomobject]@{ memoryLimit='384 MiB'; memoryOverLimitRejected=$true; nestedJob=$true; parentDeath=$true; invalidParentRejected=$true; parentDeathDetail=$deadParent } | ConvertTo-Json -Compress
} finally {
    $full = [System.IO.Path]::GetFullPath($run).TrimEnd('\')
    $temp = [System.IO.Path]::GetFullPath([System.IO.Path]::GetTempPath()).TrimEnd('\')
    if (-not $full.StartsWith($temp + '\', [System.StringComparison]::OrdinalIgnoreCase) -or
        -not [System.IO.Path]::GetFileName($full).StartsWith('labos-r001-containment-')) { throw 'Unsafe test cleanup path' }
    Remove-Item -LiteralPath $full -Recurse -Force
}
