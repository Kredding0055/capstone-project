import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { loadAllMotorcycles } from '../../redux/motorcycle';
import { ImStarFull } from 'react-icons/im';
import './HomePage.css';

function HomePage() {
  const dispatch = useDispatch();
  const { motorcycles } = useSelector((state) => state.motorcycle)
  console.log('Motorcycles', motorcycles)
  
  const motorcycleAverageRating = (motorcycle) => {
    if(!motorcycle.reviews || motorcycle.reviews.length === 0) {
      return 'New'
    }
    const sumOfStars = motorcycle.reviews.reduce((sum, review) => sum + review.stars, 0);
    const averageRating = (sumOfStars/ motorcycle.reviews.length).toFixed(2)
    // return `${averageRating} <ImStarFull style={{ fontSize: 20 }}/>`;
    return (<span> {averageRating} <ImStarFull style={{ fontSize: 20 }}/> </span>);
  }

  useEffect(() => {
    dispatch(loadAllMotorcycles())
  }, [dispatch])
  
  return (
    <div>
      <div className='grid-container'>
        <div className="motorcycle-card-grid">
          {motorcycles?.map((motorcycle) => (
            <Link key={motorcycle.id} to={`motorcycles/${motorcycle.id}`} className="motorcycle-card">
              <div className="motorcycle-image">
                <img src={motorcycle.images[0].image_url} />
              </div>
              <div className='homepage-motorcycle-details'>
                <div className='details-left'>
                  <p>{motorcycle.year} {motorcycle.make} {motorcycle.model}</p>
                  <p>{motorcycle.city} {motorcycle.state}</p>
                </div>
                <div className='details-right'>
                  {motorcycleAverageRating(motorcycle)}                
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