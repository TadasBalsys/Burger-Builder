import React from 'react';

import styles from './BuildControl.module.css';

interface BuildControlProps {
  label: string;
  add: (e: React.MouseEvent) => void;
  remove: (e: React.MouseEvent) => void;
}

const buildControl: React.FC<BuildControlProps> = ({
  label,
  add,
  remove,
}): JSX.Element => {
  console.log(label);
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{label}</div>
      <button className={styles.Less} onClick={remove}>
        Less
      </button>
      <button className={styles.More} onClick={add}>
        More
      </button>
    </div>
  );
};

export default buildControl;
