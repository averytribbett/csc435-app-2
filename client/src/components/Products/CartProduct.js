import React, { useState } from "react";
import "./../../styles/cart.css";

export const CartProduct = ({ id, name, image, price, quantity }) => {
  const [qty, setQty] = useState(quantity);
  const [totalPrice, setTotalPrice] = useState(price);

  const incrementQuantity = () => {
    setQty(qty + 1);
    setTotalPrice((qty + 1) * price);
    // @TODO Link to DB so we can track remaining qty
  };

  const decrementQuantity = () => {
    // Min 1 for now.
    if (qty > 1) {
      setQty(qty - 1);
      setTotalPrice((qty - 1) * price);
    }
  };

  // @TODO add additional remove from cart Button

  return (
    <div className="cart-product-container" id={`cart-product-${id}`}>
      <div className="img-container">
        <img src={image} alt={name} className="product-img" />
      </div>
      <div className="details-container">
        <div className="product-name">{name}</div>
        <div className="product-price">${parseFloat(totalPrice).toFixed(2)}</div>
        <div className="quantity-container">
          <input type="button" value="-" onClick={decrementQuantity} className="btn-quantity sub-qty"/>
          <span className="quantity-value">{qty}</span>
          <input type="button" value="+" onClick={incrementQuantity} className="btn-quantity add-qty"/>
        </div>
      </div>
    </div>
  );
};
