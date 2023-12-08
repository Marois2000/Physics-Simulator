import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
    return (

        
        <div className="w-full justify-start items-center p-10 flex gap-20 bg-black">
            <div className="transform transition duration-500 hover:scale-125 flex items-center">
                <Link to={"/Physics-Simulator/"}>
                <h1 className="text-white font-montserrat text-5xl font-black">Physics</h1>
                <h1 className="text-white font-montserrat text-5xl font-black ml-10">Simulator</h1>
                </Link>
            </div>
            
            <Link className="text-white text-2xl font-montserrat transform transition duration-500 hover:scale-125 flex justify-center items-center" to={"/Physics-Simulator/"}>Home</Link>
            <Link className="text-white text-2xl font-montserrat transform transition duration-500 hover:scale-125 flex justify-center items-center" to={"/Physics-Simulator/problems"}>Problems</Link>
            <Link className="text-white text-2xl font-montserrat transform transition duration-500 hover:scale-125 flex justify-center items-center" to={"/Physics-Simulator/about"}>About</Link>
            


        </div>
    )
}