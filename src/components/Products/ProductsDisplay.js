import React from 'react'

function ProductsDisplay(props) {
    return (
        <div className="products">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price in $ (per month)</th>
                            <th>Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.products.map(ele=>{
                                return (
                                    <tr key={ele.id}>
                                        <td> {ele.id} </td>
                                        <td> {ele.name} </td>
                                        <td> {ele.price} </td>
                                        <td> {<button onClick={() => {
                                            props.handleSelect(ele)
                                            }}> Select </button>} </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> 
        </div>
    )
}

export default ProductsDisplay
