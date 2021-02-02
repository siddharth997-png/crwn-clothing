import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({ price }) => {
  const priceInCents = price * 100;
  const publishableKey = 'pk_test_51IDlUtEkKhxiWmQj7XKOUCavSG4Rn6CIphdIfuQL9CeZdRnOaVqcz3VsuKJJ5zjoihPzvZeOepp8wWpgGM7sJecf003ulrJvY8';

  const onToken = (token) => {
    console.log(token)
    alert('Payment Successful')
  }
 
  return (
    <StripeCheckout 
      label='Pay Now'
      name='CRWN Clothing'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceInCents}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )

}

export default StripeCheckoutButton;