  <div className="color-matching-container">
    <h2>Color Matching</h2>
    <div className="color-input">
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      />
      <button onClick={handleFindMatchingColors}>Find Matching Colors</button>
    </div>
    {loading && <p>Loading...</p>}
    {error && <p className="error">{error}</p>}
    {matchingColors.length > 0 && (
      <div className="matching-colors">
        <h3>Matching Colors:</h3>
        <div className="color-grid">
          {matchingColors.map((color, index) => (
            <div key={index} className="color-item">
              <div
                className="color-swatch"
                style={{ backgroundColor: color.hex }}
              ></div>
              <p>{color.name}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div> 