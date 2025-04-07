// Bubble.tsx
import React from "react";
import { motion } from "framer-motion";

interface BubbleProps {
  style?: React.CSSProperties;
  delay?: number;
}

const Bubble: React.FC<BubbleProps> = ({ style, delay = 0 }) => {
  return (
    <motion.div
      className="bubble"
      animate={{ y: [0, -20, 0] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      style={{
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), rgba(255,255,255,0) 70%)",
        position: "absolute",
        ...style,
      }}
    />
  );
};

export default Bubble;
