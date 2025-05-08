import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import "@styles/Background.scss";

type TriangleStyle = {
  name: string;
  position: "left" | "right" | "mixed";
};

const smallTriangleStyles: TriangleStyle[] = [
  { name: "small-top-left", position: "left" },
  { name: "small-top-right", position: "right" },
  { name: "small-frame", position: "mixed" },
  { name: "small-diagonal-split", position: "mixed" },
];

const largeTriangleStyles: TriangleStyle[] = [
  { name: "large-bottom-left", position: "left" },
  { name: "large-diagonal", position: "mixed" },
  { name: "large-bottom-right", position: "right" },
  { name: "large-rotated-left", position: "left" },
  { name: "large-layered-right", position: "right" },
  { name: "large-inward-corner", position: "left" },
];

const Background = () => {
  const location = useLocation();
  const route = location.pathname;

  const allowedPositions = useMemo(() => {
    if (route === "/projects") return ["right"];
    return ["left", "right", "mixed"];
  }, [route]);

  const filteredSmallStyles = useMemo(() => {
    return smallTriangleStyles.filter((style) =>
      allowedPositions.includes(style.position)
    );
  }, [allowedPositions]);

  const filteredLargeStyles = useMemo(() => {
    return largeTriangleStyles.filter((style) =>
      allowedPositions.includes(style.position)
    );
  }, [allowedPositions]);

  const small = useMemo(() => {
    const i = Math.floor(Math.random() * filteredSmallStyles.length);
    return filteredSmallStyles[i].name;
  }, [filteredSmallStyles]);

  const large = useMemo(() => {
    const i = Math.floor(Math.random() * filteredLargeStyles.length);
    return filteredLargeStyles[i].name;
  }, [filteredLargeStyles]);

  return (
    <div className={`triangle-decorations ${small} ${large}`}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`triangle triangle-${i + 1}`} />
      ))}
    </div>
  );
};

export default Background;
