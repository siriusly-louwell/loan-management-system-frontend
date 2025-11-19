import React from "react";
import AppModal from "./AppModal"; // adjust path if needed

export default function AcceptedDocumentsModal({
  open,
  onClose,
  title,
  documents,
  samplePic
}) {
  const isImage = (file) =>
    typeof file === "string" &&
    (file.endsWith(".jpg") ||
      file.endsWith(".jpeg") ||
      file.endsWith(".png") ||
      file.endsWith(".webp"));

  const hasImage = documents.some(isImage);
  const sampleImage = samplePic.some(isImage);

  return (
    <AppModal open={open} onClose={onClose} title={`Accepted Documents for ${title}`}>
      <div className="space-y-6 text-gray-300">

        {/* Description */}
        <p className="text-sm text-gray-400">
          You may upload any of the following accepted file types or formats.
        </p>

        {/* Document List or Images */}
        {hasImage ? (
          <div className="w-full h-64 md:h-80">
            {documents.map((img, idx) => (
              <div key={idx} className="text-center">
                <img
                  src={img}
                  alt="Accepted format example"
                  className="w-full h-full object-cover rounded-lg border border-white/10 shadow-md py-4 px-2"
                />
              </div>
            ))}
          </div>
        ) : (
          <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
            {documents.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
          {
            sampleImage && (
              <div className="w-full h-64 md:h-80">
                <h1 className="text-gray-300 font-bold text-lg mb-2">
                  Sample Image
                </h1>
                {samplePic.map((img, idx) => (
                  <div key={idx} className="text-center">
                    <img
                      src={img}
                      alt="Accepted format example"
                      className="w-full h-full object-cover rounded-lg border border-white/10 shadow-md py-4 px-2"
                    />
                  </div>
                ))}
              </div>
            )
          }
      </div>
    </AppModal>
  );
}
