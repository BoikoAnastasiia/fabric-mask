import React, { useState } from "react";
import "./App.css";
import CanvasWithMask from "./CanvasWithMask";

function App() {
  const defaultMask =
    "https://d2tyu887lcxnka.cloudfront.net/432A86082EF3C4C77B1E3EE6EE15E2D1.png";
  const [image, setImage] = useState(null);
  const [mask, setMask] = useState(defaultMask);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleMaskChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maskUrl = URL.createObjectURL(file);
      setMask(maskUrl);
    }
  };

  const resetImages = () => {
    setImage(null);
    setMask(defaultMask);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <label>
            Upload Image: <input type="file" onChange={handleImageChange} />
          </label>
          <label>
            Upload Mask: <input type="file" onChange={handleMaskChange} />
          </label>
        </div>
        <button onClick={resetImages}>Reset</button>
        <CanvasWithMask image={image} mask={mask} />
      </header>
    </div>
  );
}

export default App;
