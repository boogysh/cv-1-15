import React from "react";
import "./StarSparkle.css";  //css color for each component
const StarSparkle = ({color}) => {
  return (
    <div className="spark-container">
      {/* 🌟 éclats dorés avec dispersion aléatoire */}
      {[...Array(10)].map((_, i) => {
        const randomX1 = (Math.random() * 50 - 25).toFixed(0) + "px";
        const randomY1 = (-15 - Math.random() * 20).toFixed(0) + "px";
        const randomX2 = (Math.random() * 50 - 25).toFixed(0) + "px";
        const randomY2 = (-35 - Math.random() * 20).toFixed(0) + "px";
        const randomX3 = (Math.random() * 50 - 25).toFixed(0) + "px";
        const randomY3 = (-50 - Math.random() * 20).toFixed(0) + "px";
        const randomX4 = (Math.random() * 50 - 25).toFixed(0) + "px";
        const randomY4 = (-70 - Math.random() * 20).toFixed(0) + "px";

        return (
          <span
            key={i}
            // className="spark sparkle-gold"
            className={`spark ${color}`}
            style={{
              "--x1": randomX1,
              "--y1": randomY1,
              "--x2": randomX2,
              "--y2": randomY2,
              "--x3": randomX3,
              "--y3": randomY3,
              "--x4": randomX4,
              "--y4": randomY4,
              animationDelay: `${i * 0.03}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default StarSparkle;
