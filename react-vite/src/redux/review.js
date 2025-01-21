const LOAD_REVIEWS = 'review/loadReviews';
const ADD_REVIEW = 'review/addReview';
const UPDATE_REVIEW = 'review/updateReview';
const DELETE_REVIEW = 'review/deleteReview';

const loadReviews = (reviews, id) => {
  return {
    type: LOAD_REVIEWS,
    id,
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
    const reviews = await response.json()
    dispatch(loadReviews(reviews, id))
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
    case LOAD_REVIEWS:
      return { ...state, reviews: { ...state.reviews, [action.id]: action.reviews } };
    case ADD_REVIEW:
      const motorcycleId = action.review.motorcycle_id;
      if (state.reviews[motorcycleId]) {
        return { ...state, reviews: { ...state.reviews, [motorcycleId]: [...state.reviews[motorcycleId], action.review] } };
      } else {
        return { ...state, reviews: { ...state.reviews, [motorcycleId]: [action.review] } };
      }
    case UPDATE_REVIEW: {
      if (state.reviews && state.reviews[action.review.productId]) {
        const updatedReviews = state.reviews[action.review.productId].map(review => review.id === action.review.id ? action.review : review);
        return { ...state, reviews: { ...state.reviews, [action.review.productId]: updatedReviews } };
      }
      return state;
      }
    case DELETE_REVIEW:
  const reviews = { ...state.reviews };
  for (const motorcycleId in reviews) {
    const filteredReviews = reviews[motorcycleId].filter(review => review.id !== action.reviewId);
    if (reviews[motorcycleId].length !== filteredReviews.length) {
      reviews[motorcycleId] = filteredReviews;
      if (filteredReviews.length === 0) {
        delete reviews[motorcycleId];
      }
    }
    return { reviews };
  }
  return state;
      default:
        return state
  }
}

export default reviewsReducer;