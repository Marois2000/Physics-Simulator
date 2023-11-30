import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import { Root } from "./routes/root.jsx";
import { About } from './routes/about.jsx';

const router = createBrowserRouter([{
    path: "/",
    element: <Root />,
    errorElement: <div><h1>No page found</h1></div>
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/seesaw",
    element: <div>See Saw</div>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='w-full h-[100vh]'>
      <RouterProvider router={router} />

    </div>
  </React.StrictMode>,
)
