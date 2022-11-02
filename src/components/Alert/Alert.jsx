import React from "react";
import { useState } from "react";
import style from "./Alert.module.css";
import css from "classnames";

export default function Alert({ type, message }) {
  const [isShow, setIsShow] = useState(true);

  const handleClose = (event) => {
    event.preventDefault();
    setIsShow(false);
  };

  return (
    <div className={css(style.alert, style[type], !isShow && style.hide)}>
      <span className={style.closebtn} onClick={handleClose}>
        &times;
      </span>
      {message}
    </div>
  );
}
