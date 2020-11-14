import React, { Component } from 'react';
import AUX from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7

}

class BurgerBuilder extends Component {
    
    state={
      
        purchasing:false,
      
    }
    componentDidMount () {
            this.props.onInitIngredients() //will fetch ingredeints  from redux ajax call
     
    }
 
    
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(item => {
            return ingredients[item]

        }).reduce((sum, ele) => {
            return sum + ele
        })
         return sum > 0
    }

    purchasing = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth')
        }
    }
    purchaseCancal=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinue=()=>{
        this.props.onInitPurchase();
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
                {/* {this.state.loading && <Spinner/>} */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancal}>
                    {/* {orderSummary} */}
                    {this.props.ings && <OrderSummary ingredients={this.props.ings}
                        price={this.props.price}
                        cancel={this.purchaseCancal}
                        continue={this.purchaseContinue}

                    />}
                </Modal>
                { (this.props.ings && !this.props.error) && 
                <div>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientremoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchasing}
                    isAuth={this.props.isAuthenticated}


                /> 
                 </div>
                 }
                 {this.props.error && <p>Ingredients can't be loaded!</p>}
            </AUX>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null

    }
}


const mapDispatchToProps=(dispatch)=>{
return{
    onIngredientAdded:(ingName)=>dispatch( actions.addIngredient(ingName)),
    onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
    onInitIngredients:()=>dispatch(actions.initIngredients()),
    onInitPurchase: ()=>dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))

}
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler (BurgerBuilder,axios)); 