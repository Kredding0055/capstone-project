import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import MotorcycleDetails from '../components/MotorcycleDetails/MotorcycleDetails';
import CreateMotorcycle from '../components/CreateMotorcycle/CreateMotorcycle';
import UpdateMotorcycle from '../components/UpdateMotorcycle/UpdateMotorcycle';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: '/motorcycles/:id',
        element: <MotorcycleDetails />
      },
      {
        path: '/newMotorcycle',
        element: <CreateMotorcycle />
      },
      {
        path: '/editMotorcycle',
        element: <UpdateMotorcycle />
      }
    ],
  },
]);