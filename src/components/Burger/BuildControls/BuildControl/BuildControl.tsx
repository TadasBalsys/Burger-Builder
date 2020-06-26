import React from 'react';

import styles from './BuildControl.module.css';

interface BuildControlProps {
  label: string;
}

const buildControl: React.FC<BuildControlProps> = ({ label }) => {
  
  console.log(label);
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{label}</div>
      <button className={styles.Less}>Less</button>
      <button className={styles.More}>More</button>
    </div>
  );
};

export default buildControl;
