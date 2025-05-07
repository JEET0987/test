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
    </div>
  );
};

export default UploadMode;
