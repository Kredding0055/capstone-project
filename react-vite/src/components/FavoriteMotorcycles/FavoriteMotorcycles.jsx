import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadFavorites } from "../../redux/favorite";
import { loadAllMotorcycles } from "../../redux/motorcycle";
import { motorcycleAverageRating } from "../HomePage/HomePage";
import { deleteFavoriteThunk } from "../../redux/favorite";
import './FavoriteMotorcycles.css';

function FavoriteMotorcycles() {
  const dispatch = useDispatch();
  const motorcycles = useSelector((state) => state.motorcycle.motorcycles)
  const favorites = useSelector((state) => state.favorite.favorites)

  console.log('motorcycles', motorcycles)
  console.log('favorites', favorites)


  const removeFavorite = (id) => {
    dispatch(deleteFavoriteThunk(id))
    .then(() => {
      alert('Motorcycle removed from favorites!');
    })
  }

  // useEffect(() => {
  //   dispatch(loadFavorites())
  // }, [dispatch])

  useEffect(() => {
    dispatch(loadFavorites())
    dispatch(loadAllMotorcycles())
  }, [dispatch]) 

  if (!motorcycles) return <p>Loading...</p>;

  return (
    <div className="favorites-page">
    <h1>Favorite Motorcycles</h1>
    <div className='grid-container'>
      <div className="motorcycle-card-grid">
        {favorites && favorites.length > 0 ? (
          favorites.map((favorite) => {
            const motorcycle = motorcycles.find((m) => m.id === favorite.motorcycle_id);
            if (!motorcycle) {
              console.error(`Motorcycle not found: ${favorite.motorcycle_id}`);
              return null;
            }
            return (
              <div key={motorcycle.id} className="motorcycle-card">
                <Link to={`/motorcycles/${motorcycle.id}`}>
                  <div className="motorcycle-image">
                    {motorcycle.images && motorcycle.images.length > 0 ? (
                      <img src={motorcycle.images[0].image_url} />
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
                      {motorcycleAverageRating(motorcycle)} 
                      <p>${motorcycle.price} Per Day</p>
                    </div>
                  </div>
                  <div>
                  <button onClick={() => removeFavorite(favorite.id)}>Remove from favorites</button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2>You have no favorites yet</h2>
        )}
      </div>
    </div>
  </div>
  )
}

export default FavoriteMotorcycles;