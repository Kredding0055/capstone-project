import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { loadAllMotorcycles } from '../../redux/motorcycle';
import { motorcycleAverageRating } from '../HomePage/HomePage';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteMotorcycleModal from './DeleteMotorcycleModal';
import './ManageMotorcycle.css';



function ManageMotorcycle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { motorcycles } = useSelector((state) => state.motorcycle)
  const user = useSelector((state) => state.session.user.id)
  console.log('motorcycles', motorcycles)
  console.log('user', user)

  const userMotorcycles = motorcycles?.filter((motorcycle) => motorcycle.owner_id === user)
  console.log('user motorcycles', userMotorcycles)

  const handleEdit = (id) => {
    navigate(`/editMotorcycle/${id}`)
  }

  useEffect(() => {
    dispatch(loadAllMotorcycles())
  }, [dispatch])

  return (
    <div>
      <div className='grid-container'>
        <div className="motorcycle-card-grid">
          {userMotorcycles?.map((motorcycle) => (
            console.log(motorcycle.id),
          <div key={motorcycle.id} className="motorcycle-card">
            <Link to={`/motorcycles/${motorcycle.id}`}>
              <div className="motorcycle-image">
                <img src={motorcycle.images[0].image_url} />
              </div>
            </Link>
            <div className='manage-details-footer'>
              <div className='homepage-motorcycle-details'>
                <div className='manage-details-left'>
                  <p>{motorcycle.year} {motorcycle.make} {motorcycle.model}</p>
                  <p>{motorcycle.city} {motorcycle.state}</p>
                </div>
                <div className='manage-details-right'>
                  {motorcycleAverageRating(motorcycle)}                
                  <p>${motorcycle.price} Per Day</p>
                </div>
              </div>
              <div className='manage-details-buttons'>
                <button onClick={() => handleEdit(motorcycle.id)}>Edit</button>
                <OpenModalButton 
                  motorcycle={motorcycle}
                  buttonText='Delete'
                  modalComponent={<DeleteMotorcycleModal />}
                />
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ManageMotorcycle;