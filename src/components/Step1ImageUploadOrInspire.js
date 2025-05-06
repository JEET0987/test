import React, { useState, useRef, useEffect } from 'react';

const inspirationColors = [
  { name: 'Coral', hex: '#FF6F61' },
  { name: 'Turquoise', hex: '#40E0D0' },
  { name: 'Sunflower', hex: '#FFC312' },
  { name: 'Lavender', hex: '#B497BD' },
  { name: 'Mint', hex: '#98FF98' },
  { name: 'Peach', hex: '#FFDAB9' },
  { name: 'Sky Blue', hex: '#87CEEB' },
  { name: 'Rose', hex: '#FF007F' },
];

const Step1ImageUploadOrInspire = ({ selectedColor, setSelectedColor, onNext }) => {
  const [mode, setMode] = useState(null); // 'upload' or 'inspire'
  const [imageSrc, setImageSrc] = useState(null);
  const [message, setMessage] = useState('');
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (selectedColor) {
      setMessage(`You selected color: ${selectedColor.hex || selectedColor}`);
    }
  }, [selectedColor]);

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
    <div className="space-y-4">
      {!mode && (
        <div className="space-x-4">
          <button
            onClick={() => setMode('upload')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload an Image
          </button>
          <button
            onClick={() => setMode('inspire')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Inspire Me
          </button>
        </div>
      )}

      {mode === 'upload' && (
        <div>
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
      )}

      {mode === 'inspire' && (
        <div>
          <p className="mb-2 font-semibold">Prepared to be Inspired</p>
          <div className="grid grid-cols-4 gap-4 max-w-md">
            {inspirationColors.map((color) => (
              <div
                key={color.hex}
                onClick={() => {
                  setSelectedColor(color);
                  setMessage(`You selected color: ${color.name} (${color.hex})`);
                }}
                className={`h-12 w-12 rounded cursor-pointer border-4 ${
                  selectedColor && selectedColor.hex === color.hex
                    ? 'border-black'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
          {message && <p className="mt-2 text-lg font-semibold">{message}</p>}
          {selectedColor && (
            <button
              onClick={onNext}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Step1ImageUploadOrInspire;
