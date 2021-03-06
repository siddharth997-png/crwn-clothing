export const addItemToCart = (cartItems, itemToAdd) => {
    const ifItemExists = cartItems.find(cartItem => 
        cartItem.id === itemToAdd.id
    );

    if(ifItemExists) {
        return cartItems.map(cartItem => 
            cartItem.id === itemToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1} 
            : cartItem
        )
    }

    return [...cartItems, {...itemToAdd, quantity: 1}];
}

export const removeItemfromCart = (cartItems, itemToRemove) => {
    return cartItems.filter(item => item.id !== itemToRemove.id);
}

export const decreaseItemQty = (cartItems, itemToDec) => {
    if(itemToDec.quantity === 1) {
        return removeItemfromCart(cartItems, itemToDec);
    }

    return cartItems.map(item => (
        (item.id === itemToDec.id) ? 
        {...item, quantity : item.quantity-1} 
        : item
    ))
}