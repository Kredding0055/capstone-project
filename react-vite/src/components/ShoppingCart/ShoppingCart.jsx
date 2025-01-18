import { loadCartThunk, updateCartThunk, deleteCartThunk } from '../../redux/shoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadMotorcycleImages } from '../../redux/motorcycleImages';
import './ShoppingCart.css';



function Shoppingcart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart)
  const motorcycle = useSelector((state) => state.shoppingCart.motorcycle)
  const motorcycleImage = useSelector((state) => state.motorcycleImage)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const startDateFormat = new Date(startDate);
  const endDateFormat = new Date(endDate);
  console.log('cart', cart)
  console.log('motorcycle', motorcycle)

  const rentalDays =  Math.round((endDateFormat - startDateFormat) / (1000 * 3600 * 24)) + 1;
  const subtotal = motorcycle?.price * rentalDays;
  const taxRate = 0.08;
  const salesTax = subtotal * taxRate;
  const total = subtotal + salesTax;

  useEffect(() => {
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);
  }, [startDate, endDate]);

  const updateCart = () => {
    const updatedCartData = {
      start_date: startDate,
      end_date: endDate
    };
    dispatch(updateCartThunk(updatedCartData, cart.id))
    setShowCalendar(false);
  }

  const deleteCart = () => {
    dispatch(deleteCartThunk())
  }

  const showAlert = () => {
    alert('Feature coming soon...')
  }

  const handleUpdateClick = () => {
    setShowCalendar(true);
  };

  const handleCalendarChange = (e) => {
    if (e.target.name === 'startDate') {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  useEffect(() => {
    if (cart) {
      setStartDate(cart.start_date);
      setEndDate(cart.end_date);
    }
  }, [cart]);

  useEffect(() => {
    dispatch(loadCartThunk())
  }, [dispatch])

  useEffect(() => {
      if (motorcycle) {
        dispatch(loadMotorcycleImages(motorcycle.id));
      }
    }, [dispatch, motorcycle])

  return (
    <div className="shopping-cart-container">
      <div className="cart-row">
      <div className='cart-image-container'>
        {motorcycle && (
          <Link to={`/motorcycles/${motorcycle.id}`}>
            {motorcycleImage[motorcycle.id] && (
              <img src={motorcycleImage[motorcycle.id][0].image_url} />
            )}
          </Link>
        )}
      </div>
      <div className='cart-checkout'>
        {motorcycle && ( 
        <>
        <h2>Checkout</h2>
          <p>Price per day $ {motorcycle.price}.00</p>
          <p>Rental dates: {startDate} - {endDate}</p>
          <p>Days for rental: {rentalDays}</p>
          <p>Subtotal: $ {subtotal}.00</p>
          <p>Sales tax: $ {salesTax.toFixed(2)}</p>
          <p>Total: $ {total.toFixed(2)}</p>
          <div className="buttons-wrapper">
          </div>
          {showCalendar ? (
              <div className="calendar-container">
                <div className="calendar-column">
                  <label>Start Date:</label>
                  <input type="date" value={startDate} onChange={handleCalendarChange} name="startDate" />
                  <br />
                  <label>End Date:</label>
                  <input type="date" value={endDate} onChange={handleCalendarChange} name="endDate" />
                  <button className="save-button" onClick={updateCart}>Save Changes</button>
                </div>
              </div>
            ) : (
              <div className="buttons-wrapper">
                <button onClick={showAlert}>Book Reservation</button>
                <button onClick={handleUpdateClick}>Update Dates</button>
                <button onClick={deleteCart}>Delete Cart</button>
              </div>
              )}
        </>
        )}
          </div>
      </div>
    </div>
  )
}

export default Shoppingcart;