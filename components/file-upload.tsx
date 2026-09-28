"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon, FileIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
  onRemoveFile: () => void
}

export function FileUpload({ onFileSelect, selectedFile, onRemoveFile }: FileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
      setIsDragActive(false)
    },
    [onFileSelect],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
      "application/x-hdf5": [".h5"],
      "application/x-hdf": [".hdf5"],
    },
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  })

  const isH5File = (file: File) => {
    return (
      file.name.toLowerCase().endsWith(".h5") ||
      file.name.toLowerCase().endsWith(".hdf5") ||
      file.type === "application/x-hdf5" ||
      file.type === "application/x-hdf"
    )
  }

  if (selectedFile) {
    return (
      <Card className="relative">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {isH5File(selectedFile) ? (
                <FileIcon className="h-5 w-5 text-primary" />
              ) : (
                <ImageIcon className="h-5 w-5 text-primary" />
              )}
              <span className="font-medium">{selectedFile.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onRemoveFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            {isH5File(selectedFile) ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <FileIcon className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">H5 Data File</p>
                  <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            ) : (
              <img
                src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
                alt="Selected terrain"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed cursor-pointer transition-colors",
        isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
      )}
    >
      <input {...getInputProps()} />
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Upload className={cn("h-12 w-12 mb-4", isDragActive ? "text-primary" : "text-muted-foreground")} />
        <h3 className="font-semibold mb-2">Upload Terrain Data</h3>
        <p className="text-sm text-muted-foreground mb-4 text-pretty">
          Drag and drop your terrain image or H5 data file here, or click to browse
        </p>
        <p className="text-xs text-muted-foreground">Supports: JPEG, PNG, WebP, H5/HDF5</p>
      </CardContent>
    </Card>
  )
}
