import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motorcycleDetailsThunk } from '../../redux/motorcycle';
import { motorcycleAverageRating } from '../HomePage/HomePage';
import Reviews from '../Reviews/Reviews';
import flatpickr from 'flatpickr';
import './MotorcycleDetails.css';

function MotorcycleDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const motorcycle = useSelector((state) => state.motorcycle[id])
  const reviews = useSelector((state) => state.motorcycle[id]?.reviews)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log('motorcycle', motorcycle)
  console.log('reviews', reviews)

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const startDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  const endDate = `${tomorrow.getMonth() + 1}/${tomorrow.getDate()}/${tomorrow.getFullYear()}`;

  const handleImageNav = (direction) => {
    if (direction === "prev") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex - 1 < 0 ? motorcycle.images.length - 1 : prevIndex - 1
      );
    } else if (direction === "next") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex + 1 >= motorcycle.images.length ? 0 : prevIndex + 1
      );
    }
  };

  const numOfReviews = () => {
    if(reviews?.length === 1) {
      return (`${reviews.length} Review`)
    }
    if(reviews?.length > 1) {
      return (`${reviews.length} Reviews`)
    }
  }

  useEffect(() => {
    dispatch(motorcycleDetailsThunk(id));
  }, [dispatch, id])

  useEffect(() => {
    if (motorcycle) {
      flatpickr('#start-date', {
        altInput: true,
        altFormat: 'm/d/Y',
        dateFormat: 'm/d/Y',
        enableTime: false,
        allowInput: true,
        onChange: (selectedDates, dateStr) => {
          setStartDate(dateStr);
        }
      });

      flatpickr('#end-date', {
        altInput: true,
        altFormat: 'm/d/Y',
        dateFormat: 'm/d/Y',
        enableTime: false,
        allowInput: true,
        onChange: (selectedDates, dateStr) => {
          setEndDate(dateStr);
        }
      });
    }
  }, [motorcycle])

  return (
    <div>
      <div className='details-page-container'>
        {motorcycle && (
          <div className='image-description-calendar'>
            <div className='image-and-description'>
              <div className='image-container'>
              <div className="image-wrapper">
                <button
                  className="image-nav-button"
                  onClick={() => handleImageNav("prev")}
                >
                  &#8592;
                </button>
                  {motorcycle.images
                    .slice(currentImageIndex, currentImageIndex + 1)
                    .map((image, index) => (
                    <img key={index} src={image.image_url} alt={motorcycle.name} />
                  ))}
                <button
                  className="image-nav-button"
                  onClick={() => handleImageNav("next")}
                >
                  &#8594;
                </button>
                </div>
              </div>
              <div className="description">
                {motorcycle.description}
              </div>
            </div>
            
              <div className='date-picker-container'>
                <label htmlFor="start-date">Start Date:</label>
                <input type="text" id="start-date" name="start-date" value={startDate} />
                <label htmlFor="end-date">End Date:</label>
                <input type="text" id="end-date" name="end-date" value={endDate} />
                <p>$ {motorcycle.price} per day</p>
              <button>Add to Cart</button>
              </div>
            
          </div>
        )}
        {motorcycle && (
          <div>
            <div className='textarea-container'>
              <textarea
                placeholder='Leave a review'
              />
              <button className="submit-review-button">Submit Review</button>
            </div>
            <div className='review-section'>
              {numOfReviews()}
              {motorcycleAverageRating(motorcycle)}
            </div>
            <Reviews />
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