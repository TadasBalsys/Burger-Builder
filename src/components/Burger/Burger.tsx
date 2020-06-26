import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import styles from './Burger.module.css';

interface BurgerProps {
  ingredients: Ingredients;
}

export interface Ingredients {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
}

const burger: React.FC<BurgerProps> = ({ ingredients }): JSX.Element => {
  const ingredientsNames: string[] = Object.keys(ingredients);
  /*
  Maps thru ingredientsNames array, and gets value from ingredients obj by mapped value (ingredient: string),
  use that value to create new Array (Array(ingredients[ingredient as keyof Ingredients]))
  and than maps that new Array and for each array element returns BurgerIngredient JSX.Element;
  */
  const ingredientElements: JSX.Element[][] = ingredientsNames.map(
    (ingredient: string) => {
      return [...Array(ingredients[ingredient as keyof Ingredients])].map(
        (_, i) => {
          return <BurgerIngredient key={ingredient + i} type={ingredient} />;
        }
      );
    }
  );

  const ingElemLength: number = ingredientElements.flat().length;
  const isBurgerNotEmpty: Boolean = Boolean(ingElemLength);

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type='bread-top' />
      {isBurgerNotEmpty ? ingredientElements : <h6>Please added ingredient</h6>}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;
