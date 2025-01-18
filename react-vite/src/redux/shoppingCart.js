const LOAD_CART = 'shoppingCart/loadCart';
const ADD_TO_CART = 'shoppingCart/addToCart';
const UPDATE_CART = 'shoppingCart/updateCart';
const DELETE_CART = 'shoppingCart/deleteCart';

const loadCart = (cart) => {
  return {
    type: LOAD_CART,
    cart
  }
}

const addToCart = (cartItem) => {
  return {
    type: ADD_TO_CART,
    payload: cartItem
  }
}

const updateCart = (cartItem) => {
  return {
    type: UPDATE_CART,
    payload: cartItem
  }
}

const deleteCart = () => {
  return {
    type: DELETE_CART
  }
}

export const loadCartThunk = () => async (dispatch) => {
  const response = await fetch(`/api/cart`);

  if(response.ok) {
    const data = await response.json()
    dispatch(loadCart(data))
    return data
  }
}

export const addToCartThunk = (payload) => async (dispatch) => {
  console.log('payload', payload)
  const response = await fetch(`/api/cart`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
  if(response.ok) {
    const data = await response.json()
    dispatch(addToCart(data))
    return data
  }
}

export const updateCartThunk = (payload, id) => async (dispatch) => {
  const response = await fetch(`/api/cart/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
  if(response.ok) {
    const data = await response.json()
    dispatch(updateCart(data))
    return data
  }
}

export const deleteCartThunk = () => async (dispatch) => {
  const response = await fetch(`/api/cart`, {
    method: 'DELETE'
  })
  if(response.ok) {
    dispatch(deleteCart())
  }
}


const initialState = {}

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
      return { ...action.cart[0] };
    case ADD_TO_CART:
      return {  ...action.payload };
    case UPDATE_CART:
      return { ...action.payload };
    case DELETE_CART:
      return { };
    default:
      return state;
  }
};

export default shoppingCartReducer;