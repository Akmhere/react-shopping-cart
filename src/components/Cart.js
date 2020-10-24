import React, { Component } from 'react'
import formatCurrency from './util';
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
export default class Cart extends Component {
      constructor(props){
          super(props);
          this.state =
          {showCheckout : false,
            finalorder : null,
            name : "",
            address : "",
            email : "" };
      }

      handleInput = (event) =>{
          this.setState({
             [ event.target.name] : event.target.value 
          });
      }
      
      
      createOrder =(event) =>{
          event.preventDefault();
          const order = {
              name: this.state.name,
              email : this.state.email,
              address : this.state.address,
              cartItems : this.props.cartItems,
              total : this.props.cartItems.reduce((a,c) => a + c.price * c.count , 0),
          };
          this.openModal(order);
          
      } 
      openModal = (order) =>{
        this.setState({ finalorder : order });
      }
      closeModal = () =>{
        this.setState({ finalorder: null });
        this.props.clearCart();

      }
    render() {
        const {cartItems} = this.props;
        const temp = cartItems.length === 1 ? "item" : "items" ;
        return (
            <div>
                <div>
                {cartItems.length === 0 ? (<div className="cart cart-header" >Cart is empty</div>)
                :(<div className="cart cart-header" >You have {cartItems.length} {temp} in the cart</div>) }
                </div>
                <div>
                    <div className="cart">
                        <Fade left cascade>
                        <ul className="cart-items">
                            {
                                cartItems.map( item => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title}></img>
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className="right" >
                                                {formatCurrency(item.price)} x {item.count }{" "}
                                                <button className="button" onClick = {() =>this.props.removeFromCart(item) }>
                                                Remove
                                            </button>
                                            </div>
                                           
                                        </div>
                                    </li>
                                )

                                )
                            }
                        </ul>
                        </Fade>
                    </div>
                    {cartItems.length !== 0  && (
                         <div>
                            <div className="cart">
                              <div className="total" >
                                 <div>
                                    Total: {" "}
                                    {formatCurrency( cartItems.reduce((a,c) => a+ c.price*c.count ,0))}
                                 </div>
                                 <button onClick={()=> this.setState({showCheckout: true})} className="button primary">Proceed</button>
                              </div>
                            </div>
                             {this.state.showCheckout && (
                                 <Fade top cascade>
                                <div className= "cart">
                                    <form onSubmit={this.createOrder} >
                                        <ul className="form-container">
                                            <li>
                                                <label>Email</label>
                                                <input name="email" type="email" required onChange={this.handleInput}></input>
                                            </li>
                                            <li>
                                                <label>Name</label>
                                                <input name="name" type="text" required onChange={this.handleInput}></input>
                                            </li>
                                            <li>
                                                <label>Address</label>
                                                <input name="address" type="text" required onChange={this.handleInput}></input>
                                            </li>
                                            <li>
                                                <button className="button primary" type="submit" >Checkout</button>
                                            </li>
                                        </ul>
                                    </form>
                                    
                                </div>
                                </Fade>
                            
                                
                            )} 
                            {
                                this.state.finalorder && (
                                    <Modal isOpen={true}
                                           onRequestClose = {this.closeModal}>
                                        <Zoom>
                                        <button className="close-modal" onClick={this.closeModal} >x</button>
                                        <div className ="order-details"  >
                                            <h2 className = "success-message" > Your order has been placed</h2>
                                          <table>
                                              <tbody>
                                                  <tr>
                                                      <td>Name:</td>
                                                      <td>{this.state.finalorder.name}</td>
                                                  </tr>
                                                  <tr>
                                                      <td>Email:</td>
                                                      <td>{this.state.finalorder.email}</td>
                                                  </tr>
                                                  <tr>
                                                      <td>Address:</td>
                                                      <td>{this.state.finalorder.address}</td>
                                                  </tr>
                                                  <tr>
                                                      <td>cartItems:</td>
                                                      <td>{
                                                        this.state.finalorder.cartItems.map((x) =>(
                                                            
                                                              <div style={{padding:"3px"}}  >{x.count} {" x "} {x.title}</div>  
                                                            
                                                        )  )
                                                        }</td>
                                                  </tr>
                                                  <tr>
                                                    <td>Total:</td>
                                                    <td> {formatCurrency(this.state.finalorder.total)} </td>
                                                  </tr>
                                              </tbody>
                                          </table>


                                           
                                            <i className="fas fa-check-circle order-favicon"  style={{height: "40px",width: "40px",marginTop:"30px"}}  ></i>
                                            
                                        </div>
                                        </Zoom>
                                    </Modal>
                                )
                            }
                            
                        </div>
                    ) }
                    
                </div>
            </div>
            
        );
    }
}

/*
 <ul>
                                                <li>
                                                    <div>Name:</div>
                                                    <div> {this.state.finalorder.name} </div>
                                                </li>
                                                <li>
                                                    <div>Email:</div>
                                                    <div> {this.state.finalorder.email} </div>
                                                </li>
                                                <li>
                                                    <div>Address:</div>
                                                    <div> {this.state.finalorder.address} </div>
                                                </li>
                                                <li>
                                                    <div>cartItems:</div>
                                                    <div>{
                                                        this.state.finalorder.cartItems.map((x) =>(
                                                            
                                                              <p>{x.count} {" x "} {x.title}</p>  
                                                            
                                                        )  )
                                                        } </div>
                                                </li>
                                                <li>
                                                    <div>Total:</div>
                                                    <div> {formatCurrency(this.state.finalorder.total)} </div>
                                                </li>
                                                
                                            </ul> */