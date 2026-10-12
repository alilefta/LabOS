param([string]$Run,[string]$Id='baseline-small',[int]$Repeats=1)
$exe=Join-Path $Run 'r001-codec-probe.exe'
$results=@()
for($i=0;$i -lt $Repeats;$i++){
  $path=Join-Path $Run ($Id+'.jpg')
  $bytes=[IO.File]::ReadAllBytes($path)
  $startInfo=[Diagnostics.ProcessStartInfo]::new()
  $startInfo.FileName=$exe
  $startInfo.UseShellExecute=$false
  $startInfo.CreateNoWindow=$true
  $startInfo.RedirectStandardInput=$true
  $startInfo.RedirectStandardOutput=$true
  $startInfo.RedirectStandardError=$true
  $p=[Diagnostics.Process]::new()
  $p.StartInfo=$startInfo
  $sw=[Diagnostics.Stopwatch]::StartNew()
  if(-not $p.Start()){throw 'child did not start'}
  $header=[byte[]](76,74,48,49,0,0,0,0)
  [BitConverter]::GetBytes([uint32]$bytes.Length).CopyTo($header,4)
  $p.StandardInput.BaseStream.Write($header,0,8)
  $p.StandardInput.BaseStream.Write($bytes,0,$bytes.Length)
  $p.StandardInput.Close()
  $ipcMs=$sw.Elapsed.TotalMilliseconds
  $peak=0; $private=0; $cpu=0; $timedOut=$false
  while(-not $p.WaitForExit(1)){
    $p.Refresh()
    try { $peak=[math]::Max($peak,$p.PeakWorkingSet64); $private=[math]::Max($private,$p.PrivateMemorySize64); $cpu=[math]::Max($cpu,$p.TotalProcessorTime.TotalMilliseconds) } catch {}
    if($sw.Elapsed.TotalMilliseconds -gt 20000){$timedOut=$true;$p.Kill($true);$p.WaitForExit();break}
  }
  $stdout=$p.StandardOutput.ReadToEnd()
  $stderr=$p.StandardError.ReadToEnd()
  $sw.Stop()
  $results+= [pscustomobject]@{id=$Id;iteration=$i;bytes=$bytes.Length;wallMs=[math]::Round($sw.Elapsed.TotalMilliseconds,3);ipcMs=[math]::Round($ipcMs,3);cpuMs=[math]::Round($cpu,3);peakWorkingSetBytes= $(if($peak -gt 0){$peak}else{$null});sampledPeakPrivateBytes= $(if($private -gt 0){$private}else{$null});exitCode=$p.ExitCode;stdout=$stdout.Trim();stderr=$stderr.Trim();timedOut=$timedOut}
  $p.Dispose()
}
$results | ConvertTo-Json -Depth 4

