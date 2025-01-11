const LOAD_REVIEWS = 'review/loadReviews';
const ADD_REVIEW = 'review/addReview';
const UPDATE_REVIEW = 'review/updateReview';
const DELETE_REVIEW = 'review/deleteReview';

const loadReviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    reviews
  }
}

const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review
  }
}

const updateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    review
  }
}

const deleteReview = (id) => {
  return {
    type: DELETE_REVIEW,
    id
  }
}


export const loadReviewsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/motorcycles/${id}/reviews`)

  if(response.ok) {
    const reviews = response.json()
    dispatch(loadReviews(reviews))
    return reviews
  }
}

export const createReview = (id, payload) => async (dispatch) => {
  const response = await fetch(`/api/motorcycles/${id}/reviews`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
  if(response.ok) {
    const review = await response.json()
    dispatch(addReview(review))
    return review
  }
}

export const updateReviewThunk = (id, payload) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
  if(response.ok) {
    const review = await response.json()
    dispatch(updateReview(review))
    return review
  }
}

export const deleteReviewThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`, {
    method: 'DELETE'
  })
  if(response.ok) {
    dispatch(deleteReview(id))
  }
}


const initialState = {}

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reviewsReducer;