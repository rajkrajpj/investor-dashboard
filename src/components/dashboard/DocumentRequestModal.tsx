"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import { X, Trash2, Upload } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UploadedFile {
  id: string;
  name: string;
  // type: string; // Could add type for specific icons or previews later
  // previewUrl?: string; // For image previews
}

interface DocumentRequestModalProps {
  companyName?: string;
}

const DocumentRequestModal: React.FC<DocumentRequestModalProps> = ({
  companyName = "Armed Forces Brewing Company",
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map(file => ({
        id: crypto.randomUUID(), // Generate a unique ID
        name: file.name,
      }));
      setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
    // Clear the input value to allow re-uploading the same file if needed
    if(event.target) {
      event.target.value = "";
    }
  };

  const handleRemoveFile = (fileIdToRemove: string) => {
    setUploadedFiles(prevFiles => prevFiles.filter(file => file.id !== fileIdToRemove));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    console.log("Submitting documents:", uploadedFiles);
    // Add actual submission logic here
    // Typically, you'd close the dialog after submission:
    // Find a way to programmatically close if needed, or rely on DialogClose
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Upload Document</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{companyName} is requesting a document from you.</DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto p-1 pr-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex-col justify-start items-start gap-2 inline-flex">
              <label htmlFor="docType" className="text-sm font-medium text-gray-700">DOCUMENT TYPE</label>
              <input
                id="docType"
                type="text"
                placeholder="Document type"
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-500 text-sm"
              />
            </div>
            <div className="flex-col justify-start items-start gap-2 inline-flex">
              <label htmlFor="docNum" className="text-sm font-medium text-gray-700">DOCUMENT NUMBER</label>
              <input
                id="docNum"
                type="text"
                placeholder="Document number"
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-500 text-sm"
              />
            </div>
          </div>

          <div className="flex-col justify-start items-start flex">
            <label htmlFor="details" className="text-sm font-medium text-gray-700">DETAILS</label>
            <textarea
              id="details"
              placeholder="Provide details about the document..."
              className="w-full min-h-[100px] px-5 py-3 bg-gray-50 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-500 text-sm resize-none"
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-2">
              {uploadedFiles.map(file => (
                <div key={file.id} className="relative group aspect-square">
                  <div className="w-full h-full bg-gray-100 rounded-lg flex flex-col items-center justify-center p-2 border border-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-gray-600 text-center break-all leading-tight">{file.name}</span>
                  </div>
                  <button 
                    onClick={() => handleRemoveFile(file.id)}
                    className="absolute top-1 right-1 p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 focus:opacity-100"
                    aria-label={`Remove ${file.name}`}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <input 
            type="file" 
            multiple 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            className="hidden" 
            accept=".pdf,.doc,.docx,.txt,image/*"
          />
          <div 
            onClick={triggerFileInput} 
            onDrop={(e) => { 
              e.preventDefault(); 
              if (e.dataTransfer.files) {
                const newFiles: UploadedFile[] = Array.from(e.dataTransfer.files).map(file => ({
                  id: crypto.randomUUID(),
                  name: file.name,
                }));
                setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
              }
            }}
            onDragOver={(e) => e.preventDefault()}
            className="w-full min-h-[100px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col justify-center items-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <Upload size={24} className="text-gray-500" />
            <div className="text-center">
              <span className="text-gray-500 text-sm font-semibold">
                Click to upload
              </span>
              <span className="text-gray-500 text-sm font-normal">
                {" "}
                or drag and drop
              </span>
            </div>
            <div className="text-center text-gray-500 text-xs font-normal">
              PDF, DOC, DOCX, TXT, PNG, JPG, GIF etc.
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4 border-t">
          <DialogPrimitive.Close asChild>
            <Button variant="outline">Cancel</Button>
          </DialogPrimitive.Close>
          <Button onClick={handleSubmit}>Submit now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentRequestModal;
