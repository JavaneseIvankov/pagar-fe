"use client";

import { useEffect, useRef, useState } from "react";
import { Camera01Icon, Trash, Upload01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  value?: File[];
  defaultValue?: File[];
  onChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  helperText?: string;
  className?: string;
  dropzoneClassName?: string;
}

function getFileKey(file: File) {
  return `${file.name}-${file.lastModified}-${file.size}`;
}

interface UploadedFilePreviewProps {
  file: File;
  onRemove: (fileKey: string) => void;
  progress: number;
}

function UploadedFilePreview({
  file,
  onRemove,
  progress,
}: UploadedFilePreviewProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileKey = getFileKey(file);

  useEffect(() => {
    if (!file.type.startsWith("image/")) {
      setImageUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="flex flex-col rounded-lg border border-border bg-background p-2 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-16 shrink-0 items-center justify-center self-start overflow-hidden rounded-md border bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={file.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <HugeiconsIcon
              icon={Upload01Icon}
              className="text-muted-foreground"
              size={20}
            />
          )}
        </div>

        <div className="min-w-0 flex-1 py-1 pr-1">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex min-w-0 flex-col">
              <span className="max-w-[200px] truncate font-medium text-foreground text-sm md:max-w-[300px]">
                {file.name}
              </span>
              <span className="whitespace-nowrap text-muted-foreground text-xs">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(fileKey);
              }}
            >
              <HugeiconsIcon icon={Trash} className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full border bg-muted">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="w-8 font-medium text-muted-foreground text-xs tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FileUpload({
  value,
  defaultValue = [],
  onChange,
  maxFiles = 1,
  maxSizeMB = 10,
  accept = "image/*",
  title = "Unggah File",
  description = "Klik untuk pilih dari perangkat Anda",
  buttonText = "Upload",
  helperText,
  className,
  dropzoneClassName,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;
  const [internalFiles, setInternalFiles] = useState<File[]>(defaultValue);
  const [fileProgresses, setFileProgresses] = useState<Record<string, number>>(
    {},
  );
  const uploadedFiles = isControlled ? value : internalFiles;

  const updateFiles = (nextFiles: File[]) => {
    if (!isControlled) {
      setInternalFiles(nextFiles);
    }
    onChange?.(nextFiles);
  };

  const handleFileSelect = (filesList: FileList | null) => {
    if (!filesList) return;

    let newFiles = Array.from(filesList);
    newFiles = newFiles.filter((f) => f.size <= maxSizeMB * 1024 * 1024);
    if (newFiles.length === 0) return;

    const nextFiles =
      maxFiles === 1
        ? [newFiles[0]].filter(Boolean)
        : [...uploadedFiles, ...newFiles].slice(0, maxFiles);

    updateFiles(nextFiles);

    const progressKeys = nextFiles.map((file) => getFileKey(file));
    setFileProgresses((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(([key]) => progressKeys.includes(key)),
      ),
    );

    newFiles.forEach((file) => {
      const fileKey = getFileKey(file);
      setFileProgresses((prev) => ({ ...prev, [fileKey]: 0 }));

      let progress = 0;
      const interval = window.setInterval(() => {
        progress += Math.random() * 20;
        const nextProgress = Math.min(progress, 100);
        setFileProgresses((prev) => ({ ...prev, [fileKey]: nextProgress }));

        if (nextProgress >= 100) {
          window.clearInterval(interval);
        }
      }, 100);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

  const removeFile = (fileKey: string) => {
    const updated = uploadedFiles.filter((file) => getFileKey(file) !== fileKey);
    updateFiles(updated);

    setFileProgresses((prev) => {
      const nextProgresses = { ...prev };
      delete nextProgresses[fileKey];
      return nextProgresses;
    });
  };

  useEffect(() => {
    if (maxFiles === 1) {
      return;
    }

    setFileProgresses((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(([key]) =>
          uploadedFiles.some((file) => getFileKey(file) === key),
        ),
      ),
    );
  }, [uploadedFiles, maxFiles]);

  const resolvedHelperText =
    helperText ??
    `Pastikan file jelas dan valid untuk diunggah (Maks. ${maxSizeMB}MB)`;

  return (
    <div className={cn("flex w-full flex-col", className)}>
      {uploadedFiles.length < maxFiles && (
        <div
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-8 text-center transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            dropzoneClassName,
          )}
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
          <div className="pointer-events-none mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
            <HugeiconsIcon icon={Camera01Icon} size={32} />
          </div>
          <h3 className="pointer-events-none mb-1 font-bold text-lg">
            {title}
          </h3>
          <p className="pointer-events-none mb-4 text-foreground/70 text-sm">
            {description}
          </p>
          <Button
            type="button"
            className="pointer-events-none mb-4 bg-primary pl-6 pr-4 hover:bg-primary/90"
            tabIndex={-1}
          >
            {buttonText}
            <HugeiconsIcon icon={Upload01Icon} className="ml-2" />
          </Button>
          <p className="pointer-events-none max-w-sm text-muted-foreground/60 text-xs">
            {resolvedHelperText}
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
        <div
          className={cn("space-y-3", uploadedFiles.length < maxFiles && "mt-4")}
        >
          {uploadedFiles.map((file) => {
            const fileKey = getFileKey(file);

            return (
              <UploadedFilePreview
                key={fileKey}
                file={file}
                progress={fileProgresses[fileKey] ?? 100}
                onRemove={removeFile}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
