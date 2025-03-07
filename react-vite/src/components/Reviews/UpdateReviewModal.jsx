import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loadReviewsThunk, updateReviewThunk } from "../../redux/review";
import { useModal } from "../../context/Modal";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import './UpdateReviewModal.css';


function UpdateReviewModal({ review, id }) {
  const dispatch = useDispatch();
  const [currReview, setCurrReview] = useState(review.review_text);
  const [starRating, setStarRating] = useState(review.stars);
  const [hover, setHover] = useState(0)
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { closeModal } = useModal();
  
  const starFilled = (num) => {
    setStarRating(num);
  }

  const handleHover = (num) => {
    setHover(num);
  }

  useEffect(() => {
    if(starRating > 0 && currReview.length >= 10) {
        setSubmitDisabled(false)
    }
    else {
      setSubmitDisabled(true)
    }
  }, [starRating, currReview])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const reviewPayload = {
      review_text: currReview,
      stars: starRating, 
    }
      await dispatch(updateReviewThunk(review.id, reviewPayload));
      dispatch(loadReviewsThunk(id))
      closeModal()
  } 

return (
    <div className='review-modal-container'>
      <h2>Tell everyone what you think about the product?</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className='review-input'
            type='text'
            placeholder='Leave your review here...'
            value={currReview}
            onChange={(e) => setCurrReview(e.target.value)}
            required
          />
          <br/>
          <div className='star-rating-container'>
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index}>
                {(starRating >= index || hover >= index) ? (
                  <ImStarFull 
                    className='star-rating' 
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={() => handleHover(0)}
                    onClick={() => starFilled(index)}
                  />
                ) : (
                  <ImStarEmpty 
                    className='star-rating' 
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={() => handleHover(0)}
                    onClick={() => starFilled(index)}
                  />
                )}
              </div>
            ))}
            <h3>Stars</h3>       
          </div>
          <button
            className={submitDisabled ? 'Review-submit-button' : 'Review-submit-button-enabled  '}
            disabled={submitDisabled}
            type='submit'
          >Submit Your Review</button>
        </form>
    </div>
  )
}

export default UpdateReviewModal;