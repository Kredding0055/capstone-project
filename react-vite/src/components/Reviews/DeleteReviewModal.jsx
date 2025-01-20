import { useDispatch } from 'react-redux'
import { deleteReviewThunk, loadReviewsThunk } from '../../redux/review';
import { useModal } from '../../context/Modal';


function DeleteReviewModal({ review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async () => {
    await dispatch(deleteReviewThunk(review.id))
    .then(() => {
      dispatch(loadReviewsThunk(review.motorcycle_id));
      closeModal();
    })
  }

  return (
    <div className='delete-modal-container'>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <button className='Delete-yes-button Modal-delete-button' 
      onClick={() => handleSubmit(review.id)}>Yes (Delete Review)
      </button>
      <button className='Delete-no-button Modal-delete-button' 
      onClick={closeModal}>No (Keep Review)
      </button>
    </div>
  )

}

export default DeleteReviewModal;