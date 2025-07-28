import React, { useState } from "react";
import "./Wheel.css";

const rewards = [
  { icon: "🍻", text: "Tất cả uống 50%" },
  { icon: "👉", text: "Uống với người chỉ định" },
  { icon: "⬅️", text: "Bên trái uống 50%" },
  { icon: "♀️", text: "Nữ uống 50%" },
  { icon: "♂️", text: "Nam uống 50%" },
  { icon: "🎤", text: "Hát một bài hoặc uống với người đối diện" },
  { icon: "🎁", text: "Qua lượt bằng cách chỉ định người khác uống" },
  { icon: "🙅‍♂️", text: "Qua lượt" },
  { icon: "💃", text: "Lắc mông vài cái rồi uống 50%" },
  { icon: "😹", text: "Vừa uống 50% vừa kêu meow meow" },
  { icon: "😛", text: "Uống xong lè lưỡi thở 3s" }
];




const Wheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("");
  const [shuffledRewards, setShuffledRewards] = useState(rewards);

  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const handleSpin = () => {
    if (isSpinning) return;
  
    const newRewards = shuffleArray(rewards);
    setShuffledRewards(newRewards);
  
    const rewardCount = newRewards.length;
    const anglePerSegment = 360 / rewardCount;
    const extraSpin = 360 * 5;
    const randomAngle = Math.random() * 360;
    const rotateDeg = extraSpin + randomAngle;
  
    setIsSpinning(true);
    setRotation(prev => {
      const finalRotation = prev + rotateDeg;
  
      setTimeout(() => {
        setIsSpinning(false);
        const actualDeg = (finalRotation % 360 + 360) % 360;
        const adjustedDeg = (actualDeg + anglePerSegment / 2) % 360;
        const index = Math.floor((360 - adjustedDeg) / anglePerSegment) % rewardCount;
        setResult(newRewards[index].text);
      }, 4000);
  
      return finalRotation;
    });
  };
  
  


  return (
    <div className="flex flex-col items-center mt-12">
      <div
        className="wheel transition-all duration-[4000ms] ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {shuffledRewards.map((reward, idx) => (
        <div
          key={idx}
          className="segment"
          style={{
          transform: `rotate(${(360 / shuffledRewards.length) * idx}deg) skewY(-60deg)`
          }}
        >
          <span className="text-xl">{reward.icon}</span>
        </div>
          ))}
      </div>
      <div className="pointer mt-4 text-2xl">▲</div>
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
      >
        {isSpinning ? "Đang quay..." : "Quay ngay 🍻"}
      </button>
      {result && !isSpinning && (
        <p className="mt-6 text-center text-lg font-semibold text-pink-700">
          🎉 Kết quả: <br /> <span className="text-xl">{result}</span>
        </p>
      )}
    </div>
  );
};

export default Wheel;
