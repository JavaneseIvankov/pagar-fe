"use client";

import { useRef, useState, useEffect } from "react";
import { Camera01Icon, Trash, Upload01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  value?: File[];
  onChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  className?: string;
}

export function FileUpload({
  value = [],
  onChange,
  maxFiles = 1,
  maxSizeMB = 10,
  accept = "image/*",
  className,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>(value || []);
  const [fileProgresses, setFileProgresses] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    if (value && value !== uploadedFiles) {
      setUploadedFiles(value || []);
    }
  }, [value]);

  const handleFileSelect = (filesList: FileList | null) => {
    if (!filesList) return;

    let newFiles = Array.from(filesList);

    // Validate size
    newFiles = newFiles.filter((f) => f.size <= maxSizeMB * 1024 * 1024);

    if (maxFiles === 1) {
      newFiles = [newFiles[0]];
      setUploadedFiles(newFiles);
      if (onChange) onChange(newFiles);
    } else {
      const combined = [...uploadedFiles, ...newFiles].slice(0, maxFiles);
      setUploadedFiles(combined);
      if (onChange) onChange(combined);
    }

    // Simulate upload progress for each file
    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setFileProgresses((prev) => ({
          ...prev,
          [file.name]: Math.min(progress, 100),
        }));
      }, 100);
    });
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (filename: string) => {
    const updated = uploadedFiles.filter((file) => file.name !== filename);
    setUploadedFiles(updated);
    if (onChange) onChange(updated);

    setFileProgresses((prev) => {
      const newProgresses = { ...prev };
      delete newProgresses[filename];
      return newProgresses;
    });
  };

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {uploadedFiles.length < maxFiles && (
        <div
          className="border-2 border-dashed border-primary/40 rounded-xl bg-primary/5 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={handleBoxClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleBoxClick();
            }
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          tabIndex={0}
          role="button"
          aria-label="Upload File"
        >
          <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary pointer-events-none">
            <HugeiconsIcon icon={Camera01Icon} size={32} />
          </div>
          <h3 className="font-bold text-lg mb-1 pointer-events-none">
            Unggah Foto Makanan
          </h3>
          <p className="text-sm text-foreground/70 mb-4 pointer-events-none">
            Klik untuk pilih dari perangkat Anda
          </p>
          <Button
            type="button"
            className="bg-primary hover:bg-primary/90 pl-6 pr-4 mb-4 pointer-events-none"
            tabIndex={-1}
          >
            Upload
            <HugeiconsIcon icon={Upload01Icon} className="ml-2" />
          </Button>
          <p className="text-xs text-muted-foreground/60 max-w-sm pointer-events-none">
            Pastikan foto jelas dan memperlihatkan seluruh porsi makanan (Maks. {maxSizeMB}MB)
          </p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={accept}
            multiple={maxFiles > 1}
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className={cn("space-y-3", uploadedFiles.length < maxFiles ? "mt-4" : "")}>
          {uploadedFiles.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);

            return (
              <div
                className="border border-border rounded-lg p-2 flex flex-col bg-background shadow-sm"
                key={file.name + index}
                onLoad={() => {
                  return () => URL.revokeObjectURL(imageUrl);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-14 bg-muted rounded-md flex items-center justify-center self-start overflow-hidden shrink-0 border">
                    <img
                      src={imageUrl}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-1 py-1">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-foreground truncate max-w-[200px] md:max-w-[300px]">
                          {file.name}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(file.name);
                        }}
                      >
                        <HugeiconsIcon icon={Trash} className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-muted rounded-full overflow-hidden flex-1 border">
                        <div
                          className="h-full bg-primary transition-all duration-300 ease-out"
                          style={{
                            width: `${fileProgresses[file.name] || 0}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground tabular-nums w-8">
                        {Math.round(fileProgresses[file.name] || 0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
