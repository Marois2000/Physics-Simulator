import React from 'react';
import { Navbar } from '../components/navbar';
import hero from "../images/abouthero.jpeg";
import him from "../images/einstein.jpg";
import matter from "../images/matterjs.png";


export const About = () => {
  

  return (
    <div className='w-[100%] bg-black justify-start items-center flex flex-col'>
        <Navbar />
        <div className='my-20 w-[90%] flex justify-between items-center'>
            <div className='flex flex-col items-start justify-start h-full'>
              <h1 className='text-3xl font-montserrat text-white'> <u>About Our Project</u> </h1>
              <p className='text-xl font-montserrat text-white pt-5 max-w-[40ch]'>
                This is a physics quiz style application, that tests all of your physics knowledge with various physics problems. <br /><br />
                Your variables are always random allowing endless physics testing! <br /><br />
                How problems can you solve?
              </p>
            </div>
            <img className='w-[600px] rounded-md' src={hero} alt="Random physics equations and graphics" />
        </div>

        

        <div className='my-20 w-[90%] flex justify-between items-center'>
            <img className='w-[600px] rounded-md' src={matter} alt="Random physics equations and graphics" />
            <div className='flex flex-col items-end justify-start h-full'>
              <h1 className='text-3xl font-montserrat text-white text-right'> <u>The Physics Engine</u> </h1>
              <p className='text-xl font-montserrat text-white pt-5 max-w-[40ch] text-right'>
                In order to simulate realistic physics we used a javascript physics library called <a href="https://brm.io/matter-js/"><u className=' font-semibold text-gray-400'>Matter JS</u></a> . <br /><br />
                This is a full fledged physics engine built right into javascript that can simulate any 2D scenario you can think of!
              </p>
            </div>
        </div>

        <div className='my-20 w-[90%] flex justify-between items-center'>
            <div className='flex flex-col items-start justify-start h-full'>
              <h1 className='text-3xl font-montserrat text-white'> <u>Why Did We Make This?</u> </h1>
              <p className='text-xl font-montserrat text-white pt-5 max-w-[40ch]'>
                We wanted to combine our passion for coding with our new found skills in physics. <br /><br />
              </p>
            </div>
            <img className='w-[600px] rounded-md' src={him} alt="Random physics equations and graphics" />
        </div>
        
    </div>
    
  )
}