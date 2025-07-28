import React from "react";
import Wheel from "./Wheel";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-200">
      <h1 className="text-3xl font-bold text-red-600 mb-8">🎉 Vòng Quay Mai Off</h1>
      <Wheel />
    </div>
  );
}

export default App;
