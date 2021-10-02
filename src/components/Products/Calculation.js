import React from 'react'

function Calculation(props) {
    return (
        <div>
        <h2>Promocode : <input 
            type="text"                                 
            value={props.promocode} 
            onChange={props.handlePromo}
            placeholder="ENTER PROMO CODE"                                                                                                                                                                                                 
            /> {<button onClick={props.handleAppliedPromo}> Apply </button>} {<button onClick={props.handleClearPromo}> Clear Promo </button>}</h2> 
        <h2>Total : ${props.itemsPrice}</h2>
       </div> 
    )
}

export default Calculation
