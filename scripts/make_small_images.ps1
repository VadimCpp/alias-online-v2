# Use this script to make responsive image set for Azure Blob

# Path to the ImageMagick 'convert' tool (replace with the actual path if needed)
$convertPath = "C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\magick.exe"

# Set the directory path where the files are located
$directoryPath = ".\public\test_images"
$sourceFolderPath = ".\public\test_images"

# Set the target folder paths for small copies
$targetFolderPathSmall = "$directoryPath\small"

# Width to resize the image to (in pixels)
$targetWidthSmall = 400

# Create target folders if they don't exist
if (-not (Test-Path $targetFolderPathSmall)) {
    New-Item -ItemType Directory -Path $targetFolderPathSmall | Out-Null
}

# Get a list of PNG files in the source folder
$pngFiles = Get-ChildItem -Path $sourceFolderPath -Filter "*.png" -File

Write-Host "The source path: $sourceFolderPath"
Write-Host "The image: $pngFiles"

# Loop through the PNG files and create copies with "_small" and "_medium" suffixes
foreach ($file in $pngFiles) {
    # Create a copy with "_small" suffix and resize the image
    $newNameSmall = $file.BaseName + "_small" + $file.Extension
    $newPathSmall = Join-Path -Path $targetFolderPathSmall -ChildPath $newNameSmall
    try {
      & $convertPath $file.FullName -resize $targetWidthSmall -quality 80 $newPathSmall
    } catch {
      Write-Host "Error resizing the image: $_"
    }
}

Write-Host "Responsive image pack created successfully."
