import React from 'react';

import styles from './BurgerBuilder.module.css';

interface BurgerProps {
  type: string;
}

const burgerIngredient: React.FC<BurgerProps> = (props) => {
  switch (props.type) {
    case 'bread-bottom':
      return <div className={styles.BreadBottom}> </div>;
    case 'bread-top':
      return (
        <div className={styles.BreadTop}>
          <div className={styles.Seeds1}></div>
          <div className={styles.Seeds2}></div>
        </div>
      );
    case 'meat':
      return <div className={styles.Meat}></div>;
    case 'cheese':
      return <div className={styles.Cheese}></div>;
    case 'bacon':
      return <div className={styles.Bacon}></div>;
    case 'salad':
      return <div className={styles.Salad}></div>;

    default:
      return null;
  }
};

export default burgerIngredient;
