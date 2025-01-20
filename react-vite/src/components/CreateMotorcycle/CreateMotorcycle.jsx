import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMotorcycleThunk } from '../../redux/motorcycle';
import { addMotorcyleImageThunk } from '../../redux/motorcycleImages.js';
import states from './states.js';
import './CreateMotorcycle.css';


function CreateMotorcycle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user)
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [miles, setMiles] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [photoUrls, setPhotoUrls] = useState([
    { url: '', file: null },
    { url: '', file: null },
    { url: '', file: null },
    { url: '', file: null },
    { url: '', file: null },
  ]);
  const [errors, setErrors] = useState({});

  console.log('user', user)

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

    let motorcycle = await dispatch(createMotorcycleThunk(motorcyclePayload));

    if(motorcycle) {
      const photoPayload = photoUrls.map((photo) => ({
        motorcycleId: motorcycle.id,
        url: photo.url,
      }));

      await dispatch(addMotorcyleImageThunk(motorcycle.id, photoPayload)).then(() => {
        navigate(`/motorcycles/${motorcycle.id}`);
      });
    }
  
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

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoUrls((prevPhotoUrls) => {
        const newPhotoUrls = [...prevPhotoUrls];
        newPhotoUrls[index].url = reader.result;
        newPhotoUrls[index].file = file;
        return newPhotoUrls;
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className='create-motorcycle-container'>
      <h2>Add your Motorcycle</h2>
      <form onSubmit={handleSubmit} className='form-container'>
        <div className='form-group'>
          <label>Year</label>
          <input 
            min='1894'
            max='2025'
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
            {photoUrls.map((photo, index) => (
              <div key={index}>
                <input
                  type='file'
                  onChange={(event) => handleImageChange(event, index)}
                />
                {photo.url && (
                  <img src={photo.url} alt='Uploaded Image' width='100' />
                )}
              </div>
            ))}
            {errors.photoUrls && <p className='error'>{errors.photoUrls}</p>}
          </div>
          {/* <input
            type='url'
            placeholder='Image URL'
            value={photoUrls[0]}
            onChange={(e) => addPhoto(e.target.value, 0)}
            className="photo-input"
          />
          {errors.photoUrls && <p className='error'>{errors.photoUrls}</p>}
          <input
            type='url'
            placeholder='Image URL'
            value={photoUrls[1]}
            onChange={(e) => addPhoto(e.target.value, 1)}
            className="photo-input"
          />
          <input 
            type='url'
            placeholder='Image URL'
            value={photoUrls[2]}
            onChange={(e) => addPhoto(e.target.value, 2)}
            className="photo-input"
          />
          <input
            type='url'
            placeholder='Image URL'
            value={photoUrls[3]}
            onChange={(e) => addPhoto(e.target.value, 3)}
            className="photo-input"
          />
          <input
            type='url'
            placeholder='Image URL'
            value={photoUrls[4]}
            onChange={(e) => addPhoto(e.target.value, 4)}
            className="photo-input"
          />
          <br/>
          <br/>
        </div> */}
        <button type='submit'>Create Motorcycle</button>
      </form>
    </main>
  )
}

export default CreateMotorcycle;