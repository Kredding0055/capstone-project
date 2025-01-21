import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { loadAllMotorcycles } from '../../redux/motorcycle';
import { loadMotorcycleImages } from '../../redux/motorcycleImages';
import { loadReviewsThunk } from '../../redux/review';
import { ImStarFull } from 'react-icons/im';
import './HomePage.css';

export const motorcycleAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return 'No reviews yet';
  }

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return 'No reviews yet';
  }

  const sumOfStars = reviews.reduce((sum, review) => sum + review.stars, 0);
  const averageRating = (sumOfStars / reviews.length).toFixed(1);

  return (
    <span style={{ fontSize: 18, color: 'white' }}>
      {averageRating} <ImStarFull />
    </span>
  );
};


function HomePage() {
  const dispatch = useDispatch();
  const { motorcycles } = useSelector((state) => state.motorcycle)
  const motorcycleImages = useSelector((state) => state.motorcycleImage)
  const reviews = useSelector((state) => state.review.reviews)

  useEffect(() => {
    dispatch(loadAllMotorcycles());
  }, [dispatch])

  useEffect(() => {
    if (motorcycles) {
      motorcycles.forEach((motorcycle) => {
        dispatch(loadMotorcycleImages(motorcycle.id));
        dispatch(loadReviewsThunk(motorcycle.id));
      });
    }
  }, [dispatch, motorcycles])
  
  
  return (
    <div>
      <div className='grid-container'>
        <div className="motorcycle-card-grid">
          {motorcycles?.map((motorcycle) => (
            <Link key={motorcycle.id} to={`motorcycles/${motorcycle.id}`} className="motorcycle-card">
              <div className="motorcycle-image">
                {motorcycleImages[motorcycle.id] && (
                  <img src={motorcycleImages[motorcycle.id][0].image_url} />
                )}
              </div>
              <div className='homepage-motorcycle-details'>
                <div className='details-left'>
                  <p>{motorcycle.year} {motorcycle.make} {motorcycle.model}</p>
                  <p>{motorcycle.city}, {motorcycle.state}</p>
                </div>
                <div className='details-right'>
                  {motorcycleAverageRating(reviews && reviews[motorcycle.id] ? reviews[motorcycle.id] : [])}         
                  <p>${motorcycle.price} Per Day</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage;