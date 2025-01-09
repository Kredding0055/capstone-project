const LOAD_MOTORCYCLES = 'motorcycle/loadMotorcycles';
const ADD_MOTORCYCLE = 'motorcycle/addMotorcycle';
const UPDATE_MOTORCYCLE = 'motorcycle/updateMotorcycle';
const DELETE_MOTORCYCLE = 'motorcycle/deleteMotorcycle';

const loadMotorcycles = (motorcycles) => {
  return {
    type: LOAD_MOTORCYCLES,
    motorcycles
  }
}

const addMotorcycle = (motorcycle) => {
  return {
    type: ADD_MOTORCYCLE,
    motorcycle
  }
}

const updateMotorcycle = (motorcycle) => {
  return {
    type: UPDATE_MOTORCYCLE,
    motorcycle
  }
}

const deleteMotorcycle = (id) => {
  return {
    type: DELETE_MOTORCYCLE,
    id
  }
}