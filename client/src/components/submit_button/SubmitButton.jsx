import React, { useRef, useEffect } from "react";
import "./submitButton.css";

const SubmitButton = ({ oncllickhandle, title }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    // Add event listener for keydown when the component mounts
    document.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, []);

  const handleEnterKeyPress = (event) => {
    // Trigger the button click when the "Enter" key is pressed
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  return (
    <div
      className="submit-button"
      ref={buttonRef}
      onClick={() => oncllickhandle()}
    >
      <span>{title}</span>
    </div>
  );
};

export default SubmitButton;
