const GET_FAVORITES = 'favorite/getFavorites';
const ADD_FAVORITE = 'favorite/addFavorite';
const DELETE_FAVORITE = 'favorite/deleteFavorite';

const getFavorites = (favorites) => {
  return {
    type: GET_FAVORITES,
    favorites
  }
}

const addFavorite = (favorite) => {
  return {
    type: ADD_FAVORITE,
    favorite
  }
}

const deleteFavorite = (id) => {
  return {
    type: DELETE_FAVORITE,
    id
  }
}


export const loadFavorites = () => async (dispatch) => {
  const response = await fetch(`/api/favorites`)

  if(response.ok) {
    const favorites = await response.json()
    dispatch(getFavorites(favorites))
    return favorites
  }
}

export const addFavoriteThunk = (motorcycleId) => async (dispatch) => {
  const response = await fetch(`/api/favorites`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ motorcycle_id: motorcycleId })
  })
  if(response.ok) {
    const favorite = await response.json()
    dispatch(addFavorite(favorite))
    return favorite
  }
}

export const deleteFavoriteThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/favorites/${id}`, {
    method: 'DELETE',
  })
  if(response.ok) {
    dispatch(deleteFavorite(id))
  }
}


const initialState = {}

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITES: {
      return { ...state, favorites: action.favorites}
    }
    case ADD_FAVORITE: {
      if (!state[action.favorite.id]) {
        return { ...state, [action.favorite.id]: action.favorite };
      }
      return state;
    }
    case DELETE_FAVORITE: {
      const newState = { ...state }
      delete newState[action.id]
      return newState
    }
    default:
      return state
  }
}

export default favoritesReducer;