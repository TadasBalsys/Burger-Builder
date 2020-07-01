import React from 'react';

import classes from './BuildControl.module.css';

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
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button className={classes.Less} onClick={remove} disabled={disable}>
        Less
      </button>
      <button className={classes.More} onClick={add}>
        More
      </button>
    </div>
  );
};

export default buildControl;
