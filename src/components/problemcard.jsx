import React from "react";
import { Link } from "react-router-dom";
// Image Imports
import seesawIMG from "../images/SeeSaw.png";
import ballfloatIMG from "../images/Ball Float.png";


export const ProblemCard = ({ link, title, desc, img }) => {
    return (
        <Link to={link}>
            <div className="bg-white flex flex-col items-start rounded w-[15vw] h-[20vw] justify-around p-2 transform transition duration-500 hover:scale-110 flex items-center">
                <img className='w-[600px] rounded-lg' src={img} />
                <h2 className="font-montserrat text-2xl font-bold w-full text-center">{title}</h2>
                <p className="font-montserrat text-lg">{desc}</p>
            </div>
        </Link>
        
    )
}