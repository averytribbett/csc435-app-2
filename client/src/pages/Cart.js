import React, { Component } from "react";
import { NavBar } from "../components/Nav/NavBar";
import { CartProduct } from "../components/Products/CartProduct";

export class Cart extends Component {
  // @TODO prevent non logged in user from viewing this page
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }
  }

  componentDidMount() {
    // Extract url params
    const params = new URLSearchParams(window.location.search);
    const currentCart = this.state.cart;

    // If params are passed (add to cart btn clicked) add item to cart
    if (params.has("id")) {
      currentCart.push({
        "id": params.get("id"),
        "name": params.get("name"),
        "price": params.get("price"),
        "image": params.get("image"),
        "quantity": Number(params.get("quantity")),
      })
    }

    // Update state
    this.setState({cart: currentCart})

    // @TODO Link DB so we can have multiple cart items
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="cart-container">
          <h4>Your Cart</h4>
          {this.state.cart.length === 0 ? (
            <p>Empty Cart</p>
          ) : (
            this.state.cart.map((item) => (
              <CartProduct
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
              />
            )) 
          )}

          {this.state.cart.length !== 0 &&
            <input type="button" value="Checkout" className="btn-checkout"/>
          }
          
        </div>
      </div>
    )
  }
}