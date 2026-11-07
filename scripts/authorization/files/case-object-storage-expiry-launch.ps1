param(
  [ValidateSet('Probe', 'Hosted')][string]$Mode = 'Probe',
  [string]$ProbeCredentialTarget
)

$ErrorActionPreference = 'Stop'
$stage = 'INITIALIZATION'
$child = $null
$secret = $null
$url = $null

try {
  if (-not ('LabOsWinCred' -as [type])) {
    Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;

public static class LabOsWinCred {
  [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
  public struct Credential {
    public UInt32 Flags;
    public UInt32 Type;
    public IntPtr TargetName;
    public IntPtr Comment;
    public Int64 LastWritten;
    public UInt32 CredentialBlobSize;
    public IntPtr CredentialBlob;
    public UInt32 Persist;
    public UInt32 AttributeCount;
    public IntPtr Attributes;
    public IntPtr TargetAlias;
    public IntPtr UserName;
  }

  [DllImport("advapi32.dll", EntryPoint = "CredReadW", CharSet = CharSet.Unicode, SetLastError = true)]
  public static extern bool Read(string target, UInt32 type, UInt32 flags, out IntPtr credential);

  [DllImport("advapi32.dll", EntryPoint = "CredFree")]
  public static extern void Free(IntPtr credential);
}
'@
  }

  function Read-OperatorCredential([string]$target, [string]$expectedUser) {
    $pointer = [IntPtr]::Zero
    $bytes = $null
    try {
      if (-not [LabOsWinCred]::Read($target, 1, 0, [ref]$pointer) -or
          $pointer -eq [IntPtr]::Zero) { throw 'CREDENTIAL_UNAVAILABLE' }
      $entry = [Runtime.InteropServices.Marshal]::PtrToStructure(
        $pointer, [type][LabOsWinCred+Credential])
      $name = [Runtime.InteropServices.Marshal]::PtrToStringUni($entry.UserName)
      if ($name -cne $expectedUser -or $entry.CredentialBlobSize -lt 2 -or
          $entry.CredentialBlobSize -gt 2560 -or
          ($entry.CredentialBlobSize % 2) -ne 0) { throw 'CREDENTIAL_INVALID' }
      $bytes = New-Object byte[] ([int]$entry.CredentialBlobSize)
      [Runtime.InteropServices.Marshal]::Copy($entry.CredentialBlob, $bytes, 0, $bytes.Length)
      $value = [Text.Encoding]::Unicode.GetString($bytes)
      if ([string]::IsNullOrWhiteSpace($value)) { throw 'CREDENTIAL_INVALID' }
      return $value
    } finally {
      if ($bytes) { [Array]::Clear($bytes, 0, $bytes.Length) }
      if ($pointer -ne [IntPtr]::Zero) { [LabOsWinCred]::Free($pointer) }
    }
  }

  $stage = 'LOCAL_PREFLIGHT'
  $node = 'C:\Program Files\nodejs\node.exe'
  if (-not (Test-Path -LiteralPath $node -PathType Leaf)) { throw 'NODE_UNAVAILABLE' }
  $root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..\..')).Path
  $sweeper = Join-Path $PSScriptRoot 'case-object-storage-expiry-sweeper.mjs'
  $psi = [Diagnostics.ProcessStartInfo]::new()
  $psi.FileName = $node
  $psi.WorkingDirectory = $root
  $psi.UseShellExecute = $false
  $psi.CreateNoWindow = $true
  $psi.RedirectStandardOutput = $true
  $psi.RedirectStandardError = $true
  $psi.Environment.Clear()
  $psi.Environment['SystemRoot'] = $env:SystemRoot
  $psi.Environment['PATH'] = 'C:\Windows\System32;C:\Program Files\nodejs'

  if ($Mode -eq 'Probe') {
    if ($ProbeCredentialTarget -cne 'LabOS/codex-sandbox/sweeper-launcher-probe') {
      throw 'PROBE_TARGET_INVALID'
    }
    $stage = 'CREDENTIAL_READ'
    $secret = Read-OperatorCredential $ProbeCredentialTarget 'labos_probe'
    $psi.Environment['LABOS_PROBE_SECRET'] = $secret
    $psi.ArgumentList.Add('-e')
    $psi.ArgumentList.Add('process.stdout.write(JSON.stringify({probe:Boolean(process.env.LABOS_PROBE_SECRET)}))')
  } else {
    if ($ProbeCredentialTarget) { throw 'HOSTED_TARGET_OVERRIDE_DENIED' }
    $expectedHash = 'CF3AAC48D6CD6E70E7516D3819A2BDCA22186BE98B2E7CE39F37D40A5FD24524'
    if ((Get-FileHash -LiteralPath $sweeper -Algorithm SHA256).Hash -cne $expectedHash) {
      throw 'SWEEPER_HASH_MISMATCH'
    }
    $ca = Join-Path $root '.env.verification-ca.crt'
    $caItem = Get-Item -LiteralPath $ca -ErrorAction Stop
    if ($caItem.PSIsContainer -or ($caItem.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
      throw 'CA_FILE_INVALID'
    }
    $stage = 'CREDENTIAL_READ'
    $login = 'labos_verification_case_expiry_runner'
    $project = 'rvtubjrczuxdxfuazjmr'
    $hostName = 'aws-1-eu-central-1.pooler.supabase.com'
    $secret = Read-OperatorCredential 'LabOS/labos-verification/case-expiry-sweeper' $login
    $encodedUser = [Uri]::EscapeDataString("$login.$project")
    $encodedPassword = [Uri]::EscapeDataString($secret)
    $url = "postgresql://${encodedUser}:${encodedPassword}@${hostName}:5432/postgres"
    $psi.Environment['LABOS_CASE_EXPIRY_DATABASE_URL'] = $url
    $psi.Environment['LABOS_CASE_EXPIRY_CA_FILE'] = $ca
    $psi.Environment['LABOS_CASE_EXPIRY_EXPECTED_HOST'] = $hostName
    $psi.Environment['LABOS_CASE_EXPIRY_EXPECTED_DATABASE'] = 'postgres'
    $psi.Environment['LABOS_CASE_EXPIRY_PROJECT_ID'] = $project
    $psi.Environment['LABOS_CASE_EXPIRY_LOGIN_ROLE'] = $login
    $psi.Environment['LABOS_CASE_EXPIRY_BATCH_LIMIT'] = '1'
    $psi.Environment['LABOS_CASE_EXPIRY_SWEEPER_ENABLED'] = 'true'
    $psi.Environment['LABOS_CASE_EXPIRY_OPERATIONAL_APPROVAL'] = 'APPROVED'
    $psi.ArgumentList.Add($sweeper)
    $psi.ArgumentList.Add('--run-once')
  }

  $stage = 'CHILD_EXECUTION'
  $child = [Diagnostics.Process]::new()
  $child.StartInfo = $psi
  if (-not $child.Start()) { throw 'CHILD_START_FAILED' }
  $secret = $null
  $url = $null
  $stdoutTask = $child.StandardOutput.ReadToEndAsync()
  $stderrTask = $child.StandardError.ReadToEndAsync()
  if (-not $child.WaitForExit(45000)) {
    $child.Kill($true)
    throw 'CHILD_TIMEOUT'
  }
  $stdout = $stdoutTask.GetAwaiter().GetResult()
  $null = $stderrTask.GetAwaiter().GetResult()
  $lines = @($stdout -split '\r?\n' | Where-Object { $_ })
  if ($lines.Count -ne 1) { throw 'UNEXPECTED_CHILD_OUTPUT' }
  $record = $lines[0] | ConvertFrom-Json

  if ($Mode -eq 'Probe') {
    if ($child.ExitCode -ne 0 -or $record.probe -ne $true) { throw 'PROBE_FAILED' }
    [pscustomobject]@{ mode = 'PROBE'; status = 'PASS'; exitCode = 0 } |
      ConvertTo-Json -Compress
  } else {
    $safe = [ordered]@{
      mode = 'HOSTED'; exitCode = $child.ExitCode
      invocationId = $record.invocationId; status = $record.status
      classification = $record.classification; startedAt = $record.startedAt
      durationMs = $record.durationMs; requestedBatchLimit = $record.requestedBatchLimit
      processedCount = $record.processedCount
      enrolledCount = $record.enrolledCount; quarantineCount = $record.quarantineCount
      quarantineVisibility = $record.quarantineVisibility
      overdueBefore = $record.overdueBefore; overdueAfter = $record.overdueAfter
    }
    $safe | ConvertTo-Json -Compress -Depth 5
    if ($child.ExitCode -ne 0 -or $record.status -ne 'SUCCESS') { exit 1 }
  }
} catch {
  [pscustomobject]@{ mode = $Mode; status = 'FAILED'; stage = $stage } |
    ConvertTo-Json -Compress
  exit 1
} finally {
  $secret = $null
  $url = $null
  if ($child) { $child.Dispose() }
}
