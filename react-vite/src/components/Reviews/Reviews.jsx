import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateReviewModal from "../UpdateReviewModal/UpdateReviewModal";


function Reviews({reviews}) {
  const dispatch = useDispatch();

  const deleteReview = (reviewId) => {
    dispatch(deleteReviewThunk(reviewId))
  }

  return (
    <div>
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <p>{review.review_text}</p>
            <p>Rating: {review.stars}</p>
            <p>Posted by: {review.user.first_name}</p>
            {review && (
              <OpenModalButton
              buttonText='Update Review'
              modalComponent={<UpdateReviewModal review={review} />}
              />
            )}
            <button onClick={() => deleteReview(review.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}

export default Reviews;