import React from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function AcceptedDocumentsModal({
  open,
  onClose,
  title,
  documents,
}) {
  if (!open) return null;

  // Close when clicking outside modal
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const hasImage = documents?.some(
    (item) => 
        typeof item === "string" &&
        (item.endsWith(".jpg") ||
        item.endsWith(".jpeg") ||
        item.endsWith(".png") ||
        item.endsWith(".webp"))
  )

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed overflow-y-auto inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
    >
      <div className="bg-gray-800 rounded-2xl p-12 w-full max-w-md shadow-2xl animate-slideUp relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <CloseIcon fontSize="small" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-100 mb-3">
          Accepted Documents for <span className="text-red-600">{title}</span>
        </h2>

        <p className="text-sm text-gray-400 mb-4">
          You may upload any of the following valid file types:
        </p>

        {/* Documents List */}
        {
            hasImage ? (
            <div className="flex flex-col items-center space-y-4">
                {documents.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    alt="accepted format"
                    className="bg-gray-100 w-50 h-50 object-cover rounded-lg shadow-md border"
                />
                ))}
            </div>
            ) : (
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
                {documents?.map((doc, index) => (
                    <li key={index} className="text-sm">
                    {doc}
                    </li>
                ))}
            </ul>
            )
        }


        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
