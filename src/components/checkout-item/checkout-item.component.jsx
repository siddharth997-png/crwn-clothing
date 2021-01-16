import React from 'react';

import { connect } from 'react-redux';

import { removeItem, decreaseItemQty, addItem } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem, removeItem, decreaseItemQty, addItem}) => {
  const {name, imageUrl, price, quantity} = cartItem;
  return(
  <div className='checkout-item'>
    <div className='image-container'>
      <img alt='item' src={imageUrl} />
    </div>
    <span className='name'>{name}</span>
    <span className='quantity'>
      <div className='arrow' onClick={ 
        () => decreaseItemQty(cartItem)
      }>&#10094;</div>
      <span className='value'>{quantity}</span>
      <div className='arrow' onClick={ 
        () => addItem(cartItem)
      }>&#10095;</div>
    </span>
    <span className='price'>${price}</span>
    <span className='remove-button' onClick={
      () => removeItem(cartItem)
    }>&#10008;</span>
  </div>
)}

const mapDispatchToProps = dispatch => ({
  removeItem : item => dispatch(removeItem(item)),
  decreaseItemQty : item => dispatch(decreaseItemQty(item)), 
  addItem : item => dispatch(addItem(item))
})

export default connect(null,mapDispatchToProps)(CheckoutItem);