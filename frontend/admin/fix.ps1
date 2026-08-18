$content = Get-Content 'd:\Augmetik Software\Vyasa\frontend\admin\announcements.html'
$content[160..($content.Length - 1)] | Set-Content 'd:\Augmetik Software\Vyasa\frontend\admin\announcements.html'
