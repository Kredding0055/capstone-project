import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motorcycleDetailsThunk } from '../../redux/motorcycle';
import './MotorcycleDetails.css';

function MotorcycleDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const motorcycle = useSelector((state) => state.motorcycle[id])
  const reviews = useSelector((state) => state.motorcycle[id]?.reviews)
  console.log('motorcycle', motorcycle)
  console.log('reviews', reviews)

  useEffect(() => {
    dispatch(motorcycleDetailsThunk(id));
  }, [dispatch, id])

  return (
    <div>
      <h1>Inside Motorcycle Details Page</h1>
      <div>
        {motorcycle && (
          <div>
            <div className='motorcycle-images'>
              {motorcycle.images.length}
              <p>{motorcycle.description}</p>
            </div>
            <div className='review-section'>
              {` ${Number(reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(2)}`}
            </div>
            <div className='motorcycle-details'>
              <p>Year: {motorcycle.year}</p>
              <p>Make: {motorcycle.make}</p>
              <p>Model: {motorcycle.model}</p>
              <p>Color: {motorcycle.color}</p>
              <p>Miles: {motorcycle.miles}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

}

export default MotorcycleDetails;