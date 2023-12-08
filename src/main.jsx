import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import { Root } from "./routes/root.jsx";
import { About } from './routes/about.jsx';
import { SeeSaw } from './routes/seesaw.jsx';
import { FloatingBall } from './routes/floatingball.jsx';
import { Problems } from './routes/problems.jsx';

const router = createBrowserRouter([{
    path: "/Physics-Simulator/",
    element: <Root />,
    errorElement: <div><h1>No page found</h1></div>
  },
  {
    path: "/Physics-Simulator/problems",
    element: <Problems />
  },
  {
    path: "/Physics-Simulator/about",
    element: <About />
  },
  {
    path: "/Physics-Simulator/seesaw",
    element: <SeeSaw />
  },
  {
    path: "/Physics-Simulator/floatingball",
    element: <FloatingBall />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='w-full h-[100vh] '>
      <RouterProvider router={router}  />

    </div>
  </React.StrictMode>,
)
