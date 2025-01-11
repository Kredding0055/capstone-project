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

export const addFavoriteThunk = (payload) => async (dispatch) => {
  const response = await fetch(`/api/favorites`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
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
    default:
      return state
  }
}

export default favoritesReducer;