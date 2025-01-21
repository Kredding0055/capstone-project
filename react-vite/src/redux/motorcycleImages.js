const GET_MOTORCYCLE_IMAGES = 'motorcycleImage/getMotorcycleImages';
const ADD_MOTORCYCLE_IMAGE = 'motorcycleImage/addMotorcyleImage';
const DELETE_MOTORCYCLE_IMAGE = 'motorcycleImage/deleteMotorcycleImage';

const getMotorcycleImages = (id, motorcycleImages) => {
  return {
    type: GET_MOTORCYCLE_IMAGES,
    id,
    motorcycleImages
  }
}

// const addMotorcyleImage = (motorcycleImage) => {
//   return {
//     type: ADD_MOTORCYCLE_IMAGE,
//     motorcycleImage
//   }
// }

const addMotorcyleImage = (payload) => {
  return {
    type: ADD_MOTORCYCLE_IMAGE,
    motorcycle_id: payload.motorcycle_id,
    image: payload.image,
  };
};

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
    dispatch(getMotorcycleImages(id, data))
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
    const data = await response.json()
    dispatch(addMotorcyleImage({motorcycle_id: id, image: data}))
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
    case GET_MOTORCYCLE_IMAGES: {
      return { ...state, [action.id]: action.motorcycleImages };
    }
    case ADD_MOTORCYCLE_IMAGE:
      return { ...state, [action.motorcycle_id]: [...(state[action.motorcycle_id] || []), action.image] };
    case DELETE_MOTORCYCLE_IMAGE:
      return { ...state, [action.motorcycle_id]: state[action.motorcycle_id].filter(image => image.id !== action.id) };
    default:
      return state
  }
}

export default motorcycleImageReducer;