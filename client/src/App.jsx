import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom';
import Dashboard from './components/desktop/dashboard';
import Home from './routes/home';

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="desktop" element={<Dashboard />} />
    </Route>
  )
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}