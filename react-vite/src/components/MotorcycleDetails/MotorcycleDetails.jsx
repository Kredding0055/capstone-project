import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motorcycleDetailsThunk } from '../../redux/motorcycle';
import { loadMotorcycleImages } from '../../redux/motorcycleImages';
import { motorcycleAverageRating } from '../HomePage/HomePage';
import { addFavoriteThunk } from '../../redux/favorite';
import { loadReviewsThunk, createReview } from '../../redux/review';
import { addToCartThunk } from '../../redux/shoppingCart';
import Reviews from '../Reviews/Reviews';
import { ImStarEmpty, ImStarFull } from 'react-icons/im';
import './MotorcycleDetails.css';

function MotorcycleDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const motorcycle = useSelector((state) => state.motorcycle[id])
  const motorcycleImages = useSelector((state) => state.motorcycleImage?.[id]);
  const reviews = useSelector((state) => state.review.reviews?.[id])
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [review, setReview] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [hover, setHover] = useState(0)
  const [submitDisabled, setSubmitDisabled] = useState(true);
  // console.log('motorcycle', motorcycle)
  console.log('reviews', reviews)
  // console.log('MotorcycleImages', motorcycleImages)

  const handleImageNav = (direction) => {
    if (direction === "prev") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex - 1 < 0 ? motorcycleImages.length - 1 : prevIndex - 1
      );
    } else if (direction === "next") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex + 1 >= motorcycleImages.length ? 0 : prevIndex + 1
      );
    }
  };

  const addToFavorites = () => {
    dispatch(addFavoriteThunk(motorcycle.id))
      .then(() => {
        alert('Motorcycle added to favorites!');
      })
  }

  const addReview = () => {
    console.log('addReview')
    const reviewPayload = {
      review_text: review,
      stars: starRating
    }
    dispatch(createReview(id, reviewPayload))
      .then(() => {
      setReview('')
      setStarRating(0)
      })
  }

  const addToCart = () => {
    const cart_item = {
      motorcycle_id: motorcycle.id,
      start_date: startDate,
      end_date: endDate
    }
    dispatch(addToCartThunk(cart_item))
  }

  const starFilled = (num) => {
    setStarRating(num);
  }

  const handleHover = (num) => {
    setHover(num);
  }

  useEffect(() => {
    if(starRating > 0 && review.length >= 10) {
      setSubmitDisabled(false)
    }
    else {
      setSubmitDisabled(true)
    }
  }, [starRating, review])

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
    dispatch(loadMotorcycleImages(id));
    dispatch(loadReviewsThunk(id))
  }, [id, dispatch])

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
                  {motorcycleImages && (
                    motorcycleImages
                    .slice(currentImageIndex, currentImageIndex + 1)
                    .map((image, index) => (
                    <img key={index} src={image.image_url} alt={motorcycle.name} />
                  ))
                  )}
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
            <div className='calendar-and-details'>
              <div className='date-picker-container'>
                <label>Start Date:</label>
                <input type="date" value={startDate} min={today} onChange={(e) => setStartDate(e.target.value)} />
                <br />
                <label>End Date:</label>
                <input 
                  type="date" 
                  value={endDate} 
                  min={startDate} 
                  onChange={(e) => 
                  setEndDate(e.target.value)} 
                  disabled={!startDate}
                  />
                <br/>  
                <p>Rental: $ {motorcycle.price} per day</p>
                <button onClick={addToCart}>Add to Cart</button>
                <button onClick={addToFavorites}>Add to Favorites</button>
              </div>
              <div className='motorcycle-details'>
                <h3>Motorcycle Details</h3>
                <p>Year: {motorcycle.year}</p>
                <p>Make: {motorcycle.make}</p>
                <p>Model: {motorcycle.model}</p>
                <p>Color: {motorcycle.color}</p>
                <p>Miles: {motorcycle.miles}</p>
              </div>
            </div>
          </div>
        )}
        {motorcycle && (
          <div>
            <div className='textarea-container'>
              <textarea
                placeholder='Leave a review'
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <br/>
              <div className='details-star-section'>
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index}>
                  {(starRating >= index || hover >= index) ? (
                    <ImStarFull 
                      className='details-star-rating' 
                      onMouseEnter={() => handleHover(index)}
                      onMouseLeave={() => handleHover(0)}
                      onClick={() => starFilled(index)}
                    />
                  ) : (
                    <ImStarEmpty 
                      className='details-star-rating' 
                      onMouseEnter={() => handleHover(index)}
                      onMouseLeave={() => handleHover(0)}
                      onClick={() => starFilled(index)}
                    />
                  )}
                </div>
              ))}
            <h3>Stars</h3>       
          </div>
              <button 
                className="submit-review-button" 
                onClick={addReview}
                disabled={submitDisabled}
                >Submit Review</button>
            </div>
            <br/>
            <div className='review-section'>
              {numOfReviews()} &nbsp;
              {motorcycleAverageRating(reviews)}
            </div>
            <Reviews reviews={reviews}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default MotorcycleDetails;