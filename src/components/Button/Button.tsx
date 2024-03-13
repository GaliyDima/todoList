import React from "react";
import "./Button.css";

interface IButton {
  onClick: () => void;
  title: string;
}

const Button: React.FC<IButton> = ({ onClick, title }) => {
  return <button onClick={onClick}>{title}</button>;
};

export default Button;
