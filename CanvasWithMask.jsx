import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

const CanvasWithMask = ({ image, mask }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    // Disable selection on canvas to make it static

    // Clear the canvas when image or mask changes
    canvas.clear();

    if (!image) return; // Do not proceed if there is no image

    // Load the main image
    fabric.Image.fromURL(
      image,
      (img) => {
        // Set the main image to be movable and to fit within a width of 300px
        img.scaleToWidth(300);
        img.set({
          selectable: true, // Allow the image to be selected and moved
          hasControls: true,
          evented: true,
          top: 100,
          left: 0, // Show controls to move the image
        });

        canvas.add(img);
        canvas.setActiveObject(img);

        if (mask) {
          // Load the mask image
          fabric.Image.fromURL(
            mask,
            (maskImg) => {
              // Create a BlendImage filter with the mask
              const maskFilter = new fabric.Image.filters.BlendImage({
                image: maskImg, // Use the loaded mask image
                mode: "mask",
                alpha: 0.5, // Set alpha to 1 for a full mask effect
              });

              // Apply the mask filter to the main image
              img.filters.push(maskFilter);

              // Apply filters and re-render canvas
              img.applyFilters();
              canvas.renderAll();
            },
            { crossOrigin: "anonymous" },
          );
        }
      },
      { crossOrigin: "anonymous" },
    );
  }, [image, mask]); // Re-run effect if image or mask changes

  return (
    <div className="canvas_container">
      <canvas ref={canvasRef} width="800" height="600" />
    </div>
  );
};

export default CanvasWithMask;
