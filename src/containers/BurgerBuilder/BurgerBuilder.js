import React, { Component } from 'react';
import AUX from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7

}

class BurgerBuilder extends Component {
    
    state={
        ingredients:null,
            
        totalPrice:4,
        purchable:false,
        purchasing:false,
        loading:false,   
        error: false
    }
    componentDidMount () {
        this.setState({loading:true})
        axios.get('/ingredients.json')
            .then( response => {
                this.setState( { ingredients: response.data ,loading:false} );
            } )
            .catch( error => {
             this.setState( { error: true ,loading:false} );
            } );
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
        this.setState({loading:true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Nitin Gite',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
      
        axios.post('/orders.json ',order).then(response=>{
            console.log(response );
            this.setState({loading:false,purchasing:false})
        }).catch(error=>{
            console.log(error)
            this.setState({loading:false,purchasing:false})
        })
    }

    
    render() {
        const disabledInfo={
            ...this.state.ingredients
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
                    {this.state.ingredients && <OrderSummary ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        cancel={this.purchaseCancal}
                        continue={this.purchaseContinue}

                    />}
                </Modal>
                { (this.state.ingredients && !this.state.error) && 
                <div>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientremoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchable={this.state.purchable}
                    ordered={this.purchasing}

                /> 
                 </div>
                 }
                 {this.state.error && <p>Ingredients can't be loaded!</p>}
            </AUX>
        )
    }
}

export default withErrorHandler (BurgerBuilder,axios); 