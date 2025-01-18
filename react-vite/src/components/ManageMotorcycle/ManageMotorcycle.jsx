import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { loadAllMotorcycles } from '../../redux/motorcycle';
import { loadMotorcycleImages } from '../../redux/motorcycleImages';
import { loadReviewsThunk } from '../../redux/review';
import { motorcycleAverageRating } from '../HomePage/HomePage';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteMotorcycleModal from './DeleteMotorcycleModal';
import './ManageMotorcycle.css';

function ManageMotorcycle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { motorcycles } = useSelector((state) => state.motorcycle)
  const motorcycleImages = useSelector((state) => state.motorcycleImage);
  const reviews = useSelector((state) => state.review.reviews);
  const user = useSelector((state) => state.session.user.id)
  const userMotorcycles = motorcycles?.filter((motorcycle) => motorcycle.owner_id === user)
  console.log("motorcycleImages", motorcycleImages)
  console.log('reviews', reviews)

  const handleEdit = (id) => {
    navigate(`/editMotorcycle/${id}`)
  }

  useEffect(() => {
    dispatch(loadAllMotorcycles())
  }, [dispatch])


  useEffect(() => {
    if (userMotorcycles) {
      userMotorcycles.forEach((motorcycle) => {
        if (!motorcycleImages?.[motorcycle.id] || !reviews?.[motorcycle.id]) {
          dispatch(loadMotorcycleImages(motorcycle.id));
          dispatch(loadReviewsThunk(motorcycle.id))
        }
      });
    }
  }, [dispatch, userMotorcycles, motorcycleImages, reviews]);

  return (
    <div>
      <div className='grid-container'>
        <div className="motorcycle-card-grid">
          {userMotorcycles?.map((motorcycle) => (
          <div key={motorcycle.id} className="motorcycle-card">
            <Link to={`/motorcycles/${motorcycle.id}`}>
              <div className="motorcycle-image">
              {motorcycleImages[motorcycle.id] && motorcycleImages[motorcycle.id].length > 0 ? (
                <img src={motorcycleImages[motorcycle.id][0].image_url} />
              ) : (
                <p>No images available</p>
              )}
              </div>
            </Link>
            <div className='manage-details-footer'>
              <div className='homepage-motorcycle-details'>
                <div className='manage-details-left'>
                  <p>{motorcycle.year} {motorcycle.make} {motorcycle.model}</p>
                  <p>{motorcycle.city} {motorcycle.state}</p>
                </div>
                <div className='manage-details-right'>
                {motorcycleAverageRating(reviews && reviews[motorcycle.id] ? reviews[motorcycle.id] : [])} 
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