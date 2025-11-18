import React, { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useRef } from "react";
import BttnwithIcon from "../buttons/BttnwithIcon";
import Plus from "../../assets/icons/Plus";

export default function FileInput({
  label,
  type,
  change,
  name,
  accept,
  popUpClick,
  require = false,
}) {
  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);

  const fileType =
    type === "img"
      ? "SVG, PNG, or JPG (MAX. 2MB 800x400px)"
      : "PDF or DOCX (MAX. 2MB)";
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    change(e); // Call parent handler
    if (!file) return;
    setFileName(file.name);

    if (file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      // Not an image (PDF, DOCX)
      setPreview(null);
    }
  };

  return (
    <div className="mb-4 max-w-[42vh]">
      <div className="flex flex-col">
        <div className="flex justify-between mb-1">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor={name}
          >
            {label}{" "}
            {require ? <strong className="text-rose-500">*</strong> : ""}
          </label>
          <button type="button" onClick={popUpClick}>
            <HelpOutlineIcon sx={{ color: "#909090ff" }} />
          </button>
        </div>
        <input
          style={{ display: "none" }}
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 cursor-pointer border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id={name}
          type="file"
          ref={fileInputRef}
          name={name}
          accept={accept}
        />
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={cameraInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <div className="flex gap-4">
          <BttnwithIcon
            click={() => cameraInputRef.current.click()}
            type="button"
            text="Take a Picture"
          >
            <Plus />
          </BttnwithIcon>
          <BttnwithIcon
            click={() => fileInputRef.current.click()}
            type="button"
            text="Choose from file"
          >
            <Plus />
          </BttnwithIcon>
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
          {fileType}
        </p>
      </div>
      <div>
        {preview ? (
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Preview:
            </p>
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-48 h-auto rounded-lg border border-gray-300 object-cover"
            />
          </div>
        ) : fileName ? (
          <div className="mt-3 text-gray-700 dark:text-gray-300">
            <p className="text-sm font-medium">Selected File:</p>
            <p className="text-sm">{fileName}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
