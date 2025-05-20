import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import axios from 'axios';

const ColorMatcher = ({ onColorSelect }) => {
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    const [similarColors, setSimilarColors] = useState([]);
    const [complementaryColors, setComplementaryColors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
    };

    const findMatchingColors = async () => {
        setLoading(true);
        setError(null);
        try {
            // Find similar colors
            const similarResponse = await axios.post('http://localhost:5000/api/color-matching/match', {
                targetColor: selectedColor,
                type: 'similar'
            });
            setSimilarColors(similarResponse.data.results);

            // Find complementary colors
            const complementaryResponse = await axios.post('http://localhost:5000/api/color-matching/match', {
                targetColor: selectedColor,
                type: 'complementary'
            });
            setComplementaryColors(complementaryResponse.data.results);
        } catch (err) {
            setError('Error finding matching colors. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleColorSelect = (product) => {
        if (onColorSelect) {
            onColorSelect(product);
        }
    };

    return (
        <div className="color-matcher">
            <div className="color-picker-section">
                <h3>Select a Color</h3>
                <ChromePicker
                    color={selectedColor}
                    onChange={handleColorChange}
                />
                <button
                    onClick={findMatchingColors}
                    disabled={loading}
                    className="find-colors-btn"
                >
                    {loading ? 'Finding Colors...' : 'Find Matching Colors'}
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="matching-colors-section">
                {similarColors.length > 0 && (
                    <div className="color-group">
                        <h4>Similar Colors</h4>
                        <div className="color-grid">
                            {similarColors.map((product, index) => (
                                <div
                                    key={index}
                                    className="color-item"
                                    onClick={() => handleColorSelect(product)}
                                >
                                    <div
                                        className="color-swatch"
                                        style={{ backgroundColor: product.singleHex }}
                                    />
                                    <div className="color-info">
                                        <span className="color-name">{product.singleColour}</span>
                                        <span className="color-hex">{product.singleHex}</span>
                                        <span className="color-brand">{product.brand}</span>
                                        {product.balloonImage && (
                                            <img 
                                                src={product.balloonImage} 
                                                alt={product.singleColour}
                                                className="balloon-image"
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {complementaryColors.length > 0 && (
                    <div className="color-group">
                        <h4>Complementary Colors</h4>
                        <div className="color-grid">
                            {complementaryColors.map((product, index) => (
                                <div
                                    key={index}
                                    className="color-item"
                                    onClick={() => handleColorSelect(product)}
                                >
                                    <div
                                        className="color-swatch"
                                        style={{ backgroundColor: product.singleHex }}
                                    />
                                    <div className="color-info">
                                        <span className="color-name">{product.singleColour}</span>
                                        <span className="color-hex">{product.singleHex}</span>
                                        <span className="color-brand">{product.brand}</span>
                                        {product.balloonImage && (
                                            <img 
                                                src={product.balloonImage} 
                                                alt={product.singleColour}
                                                className="balloon-image"
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .color-matcher {
                    padding: 20px;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .color-picker-section {
                    margin-bottom: 20px;
                }

                .find-colors-btn {
                    margin-top: 15px;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }

                .find-colors-btn:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }

                .error-message {
                    color: #dc3545;
                    margin: 10px 0;
                    padding: 10px;
                    background-color: #f8d7da;
                    border-radius: 4px;
                }

                .matching-colors-section {
                    display: grid;
                    gap: 20px;
                }

                .color-group {
                    margin-top: 20px;
                }

                .color-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 15px;
                    margin-top: 10px;
                }

                .color-item {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .color-item:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .color-swatch {
                    width: 40px;
                    height: 40px;
                    border-radius: 4px;
                    margin-right: 10px;
                    border: 1px solid #ddd;
                }

                .color-info {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }

                .color-name {
                    font-weight: bold;
                    margin-bottom: 2px;
                }

                .color-hex {
                    color: #666;
                    font-size: 0.9em;
                }

                .color-brand {
                    color: #888;
                    font-size: 0.8em;
                }

                .balloon-image {
                    width: 100%;
                    height: auto;
                    margin-top: 10px;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
};

export default ColorMatcher; 