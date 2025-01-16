const LOAD_MOTORCYCLES = 'motorcycle/loadMotorcycles';
const MOTORCYCLE_DETAILS = 'motorcycle/motorcycleDetails';
const ADD_MOTORCYCLE = 'motorcycle/addMotorcycle';
const UPDATE_MOTORCYCLE = 'motorcycle/updateMotorcycle';
const DELETE_MOTORCYCLE = 'motorcycle/deleteMotorcycle';

const loadMotorcycles = (motorcycles) => {
  return {
    type: LOAD_MOTORCYCLES,
    motorcycles
  }
}

const motorcycleDetails = (motorcycle) => {
  return {
    type: MOTORCYCLE_DETAILS,
    motorcycle
  }
}

const addMotorcycle = (motorcycle) => {
  return {
    type: ADD_MOTORCYCLE,
    motorcycle
  }
}

const updateMotorcycle = (motorcycle) => {
  return {
    type: UPDATE_MOTORCYCLE,
    motorcycle
  }
}

const deleteMotorcycle = (id) => {
  return {
    type: DELETE_MOTORCYCLE,
    id
  }
}

export const loadAllMotorcycles = () => async (dispatch) => {
  const response = await fetch(`/api/motorcycles`);

  if(response.ok) {
    const data = await response.json()
    dispatch(loadMotorcycles(data))
    return data
  }
}

export const motorcycleDetailsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/motorcycles/${id}`)

  if(response.ok) {
    const details = await response.json()
    dispatch(motorcycleDetails(details))
    return details
  }
}

export const createMotorcycleThunk = (payload) => async (dispatch) => {
  const response = await fetch(`/api/motorcycles`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
  if(response.ok) {
    const data = await response.json()
    dispatch(addMotorcycle(data))
    return data
  }
}

export const updateMotorcycleThunk = (id, payload) => async (dispatch) => {
  const response = await fetch(`/api/motorcycles/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
  if(response.ok){
    const details = await response.json()
    dispatch(updateMotorcycle(details))
    return details
  }
}

export const deleteMotorcycleThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/motorcycles/${id}`, {
    method: 'DELETE'
  })
  if(response.ok) {
    dispatch(deleteMotorcycle(id))
  }
}

const initialState = {};

const motorcycleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MOTORCYCLES: {
      return { ...state, motorcycles: action.motorcycles}
    }
    case MOTORCYCLE_DETAILS: {
      const newState = { ...state }
      newState[action.motorcycle.id] = action.motorcycle
      return newState
    }
    case ADD_MOTORCYCLE: {
      const newState = { ...state, [action.motorcycle.id]: action.motorcycle };
      return newState;
    }
    case UPDATE_MOTORCYCLE: {
      const newState = { ...state };
      newState[action.motorcycle.id] = action.motorcycle
    }
    case DELETE_MOTORCYCLE: {
      const newState = { ...state }
      delete newState[action.id]
      return newState
    }
    default:
      return state
  }
}

export default motorcycleReducer;