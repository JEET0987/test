import React, { useState, useRef, useEffect } from 'react';

const UploadMode = ({ selectedColor, setSelectedColor, onNext }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [message, setMessage] = useState('');
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImageSrc(ev.target.result);
        setSelectedColor(null);
        setMessage('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (e) => {
    if (!imageRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    setSelectedColor({ hex });
    setMessage(`You selected color: ${hex}`);
  };

  const rgbToHex = (r, g, b) => {
    const toHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
  };

  useEffect(() => {
    if (imageSrc && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = imageRef.current;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    }
  }, [imageSrc]);

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border border-purple-500/20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-6 drop-shadow-[0_2px_8px_rgba(80,0,80,0.15)]">
            Upload Image
          </h2>
          <div className="space-y-6">
            <div className="border-2 border-dashed border-purple-500/20 rounded-lg p-8 bg-gray-700/50">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer block text-center"
              >
                <div className="text-gray-300 mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-purple-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-2 text-sm">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </label>
            </div>
            {imageSrc && (
              <div className="mt-4">
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="border border-gray-300 max-w-full h-auto cursor-crosshair"
                />
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Uploaded"
                  className="hidden"
                  onLoad={() => {
                    if (canvasRef.current && imageRef.current) {
                      const canvas = canvasRef.current;
                      const ctx = canvas.getContext('2d');
                      const img = imageRef.current;
                      canvas.width = img.naturalWidth;
                      canvas.height = img.naturalHeight;
                      ctx.drawImage(img, 0, 0);
                    }
                  }}
                />
              </div>
            )}
            {message && <p className="mt-2 text-lg font-semibold">{message}</p>}
            {selectedColor && (
              <button
                onClick={onNext}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
=======
    <div
      className="space-y-4 flex flex-col items-center justify-center text-center min-h-[300px]"
      style={{ backgroundColor: selectedColor ? (selectedColor.hex || selectedColor) : 'transparent' }}
    >
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageSrc && (
        <div className="mt-4">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="border border-gray-300 max-w-full h-auto cursor-crosshair"
          />
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Uploaded"
            className="hidden"
            onLoad={() => {
              if (canvasRef.current && imageRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                const img = imageRef.current;
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
              }
            }}
          />
        </div>
      )}
      {message && <p className="mt-2 text-lg font-semibold">{message}</p>}
      {selectedColor && (
        <button
          onClick={onNext}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      )}
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
    </div>
  );
};

export default UploadMode;
