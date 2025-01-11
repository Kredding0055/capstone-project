import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMotorcycleThunk } from '../../redux/motorcycle';
import './CreateMotorcycle.css';


function CreateMotorcycle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [miles, setMiles] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  

  const handleSubmit = async (e) => {
          e.preventDefault();
  
          const validationErrors = {};
  
          if (!year) validationErrors.year = 'Year is required';
          if (!make) validationErrors.make = 'Make is required';
          if (!model) validationErrors.model = 'Model is required';
          if (!color) validationErrors.model = 'Color is required';
          if (!price) validationErrors.price = 'Price per day is required';
          if (!miles) validationErrors.state = 'Miles is required';
          if (!city) validationErrors.city = 'City is required';
          if (!state) validationErrors.state = 'State is required';
          if (!description || description.length < 30) validationErrors.description = 'Description needs 30 or more characters';
          if (!photoUrls[0]) validationErrors.photoUrls = 'Preview Image URL is required';
  
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
              ownerId: sessionUser.id
          }
          
          let motorcycle = await dispatch(createMotorcycleThunk(motorcyclePayload));
  
          if(motorcycle) {
              navigate(`/motorcycles/${motorcycle.id}`)
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

  return (
    <div>
      <h1>Welcome to the Create Page</h1>
    </div>
  )
}

export default CreateMotorcycle;