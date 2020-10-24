//feature-1
import React, { Component } from 'react';
import Filter from './components/Filter';
import products from './components/Products';
import Products from './components/Products';
import Cart from './components/Cart';
import data from './data.json';
import Fade from 'react-reveal/Fade';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      products : data.products,
      cartItems :[],
      size : "",
      sort : ""
    };
  }
  
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if(item._id === product._id)
      {
        item.count++;
        alreadyInCart = true;
      }
    });
    if(alreadyInCart === false ){
      cartItems.push({ ...product , count: 1 });
    }
    this.setState({cartItems});
    
  }
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState ( { 
      cartItems : cartItems.filter( (x) => (x._id) !== (product._id))
    });
    
  }
  clearCart = () => {
    this.setState({
      cartItems : []
    })
  }
  sortProducts = (event) => {
       const sortt = (event.target.value);
       this.setState((state)=>  ({
         sort : sortt,
         products : this.state.products.slice().sort((a,b) => (
            
         
          sortt === "highest"
           ? a.price < b.price
              ? 1 : -1
           : sortt === "lowest"
           ? a.price > b.price
              ? 1 : -1
           : a._id > b._id
              ? 1 : -1

         ))
       }) )
  }
  filterProducts = (event) => {
    console.log(event.target.value);
    if(event.target.value === "")
    {
      this.setState({size: event.target.value , products : data.products , sort : " "});
    }
    else{
      this.setState({
        size: event.target.value ,
        products : data.products.filter(
          (product) => (product.availableSizes.indexOf(event.target.value)>= 0 )
        ) ,
        sort : "" ,

            
      });
    }
    
  }
  render(){
    return (
      
      <div className="grid-container">
        <Fade left cascade>
        <header>
         <a href="/">React Shopping Cart</a> </header>
        </Fade>
        <main>
          <div className= "content">
            <div className="main" >
                <Filter count={this.state.products.length}
                        size={this.state.size}
                        sort={this.state.sort}
                        filterProducts={this.filterProducts}
                        sortProducts={this.sortProducts}
                ></Filter>
                <Products products={this.state.products} 
                          addToCart = {this.addToCart} ></Products>
            </div>
            <div className="sidebar" >
              <Cart cartItems = {this.state.cartItems}
                    removeFromCart={this.removeFromCart}
                    createOrder ={this.createOrder}
                    clearCart={this.clearCart} />
            </div>
          </div>
        </main>
        <footer>
    All rights reserved &#169; AKM
          
          
                 
               </footer>
      </div>
    );

  }
  
}

export default App;
