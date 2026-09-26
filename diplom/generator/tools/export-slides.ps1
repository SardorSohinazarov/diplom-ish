# Opens the presentation in PowerPoint, exports every slide to PNG (for visual checks) and optionally saves a PDF copy.
# Usage: powershell -File tools/export-slides.ps1 <pptx> <pngDir> [<pdf>]
param([string]$Pptx, [string]$PngDir, [string]$Pdf)
$Pptx = [System.IO.Path]::GetFullPath($Pptx)
$PngDir = [System.IO.Path]::GetFullPath($PngDir)
New-Item -ItemType Directory -Force $PngDir | Out-Null
Get-ChildItem $PngDir -Filter 'slide-*.png' | Remove-Item -Force

$app = New-Object -ComObject PowerPoint.Application
try {
  # ReadOnly = msoTrue, Untitled = msoFalse, WithWindow = msoFalse
  $pres = $app.Presentations.Open($Pptx, -1, 0, 0)
  $count = $pres.Slides.Count
  for ($i = 1; $i -le $count; $i++) {
    $pres.Slides.Item($i).Export((Join-Path $PngDir ("slide-{0:D2}.png" -f $i)), 'PNG', 1600, 900)
  }
  if ($Pdf) { $pres.SaveAs([System.IO.Path]::GetFullPath($Pdf), 32) }  # ppSaveAsPDF
  $pres.Close()
  "slides=$count"
} finally {
  $app.Quit()
  [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($app)
  [GC]::Collect(); [GC]::WaitForPendingFinalizers()
}
