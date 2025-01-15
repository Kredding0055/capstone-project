import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { loadAllMotorcycles } from '../../redux/motorcycle';
import { motorcycleAverageRating } from '../HomePage/HomePage';



function ManageMotorcycle() {
  const dispatch = useDispatch();
  const { motorcycles } = useSelector((state) => state.motorcycle)


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

export default ManageMotorcycle;