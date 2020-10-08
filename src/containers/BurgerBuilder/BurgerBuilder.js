import React, { Component } from 'react';
import AUX from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7

}

class BurgerBuilder extends Component {
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        tolalPrice:4,
        purchable:false,
        purchasing:false
    }
    addIngredientHandler=(type)=>{
        console.log("addIngredientHandler")
       const oldCount= this.state.ingredients[type];
       const updatedCount= oldCount + 1;
       const updatedIngredients={
           ...this.state.ingredients
       }
       updatedIngredients[type]=updatedCount;
       const priceAddition= INGREDIENT_PRICES[type];
       const oldPrice=this.state.tolalPrice;
       const newPrice=oldPrice+priceAddition;
       this.setState({
        tolalPrice:newPrice ,ingredients:updatedIngredients
       })
       this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler=(type)=>{
        const oldCount= this.state.ingredients[type];
        if(oldCount<=0) return;
        const updatedCount= oldCount - 1;
        const updatedIngredients={
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount;
        const priceAddition= INGREDIENT_PRICES[type];
        const oldPrice=this.state.tolalPrice;
        const newPrice=oldPrice-priceAddition;
        this.setState({
         tolalPrice:newPrice ,ingredients:updatedIngredients
        })

        this.updatePurchaseState(updatedIngredients)
    
    }
    
    updatePurchaseState = (ingredients) => {
     
        const sum = Object.keys(ingredients).map(item => {
            return ingredients[item]

        }).reduce((sum, ele) => {
            return sum + ele
        })

        this.setState({
            purchable: sum > 0
        })
    }
    purchasing =()=>{
        this.setState({purchasing:true})
    }
    purchaseCancal=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinue=()=>{
       alert("You continue")
    }

    
    render() {
        const disabledInfo={
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <AUX>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancal}>
                    <OrderSummary ingredients={this.state.ingredients}
                    price={this.state.tolalPrice}
                    cancel={this.purchaseCancal}
                    continue={this.purchaseContinue}
                    
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientremoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.tolalPrice}
                    purchable={this.state.purchable}
                    ordered={this.purchasing}

                />
            </AUX>
        )
    }
}

export default BurgerBuilder; 