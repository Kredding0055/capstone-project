import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motorcycleDetailsThunk, updateMotorcycleThunk } from '../../redux/motorcycle';
import { loadMotorcycleImages, addMotorcyleImageThunk, deleteMotorcycleImageThunk } from '../../redux/motorcycleImages';
import states from '../CreateMotorcycle/states.js'
import './UpdateMotorcycle.css';


function UpdateMotorcycle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const motorcycle = useSelector((state) => state.motorcycle?.[id])
  const motorcycleImages = useSelector((state) => state.motorcycleImage?.[id])
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [miles, setMiles] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrls, setPhotoUrls] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(motorcycleDetailsThunk(id))
    dispatch(loadMotorcycleImages(id))
  }, [dispatch, id]);

  useEffect(() => {
    if(motorcycle) {
    setYear(motorcycle.year)
    setMake(motorcycle.make);
    setModel(motorcycle.model);
    setColor(motorcycle.color);
    setPrice(motorcycle.price)
    setMiles(motorcycle.miles);
    setCity(motorcycle.city);
    setState(motorcycle.state);
    setDescription(motorcycle.description)
    }

    if (motorcycleImages) {
      setPhotoUrls(motorcycleImages.map((image) => ({ id: image.id, url: image.image_url, file: null })))
    }
  }, [motorcycle, motorcycleImages])

  const handleClickDeletePhoto = async (photoId) => {
    await dispatch(deleteMotorcycleImageThunk(motorcycle.id, photoId));
    setPhotoUrls((prevPhotoUrls) => prevPhotoUrls ? prevPhotoUrls.filter((photo) => photo.id !== photoId) : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = {};
  
    if (!year) validationErrors.year = 'Please provide a year';
    if (!make) validationErrors.make = 'Please provide a make';
    if (!model) validationErrors.model = 'Please provide a model';
    if (!color) validationErrors.color = 'Please provide a color';
    if (!price) validationErrors.price = 'Please provide a price per day';
    if (!miles) validationErrors.miles = 'Please provide miles';
    if (!city) validationErrors.city = 'Please provide a city';
    if (!state) validationErrors.state = 'Please select a state';
    if (!description || description.length < 30) validationErrors.description = 'Please provide a description needs 30 or more characters';
    if (!photoUrls[0]) validationErrors.photoUrls = 'Please provide at least 1 image';
  
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      const motorcyclePayload = {
        year,
        make,
        model,
        color,
        price,
        miles,
        city,
        state,
        description,
      }
          
    await dispatch(updateMotorcycleThunk(id, motorcyclePayload));

    await dispatch(addMotorcyleImageThunk(id, newPhotos)).then(() => {
      navigate(`/motorcycles/${id}`);
    });

    reset();
    }
  }
  
  const reset = () => {
    setYear('');
    setMake('');
    setModel('');
    setColor('');
    setPrice('');
    setMiles('');
    setCity('');
    setState('');
    setDescription('');
    setPhotoUrls([]);
  }
  
  
  const handleRemoveNewPhoto = (index) => {
    setNewPhotos((prevNewPhotos) => {
      const newNewPhotos = [...prevNewPhotos];
      newNewPhotos.splice(index, 1);
      return newNewPhotos;
    });
  };
  
  const addNewPhoto = () => {
    setNewPhotos((prevNewPhotos) => [...prevNewPhotos, { url: '', file: null }]);
  };

  const handleImageChange = (event, index, isNewPhoto) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (isNewPhoto) {
        setNewPhotos((prevNewPhotos) => {
          const newNewPhotos = [...prevNewPhotos];
          newNewPhotos[index].url = reader.result;
          newNewPhotos[index].file = file;
          return newNewPhotos;
        });
      } else {
        setPhotoUrls((prevPhotoUrls) => {
          const newPhotoUrls = [...prevPhotoUrls];
          newPhotoUrls[index].url = reader.result;
          newPhotoUrls[index].file = file;
          return newPhotoUrls;
        });
      }
    };
    reader.readAsDataURL(file);
  };
  

  return (
    <main className='update-motorcycle-container'>
      <h2>Update your Motorcycle</h2>
      <form onSubmit={handleSubmit} className='form-container'>
        <div className='form-group'>
          <label>Year</label>
          <input 
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type='number'
            placeholder='Year'
          />
          {errors.year && <p className='error'>{errors.year}</p>}
        </div>
        <div className='form-group'>
          <label>Make</label>
          <input 
            value={make}
            onChange={(e) => setMake(e.target.value)}
            type='text'
            placeholder='Make'
          />
          {errors.make && <p className='error'>{errors.make}</p>}
        </div>
        <div className='form-group'>
          <label>Model</label>
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)} 
            type='text'
            placeholder='Model'
          />
          {errors.model && <p className='error'>{errors.model}</p>}
        </div>
        <div className='form-group'>
          <label>Color</label>
          <input 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            type='text'
            placeholder='Color'
          />
          {errors.color && <p className='error'>{errors.color}</p>}
        </div>
        <div className='form-group'>
          <label>Price</label>
          <input 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type='number'
            placeholder='Price'
          />
          {errors.price && <p className='error'>{errors.price}</p>}
        </div>
        <div className='form-group'>
          <label>Miles</label>
          <input 
            value={miles}
            onChange={(e) => setMiles(e.target.value)}
            type='number'
            placeholder='Miles'
          />
          {errors.miles && <p className='error'>{errors.miles}</p>}
        </div>
        <div className='form-group'>
          <label>City</label>
          <input 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type='text'
            placeholder='City'
          />
          {errors.city && <p className='error'>{errors.city}</p>}
        </div>
        <div className='form-group'>
          <label>State</label>
          <select 
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <p className='error'>{errors.state}</p>}
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Write a short description about your motorcycle'
          />
          {errors.description && <p className='error'>{errors.description}</p>}
        </div>
        <div className='form-group'>
        <label>Photos (Add atleast 1 photo)</label>
          <div className="current-photos">
            {photoUrls.map((photo, index) => (
              <div key={index} className="current-photo">
                <img src={photo.url} alt="Current Photo" width="100" />
                <button
                  type='button'
                  onClick={() => handleClickDeletePhoto(photo.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="add-photos">
  {newPhotos.map((photo, index) => (
    <div key={index} className="photo-input-container">
      <input
        type='file'
        onChange={(event) => handleImageChange(event, index, true)}
      />
      <button
        type='button'
        onClick={() => handleRemoveNewPhoto(index)}
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type='button'
    onClick={addNewPhoto}
  >
    Add New Photo
  </button>
</div>
          {errors.photoUrls && <p className='error'>{errors.photoUrls}</p>}
          </div> 
        <button type='submit'>Update Motorcycle</button>
      </form>
    </main>
  )
}

export default UpdateMotorcycle;