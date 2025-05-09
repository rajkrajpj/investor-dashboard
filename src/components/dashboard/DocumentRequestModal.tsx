import React, { useState, ChangeEvent } from "react";
import { X, Trash2, Upload } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  // type: string; // Could add type for specific icons or previews later
  // previewUrl?: string; // For image previews
}

interface DocumentRequestModalProps {
  companyName?: string;
  onClose?: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DocumentRequestModal: React.FC<DocumentRequestModalProps> = ({
  companyName = "Armed Forces Brewing Company",
  onClose,
  onSubmit,
  onCancel,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

  return (
    <div className="w-[724px] h-[714px] px-10 pb-10 bg-white rounded-lg flex-col justify-center items-center inline-flex">
      {/* Modal Header */}
      <div className="self-stretch pt-10 pb-4 justify-between items-center inline-flex">
        <div className="w-[548px] self-stretch justify-start items-center flex">
          <div className="grow shrink basis-0 text-[#111928] text-xl font-semibold font-inter leading-[30px]">
            {companyName} is requesting a document from you.
          </div>
        </div>
        <div className="self-stretch flex-col justify-start items-end inline-flex">
          <button
            onClick={onClose}
            className="w-5 h-5 flex justify-center items-center"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Modal Body */}
      <div className="self-stretch h-[558px] flex-col justify-start items-center gap-4 flex">
        {/* Separator */}
        <div className="self-stretch h-px flex-col justify-start items-center flex">
          <div className="self-stretch h-px bg-gray-200 rounded-2xl"></div>
        </div>

        {/* Document Type and Number Fields */}
        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          {/* Document Type Field */}
          <div className="w-[364px] flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch text-sm font-medium text-gray-700">
              DOCUMENT TYPE
            </div>
            <div className="self-stretch px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 justify-start items-center gap-2.5 inline-flex">
              <input
                type="text"
                placeholder="Document type"
                className="grow shrink basis-0 h-[18px] bg-transparent outline-none text-gray-900 placeholder-gray-500 text-sm"
              />
            </div>
          </div>

          {/* Document Number Field */}
          <div className="w-[364px] flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch text-sm font-medium text-gray-700">
              DOCUMENT NUMBER
            </div>
            <div className="self-stretch px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 justify-start items-center gap-2.5 inline-flex">
              <input
                type="text"
                placeholder="Document number"
                className="grow shrink basis-0 h-[18px] bg-transparent outline-none text-gray-900 placeholder-gray-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Details Field */}
        <div className="self-stretch flex-col justify-start items-start flex">
          <div className="w-full flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch text-sm font-medium text-gray-700">
              DETAILS
            </div>
            <textarea
              placeholder="Lorem ipsum dolor sit amet consectetur. Tempus vitae bibendum vulputate sed lorem sed ornare. Interdum condimentum tincidunt et mi elementum in ut fermentum. Id tincidunt volutpat sapien ultrices dictum nunc."
              className="self-stretch min-h-[113px] px-5 py-[13px] bg-gray-50 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-500 text-sm resize-none"
            />
          </div>
        </div>

        {/* Dynamically Rendered File Previews (was Image Previews) */}
        {uploadedFiles.length > 0 && (
          <div className="self-stretch justify-start items-start gap-4 inline-flex flex-wrap py-2">
            {uploadedFiles.map(file => (
              <div key={file.id} className="w-[122px] h-[125px] relative group mb-2">
                <div className="w-full h-full bg-gray-100 rounded-lg flex flex-col items-center justify-center p-2 border border-gray-300">
                  {/* Basic file icon or placeholder for preview */}
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

        {/* File Upload Area */}
        <input 
          type="file" 
          multiple 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          className="hidden" 
          accept="image/svg+xml, image/png, image/jpeg, image/gif" // Specify accepted file types
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
          onDragOver={(e) => e.preventDefault()} // Necessary for onDrop to work
          className="self-stretch h-[109px] px-4 py-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex-col justify-center items-center gap-2.5 flex cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <div className="flex-col justify-start items-center gap-[7px] flex pointer-events-none">
            <Upload size={24} className="text-gray-500" />
            <div className="text-center">
              <span className="text-gray-500 text-sm font-semibold font-inter">
                Click to upload
              </span>
              <span className="text-gray-500 text-sm font-normal font-inter">
                {" "}
                or drag and drop
              </span>
            </div>
            <div className="text-center text-gray-500 text-xs font-normal font-inter">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="self-stretch pt-4 justify-between items-start inline-flex">
          <button
            onClick={onCancel}
            className="px-5 py-3 rounded-lg border border-gray-200 justify-center items-center gap-2 flex hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-700 text-sm font-medium font-inter">
              Cancel
            </span>
          </button>
          <button
            onClick={onSubmit}
            className="px-5 py-3 bg-[#1a56db] rounded-lg justify-center items-center gap-2 flex hover:bg-blue-700 transition-colors"
          >
            <span className="text-white text-sm font-medium font-inter">
              Submit now
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentRequestModal;
