# Opens the diploma in Word, updates the table of contents and saves it back to the .docx,
# prints page/word counts and exports a PDF (late binding, because the Word interop type library is not registered).
# Usage: powershell -File tools/export-pdf.ps1 <docx> <pdf>
param([string]$Docx, [string]$Pdf)
$Docx = [System.IO.Path]::GetFullPath($Docx)
$Pdf = [System.IO.Path]::GetFullPath($Pdf)
$GET = [System.Reflection.BindingFlags]::GetProperty; $SET = [System.Reflection.BindingFlags]::SetProperty; $CALL = [System.Reflection.BindingFlags]::InvokeMethod
# The leading comma stops PowerShell from enumerating returned COM collections (e.g. Documents).
function Call($obj, $name, $flags, $argList) { , $obj.GetType().InvokeMember($name, $flags, $null, $obj, $argList) }

$t = [Type]::GetTypeFromProgID("Word.Application")
$word = [Activator]::CreateInstance($t)
try {
  [void](Call $word "Visible" $SET @($false))
  [void](Call $word "DisplayAlerts" $SET @(0))
  $docs = Call $word "Documents" $GET $null
  $doc = Call $docs "Open" $CALL @($Docx, $false, $false)
  $tocs = Call $doc "TablesOfContents" $GET $null
  if ((Call $tocs "Count" $GET $null) -gt 0) {
    $toc = Call $tocs "Item" $CALL @(1)
    [void](Call $toc "Update" $CALL $null)
  }
  # Save the filled-in table of contents into the .docx too, not only into the PDF.
  [void](Call $doc "Save" $CALL $null)
  $pages = Call $doc "ComputeStatistics" $CALL @(2)
  $words = Call $doc "ComputeStatistics" $CALL @(0)
  [void](Call $doc "ExportAsFixedFormat" $CALL @($Pdf, 17))
  [void](Call $doc "Close" $CALL @(0))
  "pages=$pages words=$words"
} finally {
  [void](Call $word "Quit" $CALL $null)
  # Release the COM reference so the hidden WINWORD.EXE process actually exits.
  [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($word)
  [GC]::Collect(); [GC]::WaitForPendingFinalizers()
}
