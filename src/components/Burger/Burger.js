import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients).map(item => {
    return [...Array(props.ingredients[item])].map((i) => {
      return <BurgerIngredient key={item + i} type={item} />
    })

  }).reduce((arr,el)=>{
    return arr.concat(el)
  },[]);

  if(transformedIngredients.length===0){
    transformedIngredients=<p>Please Start Adding Ingredients</p>  
  }

console.log(transformedIngredients);
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}


      <BurgerIngredient type="bread-bottom" />

    </div>
  )

}
export default burger;