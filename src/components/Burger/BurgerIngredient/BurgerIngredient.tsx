import React from 'react';

import classes from './BurgerBuilder.module.css';

interface Props {
  type: string;
}

const burgerIngredient: React.FC<Props> = ({ type }) => {
  switch (type) {
    case 'bread-bottom':
      return <div className={classes.BreadBottom}> </div>;
    case 'bread-top':
      return (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
    case 'meat':
      return <div className={classes.Meat}></div>;
    case 'cheese':
      return <div className={classes.Cheese}></div>;
    case 'bacon':
      return <div className={classes.Bacon}></div>;
    case 'salad':
      return <div className={classes.Salad}></div>;
    default:
      return null;
  }
};

export default burgerIngredient;
