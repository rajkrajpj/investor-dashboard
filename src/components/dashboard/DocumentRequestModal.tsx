import React from "react";
import { X, Trash2, Upload } from "lucide-react";

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

        {/* Image Previews */}
        <div className="self-stretch justify-start items-start gap-6 inline-flex">
          {/* Image 1 */}
          <div className="w-[122px] h-[125px] relative group">
            <div className="w-[122px] h-[125px] left-0 top-0 absolute bg-[#d9d9d9] rounded-lg"></div>
            <button className="absolute top-2 left-2 p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>

          {/* Image 2 */}
          <div className="w-[122px] h-[125px] relative group">
            <div className="w-[122px] h-[125px] left-0 top-0 absolute bg-[#d9d9d9] rounded-lg"></div>
            <button className="absolute top-2 left-2 p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>

          {/* Image 3 */}
          <div className="w-[122px] h-[125px] relative group">
            <div className="w-[122px] h-[125px] left-0 top-0 absolute bg-[#d9d9d9] rounded-lg"></div>
            <button className="absolute top-2 left-2 p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>
        </div>

        {/* File Upload Area */}
        <div className="self-stretch h-[109px] px-[263px] py-4 bg-gray-50 rounded-lg border-2 border-gray-200 flex-col justify-center items-center gap-2.5 flex">
          <div className="flex-col justify-start items-center gap-[7px] flex">
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
