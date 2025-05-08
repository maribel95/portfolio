import { useMemo } from "react";
import "@styles/Background.scss";

const smallTriangleStyles = [
  "small-top-left",
  "small-top-right",
  "small-frame",
  "small-diagonal-split", // nueva
];

const largeTriangleStyles = [
  "large-bottom-left",
  "large-diagonal",
  "large-bottom-right",
  "large-rotated-left", // nueva
  "large-layered-right", // nueva
];

const Background = () => {
  const small = useMemo(() => {
    const i = Math.floor(Math.random() * smallTriangleStyles.length);
    return smallTriangleStyles[i];
  }, []);

  const large = useMemo(() => {
    const i = Math.floor(Math.random() * largeTriangleStyles.length);
    return largeTriangleStyles[i];
  }, []);

  return (
    <div className={`triangle-decorations ${small} ${large}`}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`triangle triangle-${i + 1}`} />
      ))}
    </div>
  );
};

export default Background;
