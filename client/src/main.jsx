import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter, 
  createRoutesFromChildren, 
  Route, 
  RouterProvider 
} from 'react-router-dom';
import './index.css'

import Dashboard from './components/desktop/dashboard';
import Home from './routes/home';
import View from './routes/view';

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="/view" element={<View />} />
      <Route path="/desktop" element={<Dashboard />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
