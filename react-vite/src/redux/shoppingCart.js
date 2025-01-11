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

const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload
  }
}

const updateCart = (payload) => {
  return {
    type: UPDATE_CART,
    payload
  }
}

const deleteCart = (id) => {
  return {
    type: DELETE_CART,
    id
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

export const addToCartThunk = () => async (dispatch) => {
  const response = await fetch(`/api/cart`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify()
  })
  if(response.ok) {
    const data = await response.json()
    dispatch(addToCart(data))
    return data
  }
}

export const updateCartThunk = (id, payload) => async (dispatch) => {
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

export const deleteCartThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/cart/${id}`, {
    method: 'DELETE'
  })
  if(response.ok) {
    dispatch(deleteCart(id))
  }
}


const initialState = {}

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default shoppingCartReducer;