# Opens the presentation in PowerPoint, exports every slide to PNG (for visual checks) and optionally saves a PDF copy
# (late binding, because the PowerPoint interop type library is not registered).
# Usage: powershell -File tools/export-slides.ps1 <pptx> <pngDir> [<pdf>]
param([string]$Pptx, [string]$PngDir, [string]$Pdf)
$Pptx = [System.IO.Path]::GetFullPath($Pptx)
$PngDir = [System.IO.Path]::GetFullPath($PngDir)
if (Test-Path $PngDir -PathType Leaf) { throw "PngDir is a file: $PngDir" }
New-Item -ItemType Directory -Force $PngDir | Out-Null
Get-ChildItem $PngDir -Filter 'slide-*.png' | Remove-Item -Force

$GET = [System.Reflection.BindingFlags]::GetProperty; $CALL = [System.Reflection.BindingFlags]::InvokeMethod
# The leading comma stops PowerShell from enumerating returned COM collections (e.g. Presentations).
function Call($obj, $name, $flags, $argList) { , $obj.GetType().InvokeMember($name, $flags, $null, $obj, $argList) }

$t = [Type]::GetTypeFromProgID("PowerPoint.Application")
$app = [Activator]::CreateInstance($t)
try {
  $presentations = Call $app "Presentations" $GET $null
  # ReadOnly = msoTrue, Untitled = msoFalse, WithWindow = msoFalse
  $pres = Call $presentations "Open" $CALL @($Pptx, -1, 0, 0)
  $slides = Call $pres "Slides" $GET $null
  $count = Call $slides "Count" $GET $null
  for ($i = 1; $i -le $count; $i++) {
    $slide = Call $slides "Item" $CALL @($i)
    # [string] unwraps the PSObject that Join-Path returns; COM rejects it with a type mismatch.
    [void](Call $slide "Export" $CALL @([string](Join-Path $PngDir ("slide-{0:D2}.png" -f $i)), 'PNG', 1600, 900))
  }
  if ($Pdf) { [void](Call $pres "SaveAs" $CALL @([System.IO.Path]::GetFullPath($Pdf), 32)) }  # ppSaveAsPDF
  [void](Call $pres "Close" $CALL $null)
  "slides=$count"
} finally {
  [void](Call $app "Quit" $CALL $null)
  [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($app)
  [GC]::Collect(); [GC]::WaitForPendingFinalizers()
}
