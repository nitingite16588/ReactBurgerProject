import React from 'react';
import './BuildControls.css';
import BuildContol from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]
const buildControls = (props) =>
    (
        <div className="BuildControls">
            <p>Current Price :{props.price.toFixed(2)} </p>
            {controls.map(item => (
                <BuildContol
                    added={props.ingredientAdded.bind(this,item.type)}
                    removed={props.ingredientremoved.bind(this,item.type)}
                    key={item.label}
                    label={item.label}
                    disabled={props.disabled[item.type]}
                    />
            )
            )}
            <button disabled={!props.purchable} onClick={props.ordered} className="OrderButton"> {props.isAuth ? 'ORDER NOW':'SIGN UP TO LOGIN' }  </button>

        </div>
    )

export default buildControls; 