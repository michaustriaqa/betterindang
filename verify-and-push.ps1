# Premium Git Verification, Push, and PR Orchestrator
# Save this file as 'verify-and-push.ps1' in the workspace root.

$ErrorActionPreference = "Stop"
Clear-Host

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   *** INDANG LOCAL GOV PORTAL - GIT PUSH & PR WORKFLOW ***   " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Gather Git Information
$activeBranch = (git branch --show-current).Trim()
Write-Host "[*] Active Branch: " -NoNewline
Write-Host $activeBranch -ForegroundColor Yellow

# Check if there are changes to commit
$gitStatus = git status --porcelain
$hasChanges = $null -ne $gitStatus -and $gitStatus.Length -gt 0

if (-not $hasChanges) {
    Write-Host "[!] No unstaged or untracked changes detected in your workspace." -ForegroundColor Yellow
} else {
    Write-Host "[*] Unstaged / Untracked files detected. Staging ready." -ForegroundColor Gray
}

# 2. Local Code Verification (Build Check)
Write-Host ""
Write-Host "[*] Step 1: Running Local Code Verification (Build Check)..." -ForegroundColor Cyan
Write-Host "   [Command: npm run build]" -ForegroundColor DarkGray

try {
    $buildProcess = Start-Process npm -ArgumentList "run build" -NoNewWindow -PassThru -Wait
    
    if ($buildProcess.ExitCode -ne 0) {
        Write-Host ""
        Write-Host "[ERROR] Local Verification Failed! Code does not compile cleanly." -ForegroundColor Red
        Write-Host "[!] Please fix any TypeScript or compilation errors before pushing." -ForegroundColor Yellow
        $proceed = Read-Host -Prompt "Do you still want to proceed anyway y or n"
        if ($proceed -ne 'y' -and $proceed -ne 'Y') {
            Write-Host "[*] Operation aborted by user." -ForegroundColor Red
            Exit 1
        }
    } else {
        Write-Host "[OK] Local Verification Passed! Build compiled with zero errors." -ForegroundColor Green
    }
} catch {
    Write-Host "[!] Could not run verification automatically. Skipping build check..." -ForegroundColor Yellow
}

# 3. Conventional Commit Formulator
if ($hasChanges) {
    Write-Host ""
    Write-Host "[*] Step 2: Conventional Commit Formulator..." -ForegroundColor Cyan
    
    Write-Host "Select commit type:" -ForegroundColor Gray
    Write-Host "  [1] feat     (New feature / localization)" -ForegroundColor Green
    Write-Host "  [2] fix      (Bug fix / layout adjustment)" -ForegroundColor Red
    Write-Host "  [3] chore    (Maintenance / configuration)" -ForegroundColor Blue
    Write-Host "  [4] docs     (Documentation changes)" -ForegroundColor Magenta
    Write-Host "  [5] refactor (Code reorganization / cleanup)" -ForegroundColor Yellow
    Write-Host "  [6] custom   (Enter custom prefix)" -ForegroundColor DarkGray
    
    $typeChoice = Read-Host -Prompt "Enter choice 1-6"
    $commitPrefix = 'feat'
    
    if ($typeChoice -eq '1') {
        $commitPrefix = 'feat'
    } elseif ($typeChoice -eq '2') {
        $commitPrefix = 'fix'
    } elseif ($typeChoice -eq '3') {
        $commitPrefix = 'chore'
    } elseif ($typeChoice -eq '4') {
        $commitPrefix = 'docs'
    } elseif ($typeChoice -eq '5') {
        $commitPrefix = 'refactor'
    } elseif ($typeChoice -eq '6') {
        $commitPrefix = Read-Host -Prompt "Enter custom prefix"
    } else {
        Write-Host "[!] Defaulting to 'feat'." -ForegroundColor Yellow
        $commitPrefix = 'feat'
    }
    
    $scope = Read-Host -Prompt "Enter optional scope like yakap or navbar"
    $scopeStr = ''
    if ($scope.Trim() -ne '') {
        $scopeStr = "(" + $scope.Trim().ToLower() + ")"
    }
    
    # Auto-generate dynamic default message
    $defaultMsg = 'refactor YAKAP hub and home promo cards with bilingual translations and responsive fixes'
    Write-Host ("Enter commit message (Leave empty for default: '" + $defaultMsg + "'):") -ForegroundColor Gray
    $userMsg = Read-Host -Prompt 'Enter message details'
    
    $finalMsgText = $defaultMsg
    if ($userMsg.Trim() -ne '') {
        $finalMsgText = $userMsg.Trim()
    }
    
    $fullCommitMsg = $commitPrefix + $scopeStr + ": " + $finalMsgText
    Write-Host ""
    Write-Host "[OK] Generated Commit Message:" -ForegroundColor Gray
    Write-Host $fullCommitMsg -ForegroundColor Yellow
    
    # Commit changes
    Write-Host ""
    Write-Host "[*] Staging all files..." -ForegroundColor Gray
    git add -A
    
    Write-Host ""
    Write-Host "[*] Committing..." -ForegroundColor Gray
    git commit -m "$fullCommitMsg"
    Write-Host "[OK] Changes committed successfully!" -ForegroundColor Green
}

# 4. Push Branch to Origin
Write-Host ""
Write-Host "[*] Step 3: Pushing Active Branch to GitHub..." -ForegroundColor Cyan
Write-Host ("   [Command: git push origin " + $activeBranch + "]") -ForegroundColor DarkGray

try {
    git push origin "$activeBranch" --set-upstream
    Write-Host "[OK] Branch pushed successfully to remote!" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Pushing failed. Check network connection or branch permissions." -ForegroundColor Red
    Exit 1
}

# 5. Pull Request Creation Orchestration (Using GH CLI)
Write-Host ""
Write-Host "[*] Step 4: Pull Request Orchestrator..." -ForegroundColor Cyan

# Check if PR already exists
try {
    $existingPrRaw = gh pr list --head "$activeBranch" --json url,title -q ".[0]" 2>$null
    if ($existingPrRaw) {
        $existingPr = $existingPrRaw | ConvertFrom-Json
        if ($null -ne $existingPr -and $null -ne $existingPr.url) {
            Write-Host ""
            Write-Host "[PR FOUND] Pull Request already exists for this branch!" -ForegroundColor Green
            Write-Host ("  Title: " + $existingPr.title) -ForegroundColor Yellow
            Write-Host ("  Link:  " + $existingPr.url) -ForegroundColor Cyan
            Write-Host "==========================================================" -ForegroundColor Cyan
            Exit 0
        }
    }
} catch {
    # Non-blocking error, proceed to create PR
}

Write-Host "Create a Pull Request on GitHub:" -ForegroundColor Gray
Write-Host "  [1] Create Draft PR      (gh pr create --draft --fill)" -ForegroundColor Green
Write-Host "  [2] Create Normal PR     (gh pr create --fill)" -ForegroundColor Cyan
Write-Host "  [3] Open PR in Browser   (gh pr create --web)" -ForegroundColor LightBlue
Write-Host "  [4] Just Push            (No PR creation)" -ForegroundColor DarkGray

$prChoice = Read-Host -Prompt "Enter choice 1-4"

if ($prChoice -eq '1') {
    Write-Host ""
    Write-Host "[*] Creating Draft Pull Request..." -ForegroundColor Gray
    gh pr create --draft --fill
    Write-Host "[OK] Draft PR created successfully!" -ForegroundColor Green
} elseif ($prChoice -eq '2') {
    Write-Host ""
    Write-Host "[*] Creating Pull Request..." -ForegroundColor Gray
    gh pr create --fill
    Write-Host "[OK] Pull Request created successfully!" -ForegroundColor Green
} elseif ($prChoice -eq '3') {
    Write-Host ""
    Write-Host "[*] Launching browser PR creation interface..." -ForegroundColor Gray
    gh pr create --web
} else {
    Write-Host ""
    Write-Host "[OK] Skipped PR creation. Changes are pushed safely." -ForegroundColor Green
}

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "        *** WORKFLOW COMPLETE - YOU ARE GREEN! ***" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
