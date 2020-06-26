import React from 'react';

import styles from './BuildControl.module.css';

interface BuildControlProps {
  label: string;
  disable: boolean;
  add: (e: React.MouseEvent) => void;
  remove: (e: React.MouseEvent) => void;
}

const buildControl: React.FC<BuildControlProps> = ({
  label,
  disable,
  add,
  remove,
}): JSX.Element => {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{label}</div>
      <button className={styles.Less} onClick={remove} disabled={disable}>
        Less
      </button>
      <button className={styles.More} onClick={add}>
        More
      </button>
    </div>
  );
};

export default buildControl;
