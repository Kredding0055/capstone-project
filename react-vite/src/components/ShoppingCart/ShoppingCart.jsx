import { updateCartThunk, deleteCartThunk } from '../../redux/shoppingCart';
import './ShoppingCart.css';



function Shoppingcart() {


  return (
    <div className="shopping-cart-container">
      <div>
        <p>motorcycle.image</p>
      </div>
      <div>
        <p>motorcycle.year</p>
        <p>motorcycle.make</p>
        <p>motorcycle.model</p>
        <button>updateCartThunk</button>
        <button>deleteCartThunk</button>
      </div>
      <div>
        <p>Price per day</p>
        <p>Days for rental</p>
        <p>sales tax</p>
        <p>total</p>
        <button>Book Reservation</button>
      </div>
    </div>
  )
}

export default Shoppingcart;