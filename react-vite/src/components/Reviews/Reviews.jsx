import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateReviewModal from "./UpdateReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";


function Reviews({reviews}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);  

  return (
    <div>
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <p>{review.review_text}</p>
            <p>Rating: {review.stars}</p>
            <p>Posted by: {review.user.first_name}</p>
            {sessionUser && sessionUser.id === review.user.id ? (
              <>
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
              </>
            ) : (
              <></>
            )}
          </div>
        ))
      ) : (
        null
      )}
    </div>
  );
}

export default Reviews;