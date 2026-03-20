import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [stage, setStage] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    if (children !== displayChildren) {
      setStage("exit");
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setStage("enter");
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [children, displayChildren, location.pathname]);

  return (
    <div
      style={{
        opacity: stage === "enter" ? 1 : 0,
        transition: "opacity 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        minHeight: "100vh",
      }}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
