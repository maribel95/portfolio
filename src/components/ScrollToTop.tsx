import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // puedes quitarlo si prefieres instantáneo
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
