import React, { FC } from 'react';
import styles from './TarnishedButton.module.scss';

interface TarnishedButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const TarnishedButton: FC<TarnishedButtonProps> = ({ children, onClick }) => (
  <button className={styles.TarnishedButton} onClick={onClick}>
    {children}
  </button>
);

export default TarnishedButton;
