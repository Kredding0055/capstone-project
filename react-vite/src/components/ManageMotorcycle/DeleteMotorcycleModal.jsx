import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal';
import { deleteMotorcycleThunk } from '../../redux/motorcycle';
import './DeleteMotorcycleModal.css';


function DeleteMotorcycleModal({ motorcycle }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (id) => {
    await dispatch(deleteMotorcycleThunk(id))
    .then(closeModal)
  }

return (
  <div className='delete-modal-container'>
    <h1>Confirm Delete</h1>
    <p>Are you sure you want to delete this Motorcycle?</p>
    <button className='delete-yes-button' onClick={() => handleSubmit(motorcycle.id)}>Yes (Delete Motorcycle)</button>
    <button className='delete-no-button' onClick={closeModal}>No (Keep Motorcycle)</button>
  </div>

)}

export default DeleteMotorcycleModal;