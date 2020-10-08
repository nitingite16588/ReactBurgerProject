import React, { Component } from 'react';
import AUX from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {

    componentWillUpdate(){

        console.log("componentWillUpdate")
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(item => {
            return (
                <li key={item}> <span> {item}</span> :{this. props.ingredients[item]}  </li>
            )
        })
        return (
            <AUX>
                <h3>Your Order</h3>
                <p> A delicious Burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>

                <p>Total Price: {this.props.price.toFixed(2)}</p>

                <p> Continue to Checkout?</p>
                <Button clicked={this.props.cancel} btnType="Danger">CANCEL </Button>
                <Button clicked={this.props.continue} btnType="Success">CONTINUE </Button>

            </AUX>


        )
    }


}


export default OrderSummary;