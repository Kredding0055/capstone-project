import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { loadAllMotorcycles } from '../../redux/motorcycle';
import './HomePage.css';

function HomePage() {
  const dispatch = useDispatch();
  const { motorcycles } = useSelector((state) => state.motorcycle)
  console.log('Motorcycles', motorcycles)

  useEffect(() => {
    dispatch(loadAllMotorcycles())
  }, [dispatch])
  
  return (
    <div >
      <div>
        <h1>Inside the HomePage</h1>
        {motorcycles?.map((motorcycle) => (
          <div key={motorcycle.id}>
            <Link to={`motorcycles/${motorcycle.id}`}>
              <div>
                <p>{motorcycle.year} {motorcycle.make} {motorcycle.model}</p>
                <p>{motorcycle.city} {motorcycle.state}</p>
                <p>${motorcycle.price} Per Day</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage;