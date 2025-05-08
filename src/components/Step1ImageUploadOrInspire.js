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
    <div>
      {!mode && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 transition-all duration-300" style={{ background: 'linear-gradient(to right bottom, rgb(245, 245, 245))' }}>
          <div className="bg-white/80 rounded-3xl shadow-xl p-6 sm:p-10 max-w-xl w-full text-center backdrop-blur-md">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-800 tracking-tight transition-all duration-500 hover:scale-105">
              🎨 Event Color Match
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-8">Find the perfect color theme for your next event!</p>
            <div className="flex justify-center gap-4 sm:gap-6 mb-8 flex-wrap">
              <button
                onClick={() => setMode('upload')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                📤 Upload an Image
              </button>
              <button
                onClick={() => setMode('inspire')}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                ✨ Inspire Me
              </button>
            </div>
          </div>
        </div>
      )}

      {mode === 'upload' && (
        <div className="min-h-screen flex items-center justify-center p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-blue-50 via-purple-100 to-pink-100">
          <div className={`bg-white/90 p-8 sm:p-10 rounded-2xl shadow-2xl w-full text-center backdrop-blur-md ${selectedColor ? 'max-w-2xl' : 'max-w-lg'}`}>
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-6">Upload Your Image</h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8">Select an image to upload and preview it before proceeding.</p>
            <label htmlFor="image-upload" className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl text-lg shadow-lg hover:scale-105 transition-transform duration-300">📸 Choose Image</label>
            <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
{imageSrc && (
<div className="mt-4 flex items-start justify-center space-x-12 max-w-full mx-auto px-4">
<canvas
  ref={canvasRef}
  onClick={handleCanvasClick}
  className="border border-gray-300 max-w-[75%] max-h-[450px] h-auto cursor-crosshair"
/>
    <div className="flex flex-col items-center space-y-6 ml-10 pt-16 min-w-[160px]">
      {selectedColor && (
        <div className="flex items-center space-x-3">
          <div
            className="w-7 h-7 rounded-full border border-gray-400"
            style={{ backgroundColor: selectedColor?.hex || selectedColor }}
          />
          <span className="text-xl font-semibold">{selectedColor?.hex || selectedColor}</span>
        </div>
      )}
      {selectedColor && (
        <button
          onClick={onNext}
          className="px-8 py-4 bg-green-500 text-white rounded-xl text-lg shadow-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          Next
        </button>
      )}
    </div>
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
          </div>
        </div>
      )}

      {mode === 'inspire' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 transition-all duration-300" style={{ backgroundColor: selectedColor ? (selectedColor.hex || selectedColor) : 'transparent' }}>
          <div className="space-y-4 flex flex-col items-center justify-center text-center min-h-[300px]">
            <h2 className="text-2xl font-bold mb-4">Get Inspired</h2>
            <p className="mb-4">Choose a color that sparks your creativity:</p>
            <div className="grid grid-cols-4 gap-6 justify-center">
              {inspirationColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => {
                    setSelectedColor(color);
                    setMessage(`You selected color: ${color.name} (${color.hex})`);
                  }}
                  className={`h-16 w-16 rounded-full focus:outline-none ring-4 transition mx-auto ${
                    selectedColor && selectedColor.hex === color.hex
                      ? 'ring-black'
                      : 'ring-transparent'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
            {selectedColor && (
              <button
                onClick={onNext}
                className="mt-6 px-8 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition mx-auto"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1ImageUploadOrInspire;
