import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import styles from './Burger.module.css';

const burger = () => {
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type='bread-top' />
      <BurgerIngredient type='salad' />
      <BurgerIngredient type='cheese' />
      <BurgerIngredient type='meat' />
      <BurgerIngredient type='cheese' />
      <BurgerIngredient type='meat' />
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;
