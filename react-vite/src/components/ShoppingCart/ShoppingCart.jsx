import { loadCartThunk, updateCartThunk, deleteCartThunk } from '../../redux/shoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import './ShoppingCart.css';



function Shoppingcart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart)
  const motorcycle = useSelector((state) => state.shoppingCart.motorcycle)
  console.log('cart', cart)
  console.log('motorcycle', motorcycle)


  const deleteCart = () => {
    dispatch(deleteCartThunk())
  }

  const showAlert = () => {
    alert('Feature coming soon...')
  }

  useEffect(() => {
    dispatch(loadCartThunk())
  }, [dispatch])

  return (
    <div className="shopping-cart-container">
      <div className="cart-row">
      <div className='cart-image-container'>
        {motorcycle && (
        <>
          <p><img src={motorcycle.images[0].image_url} alt="Motorcycle Image"/></p>
        </>
        )}
      </div>
      <div className='cart-details'>
        {motorcycle && (
        <>
          <p>{motorcycle.year}</p>
          <p>{motorcycle.make}</p>
          <p>{motorcycle.model}</p>
          <button>updateCartThunk</button>
          <button onClick={deleteCart}>deleteCartThunk</button>
        </>
        )}
      </div>
      <div className='cart-checkout'>
        <p>Price per day</p>
        <p>Days for rental</p>
        <p>sales tax</p>
        <p>total</p>
        <button onClick={showAlert}>Book Reservation</button>
      </div>
    </div>
    </div>
  )
}

export default Shoppingcart;