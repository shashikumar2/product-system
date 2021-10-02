import React from 'react'

function SelectedProducts(props) {
    return (
        <div className="selectedProducts">
                <table >
                    <thead>
                        <tr>
                            <th>Selected product</th>
                            <th>Price in $ (per month)</th>
                            <th>Quantity</th>                                   
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.selectedProducts.map(ele=>{
                                return (
                                    <tr key={ele.id}>                                        
                                        <td> {ele.name} </td>   
                                        <td> {ele.price} </td>                                     
                                        <td>{(ele.quantity>0) && (<button onClick={() => {this.handleSub(ele)}}> - </button>)} {<input type ='text'  value = {ele.quantity} />} {<button onClick={() => {props.handleAdd(ele)}}> + </button>}  </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>                
        </div>
    )
}

export default SelectedProducts
