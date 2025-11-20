import React from "react";
import "./StarSparkle.css";

export default function StarSparkle({ color }) {
  const sparks = Array.from({ length:  120});

  return (
    <div className="spark-explode-zone">
      {sparks.map((_, i) => {
        const angle = Math.random() * 2 * Math.PI;
        const distance = 100 + Math.random() * 120; // explosion 100–220px

        return (
          <span
            key={i}
            className={`spark ${color}`}
            style={{
              "--tx": `${Math.cos(angle) * distance}px`,
              "--ty": `${Math.sin(angle) * distance}px`,
              animationDelay: `${i * 0.0008}s`,
            }}
          />
        );
      })}
    </div>
  );
}
