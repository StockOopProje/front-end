import { Navigate, useRoutes } from 'react-router-dom';
import pages from "./pages"

//routes
import Main from './components/Main';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Main />,
      children: [
        { path: '', element: <Main/> },
        { path: '*', element: <Navigate to="/404" /> },
      ]
    },
    {
      path: '/',
      children: [
        // { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/" /> },
        ...pages,
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}