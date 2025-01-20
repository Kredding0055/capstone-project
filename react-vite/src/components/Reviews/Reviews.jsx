import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateReviewModal from "./UpdateReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";
import { loadReviewsThunk } from "../../redux/review";
import { ImStarFull } from "react-icons/im";
import './Reviews.css';


function Reviews({ id}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);  
  const reviews = useSelector((state) => state.review.reviews?.[id])

  useEffect(() =>{
    dispatch(loadReviewsThunk(id))
  }, [dispatch, id])

  return (
    <div className="reviews-container">
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review">
            <p>{review.review_text}</p>
            <p>Rating: {review.stars} <ImStarFull /></p>
            <p>Posted by: {review.user.first_name}</p>
            {sessionUser && sessionUser.id === review.user.id ? (
              <div className="review-buttons">
                {review && (
                  <OpenModalButton
                    buttonText='Update Review'
                    modalComponent={<UpdateReviewModal review={review} />}
                  />
                )}
                {review && (
                  <OpenModalButton
                    buttonText='Delete Review'
                    modalComponent={<DeleteReviewModal review={review} />}
                  />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );
}

export default Reviews;