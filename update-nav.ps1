$files = @("announcements.html", "create-program.html", "create-student.html", "page-editor.html", "page-preview.html", "pages.html", "view-achievement.html", "view-program.html", "view-student.html")
$dir = "d:\Augmetik Software\Vyasa\frontend\admin"

$menuTemplate = @"
                <ul>
                    <li{0}><a href="{1}"><i class="fa-solid fa-border-all"></i> Dashboard</a></li>
                    <li{2}><a href="{3}"><i class="fa-solid fa-layer-group"></i> Pages</a></li>
                    <li{4}><a href="{5}"><i class="fa-solid fa-users"></i> Educators</a></li>
                    <li{6}><a href="{7}"><i class="fa-regular fa-newspaper"></i> Articles / Blog</a></li>
                    <li{8}><a href="{9}"><i class="fa-solid fa-bullhorn"></i> Announcements</a></li>
                    <li{10}><a href="{11}"><i class="fa-solid fa-award"></i> Achievements</a></li>
                    <li{12}><a href="{13}"><i class="fa-regular fa-comment-dots"></i> Testimonials</a></li>
                    <li{14}><a href="{15}"><i class="fa-regular fa-folder-open"></i> Media Library</a></li>
                    <li{16}><a href="{17}"><i class="fa-solid fa-graduation-cap"></i> Programs</a></li>
                    <li{18}><a href="{19}"><i class="fa-solid fa-user-group"></i> Students</a></li>
                    <li{20}><a href="{21}"><i class="fa-solid fa-envelope-open-text"></i> Inquiries</a></li>
                    <li{22}><a href="{23}"><i class="fa-solid fa-briefcase"></i> Careers</a></li>
                    <li{24}><a href="{25}"><i class="fa-solid fa-gear"></i> Settings</a></li>
                </ul>
"@

foreach ($file in $files) {
    $path = Join-Path $dir $file
    $content = Get-Content $path -Raw
    
    $activeKey = $file
    if ($file -match "student") { $activeKey = "students.html" }
    elseif ($file -match "program") { $activeKey = "programs.html" }
    elseif ($file -match "page") { $activeKey = "pages.html" }
    elseif ($file -match "achievement") { $activeKey = "achievements.html" }
    elseif ($file -eq "dashboard.html") { $activeKey = "dashboard.html" }
    
    $items = @(
        @("dashboard.html", "dashboard.html"),
        @("pages.html", "pages.html"),
        @("educators.html", "educators.html"),
        @("articles.html", "articles.html"),
        @("announcements.html", "announcements.html"),
        @("achievements.html", "achievements.html"),
        @("testimonials.html", "testimonials.html"),
        @("media-library.html", "media-library.html"),
        @("programs.html", "programs.html"),
        @("students.html", "students.html"),
        @("inquiries.html", "inquiries.html"),
        @("careers.html", "careers.html"),
        @("settings.html", "settings.html")
    )
    
    $formatArgs = @()
    foreach ($item in $items) {
        $key = $item[0]
        $href = $item[1]
        
        if ($key -eq $activeKey) {
            $formatArgs += ' class="active"'
            # When active, href becomes '#' according to user snippet (wait, user snippet showed dashboard has # but for pages.html active had href="pages.html". No, in dashboard: <li class="active"><a href="#"><i class="..."></i> Dashboard</a></li>. In pages.html: <li class="active"><a href="pages.html">...</a></li>. Let's just keep the href as the page name unless it's dashboard, or just use page name for all. Actually user snippet: Dashboard has #. Let's make it the active page name except dashboard is #).
            if ($key -eq "dashboard.html") {
                $formatArgs += '#'
            } else {
                $formatArgs += $href
            }
        } else {
            $formatArgs += ''
            $formatArgs += $href
        }
    }
    
    $newMenu = $menuTemplate -f $formatArgs
    
    $regex = '(?s)<nav class="sidebar-nav">\s*<ul>.*?</ul>\s*</nav>'
    $replacement = "<nav class=`"sidebar-nav`">`n$newMenu`n            </nav>"
    
    if ($content -match $regex) {
        $newContent = $content -replace $regex, $replacement
        Set-Content -Path $path -Value $newContent
        Write-Host "Updated $file"
    } else {
        Write-Host "Could not find sidebar in $file"
    }
}
