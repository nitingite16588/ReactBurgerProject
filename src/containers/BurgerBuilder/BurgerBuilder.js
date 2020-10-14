import React, { Component } from 'react';
import AUX from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7

}

class BurgerBuilder extends Component {
    
    state={
      
        purchasing:false,
        loading:false,   
        error: false
    }
    componentDidMount () {
       // this.setState({loading:true})
        // axios.get('/ingredients.json')
        //     .then( response => {
        //         this.setState( { ingredients: response.data ,loading:false} );
        //     } )
        //     .catch( error => {
        //      this.setState( { error: true ,loading:false} );
        //     } );
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
       const oldPrice=this.state.totalPrice;
       const newPrice=oldPrice+priceAddition;
       this.setState({
        totalPrice:newPrice ,ingredients:updatedIngredients
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
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceAddition;
        this.setState({
         totalPrice:newPrice ,ingredients:updatedIngredients
        })

        this.updatePurchaseState(updatedIngredients)
    
    }
    
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(item => {
            return ingredients[item]

        }).reduce((sum, ele) => {
            return sum + ele
        })
         return sum > 0
    }

    purchasing =()=>{
        this.setState({purchasing:true})
    }
    purchaseCancal=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinue=()=>{
        // this.setState({loading:true})
      
        // const queryParams = [];
        // for (let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice)
        // const queryString = queryParams.join('&');
        this.props.history.push('/checkout')
           
    } 

    
    render() {
        const disabledInfo={
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // let orderSummary=<OrderSummary ingredients={this.state.ingredients}
        // price={this.state.totalPrice}
        // cancel={this.purchaseCancal}
        // continue={this.purchaseContinue}
        
        // />
        // if(this.state.loading) {
        //     orderSummary=<Spinner/>
        // } 
        return (
            <AUX>
                {this.state.loading && <Spinner/>}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancal}>
                    {/* {orderSummary} */}
                    {this.props.ings && <OrderSummary ingredients={this.props.ings}
                        price={this.props.price}
                        cancel={this.purchaseCancal}
                        continue={this.purchaseContinue}

                    />}
                </Modal>
                { (this.props.ings && !this.state.error) && 
                <div>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientremoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchasing}

                /> 
                 </div>
                 }
                 {this.state.error && <p>Ingredients can't be loaded!</p>}
            </AUX>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        ings:state.ingredients,
        price:state.totalPrice
    }
}

const mapDispatchToProps=(dispatch)=>{
return{
    onIngredientAdded:(ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
    onIngredientRemoved:(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
}
  
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler (BurgerBuilder,axios)); 