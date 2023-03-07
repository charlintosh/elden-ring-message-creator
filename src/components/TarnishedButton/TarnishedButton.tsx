import React, { FC } from "react";
import styles from "./TarnishedButton.module.scss";

interface TarnishedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const TarnishedButton: FC<TarnishedButtonProps> = ({
  children,
  onClick,
  ...rest
}) => (
  <button className={styles.TarnishedButton} onClick={onClick} {...rest}>
    {children}
  </button>
);

export default TarnishedButton;
