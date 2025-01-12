import { useDispatch } from "react-redux";
import { thunkDeleteUser } from "../../redux/session";
import { useModal } from "../../context/Modal";


function DeleteUserModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deleteUser = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteUser());
    closeModal();
  }

  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete your account?</p>
      <button onClick={deleteUser}>Yes (Delete Account)</button>
      <button onClick={closeModal}>No (Keep Account)</button>
    </div>
  )
}

export default DeleteUserModal;