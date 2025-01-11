const GET_MOTORCYCLE_IMAGES = 'motorcycleImage/getMotorcycleImages';
const ADD_MOTORCYCLE_IMAGE = 'motorcycleImage/addMotorcyleImage';
const DELETE_MOTORCYCLE_IMAGE = 'motorcycleImage/deleteMotorcycleImage';

const getMotorcycleImages = (motorcycleImages) => {
  return {
    type: GET_MOTORCYCLE_IMAGES,
    motorcycleImages
  }
}

const addMotorcyleImage = (motorcycleImage) => {
  return {
    type: ADD_MOTORCYCLE_IMAGE,
    motorcycleImage
  }
}

const deleteMotorcycleImage = (id) => {
  return {
    type: DELETE_MOTORCYCLE_IMAGE,
    id
  }
}

export const loadMotorcycleImages = (id) => async (dispatch) => {
  const response = await fetch(`/api/motorcycles/${id}/images`)

  if(response.ok) {
    const data = await response.json()
    dispatch(getMotorcycleImages(data))
    return data
  }
}

export const addMotorcyleImageThunk = (id, payload) => async (dispatch) => {
  const response = await fetch(`/api/motorcycles/${id}/images`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })

  if(response.ok) {
    const data = response.json()
    dispatch(addMotorcyleImage(data))
    return data
  }
}

export const deleteMotorcycleImageThunk = (motorcycle_id, image_id) => async (dispatch) => {
  const response = await fetch(`/api/motorcycles/${motorcycle_id}/images/${image_id}`, {
    method: 'DELETE'
  })
  if(response.ok) {
    dispatch(deleteMotorcycleImage(image_id))
  }
}

const initialState = {};

const motorcycleImageReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default motorcycleImageReducer;