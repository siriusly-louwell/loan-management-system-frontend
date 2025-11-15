// UploadPhotoInfo.js
import React from 'react';
import AppModal from '../../components/modals/AppModal';

const UploadPhotoInfo = ({ open, onClose }) => {
    return (
        <AppModal open={open} onClose={onClose} title="Upload photo info">
            <div className="space-y-6 text-gray-300">
                <div>
                    <h2 className="text-2xl font-semibold text-white">Picture Requirements</h2>
                    <p className="text-sm mt-1 text-gray-400">
                        Please follow the guidelines below when submitting your photo. This helps us verify your identity properly.
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-white font-medium text-lg">What to Upload</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                        <li>Formal picture with clear view of your face</li>
                        <li>Neutral or plain background (white or light-colored preferred)</li>
                        <li>Proper lighting — no shadows covering the face</li>
                        <li>No hats, sunglasses, masks, or filters</li>
                        <li>Centered head and shoulders</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="text-white font-medium text-lg mb-3">Examples</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <a href="https://i.pinimg.com/236x/2a/7d/4c/2a7d4c4bc1381a476b8b8a85885ac392.jpg"
                                target="_blank"
                                rel="noopener noreferrer">
                                <img
                                    src="https://i.pinimg.com/236x/2a/7d/4c/2a7d4c4bc1381a476b8b8a85885ac392.jpg?w=600&h=600&fit=crop"
                                    className="rounded-lg object-cover w-full h-48 border border-white/10"
                                    alt="Good example - formal headshot" />
                            </a>
                            <p className="text-green-400 font-semibold mt-2 tracking-wide text-sm">GOOD</p>
                        </div>
                        <div className="text-center">
                            <a href="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
                                target="_blank"
                                rel="noopener noreferrer">
                                <img
                                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop"
                                    className="rounded-lg object-cover w-full h-48 border border-white/10"
                                    alt="Bad example - casual or obstructed face" />
                            </a>
                            <p className="text-red-400 font-semibold mt-2 tracking-wide text-sm">BAD</p>
                        </div>
                    </div>

                    <br />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <a href="https://www.veriff.com/wp-content/uploads/2025/04/Z7Wg2J7c43Q3f9RX_Front-ID-declined-2--1024x643.png"
                                target="_blank"
                                rel="noopener noreferrer">
                                <img
                                    src="https://www.veriff.com/wp-content/uploads/2025/04/Z7Wg2J7c43Q3f9RX_Front-ID-declined-2--1024x643.png?w=600&h=600&fit=crop"
                                    className="rounded-lg object-cover w-full h-48 border border-white/10"
                                    alt="Good example - formal headshot" />
                            </a>
                            <p className="text-green-400 font-semibold mt-2 tracking-wide text-sm">GOOD</p>
                        </div>

                        <div className="text-center">
                            <a href="https://i.sstatic.net/Qz7VK.jpg"
                                target="_blank"
                                rel="noopener noreferrer">
                                <img
                                    src="https://i.sstatic.net/Qz7VK.jpg?w=600&h=600&fit=crop"
                                    className="rounded-lg object-cover w-full h-48 border border-white/10"
                                    alt="Bad example - casual or obstructed face" />
                            </a>
                            <p className="text-red-400 font-semibold mt-2 tracking-wide text-sm">BAD</p>
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs mt-2 text-center">
                        Click images to view full size.
                    </p>
                </div>
            </div>
        </AppModal>
    );
};

export default UploadPhotoInfo;
