import React, { useEffect, useRef } from "react";

interface OutSideAlterPRpos {
  children : React.ReactNode,
  className : string
}
export default function OutsideAlerter({ children,className } : OutSideAlterPRpos) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    // fonction qui gère le clic
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // alert("You clicked outside of me!");
      }
    }

    // écoute globale des clics
    document.addEventListener("mousedown", handleClickOutside);

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return <div className={className} ref={wrapperRef}>{children}</div>;
}
