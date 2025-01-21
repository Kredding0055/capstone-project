import { useDispatch } from "react-redux";
import { thunkDeleteUser, thunkLogout } from "../../redux/session";
import { useModal } from "../../context/Modal";
import './DeleteUserModal.css';


function DeleteUserModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deleteUser = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteUser());
    dispatch(thunkLogout())
    closeModal();
  }

  return (
    <div className='delete-modal-container'>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete your account?</p>
      <button className='delete-yes-button' onClick={deleteUser}>Yes (Delete Account)</button>
      <button className='delete-no-button' onClick={closeModal}>No (Keep Account)</button>
    </div>
  )
}

export default DeleteUserModal;