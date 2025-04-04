import { useEffect, useRef } from "react";
import CircleType from "circletype/circletype.min.js";
import "./CurvedName.scss";

interface CurvedTextProps {
  text?: string;
  radius?: number;
}

const CurvedText = ({ text = "MARIBEL", radius = 300 }: CurvedTextProps) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      new CircleType(textRef.current).radius(radius);
    }
  }, [radius]);

  return (
    <span className="curved-text" ref={textRef}>
      {text}
    </span>
  );
};

export default CurvedText;
