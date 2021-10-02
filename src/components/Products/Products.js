import React, { Component } from 'react'
import ProductsDisplay from './ProductsDisplay'
import SelectedProducts from './SelectedProducts'
import Calculation from './Calculation'

class Products extends Component{
    constructor() {
        super() 
        this.state = {
            products: [
                {id: 'serram8', name: '8GB RAM SERVER', price: 100 },
                {id: 'serram16', name: '16GB RAM SERVER', price: 1025.50 },
                {id: 'serram32', name: '32GB RAM SERVER', price: 2549.99},               
            ],
            selectedProducts: [],
            itemsPrice: 0,
            availablePromocode:['PLSD123','PLSD456'],
            promocode: '',
            promoApplied: false
        }
    }
    
    handleSelect = (product) =>{ 
        let alreadyselected = false

        for(const ele of this.state.selectedProducts){
            if(ele.name == product.name){
                alreadyselected = true
            }
        }

        if(alreadyselected==false){
            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1                
            }
            this.setState(function (prevState){
                return{
                selectedProducts: prevState.selectedProducts.concat(newProduct), 
                itemsPrice : prevState.itemsPrice + product.price
                }
            }) 
        }             
    }
    
    handleAdd = (prod)=>{        
        this.setState(function(prevState){
            return{
                selectedProducts :prevState.selectedProducts.map(function(product){
                    if(product.id ==prod.id) {
                        return Object.assign({}, product, {quantity: product.quantity+1})
                    } else {
                        return Object.assign({}, product)
                    }
                })                
            }
        })   
        
        this.setState(function(prevState){
            let currentProductPrice
            for(const product of prevState.selectedProducts){
                if(product.id==prod.id){
                    currentProductPrice=product.price
                }
            }
            return {
                itemsPrice : prevState.itemsPrice + (currentProductPrice)
            }
        })    
    }


    handleSub = (prod)=>{
        this.setState(function(prevState){            
            return{
                selectedProducts :prevState.selectedProducts.map(function(product){
                    if(product.id ==prod.id) {
                        return Object.assign({}, product, {quantity: product.quantity-1})
                    } else {
                        return Object.assign({}, product)
                    }
                })                
            }
        }) 
        
        if(prod.quantity==1){
            this.setState(function(prevState){
                return {
                    selectedProducts: prevState.selectedProducts.filter(product=>product.id !=prod.id),
                    itemsPrice : prevState.itemsPrice - prod.price
                }
            })
        }else{        
            this.setState(function(prevState){
                let currentProductPrice
                for(const product of prevState.selectedProducts){
                    if(product.id==prod.id){
                        currentProductPrice=product.price
                    }
                }
                return{
                    itemsPrice : prevState.itemsPrice - (currentProductPrice)
                }
            }) 
        }         
    }

    handlePromo = (e)=>{
        this.setState({
           promocode : e.target.value
       })
    }
    
    handleAppliedPromo = ()=>{
        if(this.state.promoApplied==false){
            let promoExist = false
            for(const promo of this.state.availablePromocode ){        
                if(this.state.promocode == promo){
                    promoExist=true
                }
            }

            if(promoExist == true){
                    if(this.state.promocode == 'PLSD123'){
                        if(this.state.itemsPrice > 5000){
                            this.setState(function(prevState){                            
                                return {
                                    itemsPrice : prevState.itemsPrice * 0.9, 
                                    promoApplied : true                             
                                }
                            })                           
                        } else{
                            alert('order above $5000 to get 10% discount')                        
                        }
                    } 
                    
                    else if (this.state.promocode == 'PLSD456'){
                        if(this.state.itemsPrice > 10000){
                            this.setState(function(prevState){                            
                                return {
                                    itemsPrice : prevState.itemsPrice * 0.85,
                                    promoApplied : true  
                                }
                            })                            
                        } else{
                            alert('order above $10000 to get 15% discount')                        
                        }
                    } 
            } else {
                alert('promocode doesnt exist')
            } 
        }           
    }

    handleClearPromo = () => {
        this.setState(                       
             {
                promoApplied : false,
                promocode: ''               
            }) 
            
        if(this.state.promocode == 'PLSD123'){
            this.setState(function(prevState){                            
                return {
                    itemsPrice : prevState.itemsPrice/0.9                          
                }
            })  
        } else if (this.state.promocode == 'PLSD456'){  
            this.setState(function(prevState){                            
                return {
                    itemsPrice : prevState.itemsPrice/0.85                          
                }
            })  
        }    
    }

    handleClear = () => {
        this.setState(                       
             {
                selectedProducts: [],
                promocode: '',
                itemsPrice: 0,
                promoApplied: false
            })             
    }
    

    render() {
        return (
            <div className="display">
               <ProductsDisplay products={this.state.products} handleSelect={this.handleSelect} />
               {
                (((this.state.selectedProducts.length > 0) && (this.state.promoApplied==false)) &&
                  <SelectedProducts selectedProducts={this.state.selectedProducts} handleAdd={this.handleAdd}/>
                ) 
               }                
                <Calculation promocode={this.state.promocode} handlePromo={this.handlePromo} handleAppliedPromo={this.handleAppliedPromo} handleClearPromo={this.handleClearPromo} itemsPrice={this.state.itemsPrice}/>
                <button onClick={this.handleClear}>Clear Cart</button>
            </div>
        )
    }
}

export default Products
