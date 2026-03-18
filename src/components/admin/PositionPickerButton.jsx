import React, { useState, useRef, useEffect } from "react";
import "./PositionPickerButton.css";
import { assetApi } from "@/api/admin/assetApi";

/**
 * PositionPickerButton Component
 * 
 * Provides a button that opens a modal with a video or image placeholder.
 * Users can click on the video/image to set x and y coordinates as percentages (0-1).
 * 
 * Props:
 * - onPositionSelect: Callback function(x, y) with decimal values 0-1
 * - currentX: Current x position (optional, for display)
 * - currentY: Current y position (optional, for display)
 * - videoSource: URL to a video file to display instead of placeholder
 */
const PositionPickerButton = ({ onPositionSelect, currentX, currentY, videoSource }) => {
    const [VideoUrl, setVideoUrl] = useState(null);
    const fetchVideo = async (videoId) => {
        try {
            const response = await assetApi.getAssetFileUrl(videoId);
            setVideoUrl(response);
        } catch (error) {
            console.error("Error fetching video URL:", error);
        }
    }
    useEffect(() => {
        if (videoSource) {
            fetchVideo(videoSource);
        }
    }, [videoSource]);
    
  const [isOpen, setIsOpen] = useState(false);
  const [selectedX, setSelectedX] = useState(currentX);
  const [selectedY, setSelectedY] = useState(currentY);
  const containerRef = useRef(null);

  const handleContainerClick = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate click position relative to the container
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert to percentage (0-1) based on container dimensions
    const percentX = clickX / rect.width;
    const percentY = clickY / rect.height;

    // Clamp values between 0 and 1
    const x = Math.max(0, Math.min(1, percentX));
    const y = Math.max(0, Math.min(1, percentY));

    // Update temporary selection state
    setSelectedX(x);
    setSelectedY(y);
  };

  const handleConfirm = () => {
    if (onPositionSelect && selectedX !== undefined && selectedY !== undefined) {
      // Round to 2 decimal places
      const roundedX = Math.round(selectedX * 100) / 100;
      const roundedY = Math.round(selectedY * 100) / 100;
      onPositionSelect(roundedX, roundedY);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSelectedX(currentX);
    setSelectedY(currentY);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="position-picker-btn"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        Set Position
      </button>

      {isOpen && (
        <div className="position-picker-modal-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="position-picker-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <div className="position-picker-header">
              <h2>Select Position on Video</h2>
              <button
                className="close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div> */}

            <div className="position-picker-content">
              <div className="position-picker-image-container">
                <div
                  ref={containerRef}
                  className="position-picker-image"
                  onClick={handleContainerClick}
                >
                  {VideoUrl ? (
                    <>
                      <video
                        className="position-picker-video"
                        src={VideoUrl}
                        autoPlay
                        loop
                        muted
                      />
                      {selectedX !== undefined && selectedY !== undefined && (
                        <div
                          className="position-marker"
                          style={{
                            left: `${selectedX * 100}%`,
                            top: `${selectedY * 100}%`,
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <div className="position-picker-placeholder">
                        <div className="placeholder-text">
                          Video Placeholder<br />
                          (1920 × 1080)
                        </div>
                        {selectedX !== undefined && selectedY !== undefined && (
                          <div className="current-position">
                            X: {selectedX.toFixed(2)} | Y: {selectedY.toFixed(2)}
                          </div>
                        )}
                      </div>
                      {selectedX !== undefined && selectedY !== undefined && (
                        <div
                          className="position-marker"
                          style={{
                            left: `${selectedX * 100}%`,
                            top: `${selectedY * 100}%`,
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="position-picker-footer">
                <div className="flex gap-2 justify-center">
                    <p>Click on the video to set the position.</p>
                    {selectedX !== undefined && selectedY !== undefined && (
                    <p className="selected-coords">
                        Selected: X = {selectedX.toFixed(2)}, Y = {selectedY.toFixed(2)}
                    </p>
                    )}
                </div>
                <div className="position-picker-buttons">
                  <button
                    className="confirm-btn"
                    onClick={handleConfirm}
                    type="button"
                  >
                    Confirm
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={handleCancel}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PositionPickerButton;
