import React from "react";

const Loading = () => {
  const dots = Array.from({ length: 8 });

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="relative flex items-center justify-start h-28 w-28">
        {dots.map((_, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 flex items-center justify-start h-full w-full"
            style={{ transform: `rotate(${index * 45}deg)` }}
          >
            <div
              className="h-1/5 w-1/5 rounded-full bg-[#183153] opacity-50 animate-pulse0112"
              style={{ animationDelay: `calc(0.9s * -${(8 - index) / 8})` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
