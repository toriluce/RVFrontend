import React, { useState } from "react";

import "./Alert.css";

interface AlertProps {
  type: "success" | "error";
  message: string;
}

export default function Alert(props: AlertProps) {
  const [isShow, setIsShow] = useState(true);

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsShow(false);
  };

  return (
    <div className={`alert ${props.type} ${!isShow ? "hide" : ""}`}>
      {(props.type !== "error") ? <span className="close-button" onClick={handleClose}>
        &times;
      </span> : <span></span>}
      {props.message}
    </div>
  );
}
