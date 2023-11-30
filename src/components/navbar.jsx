import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
    return (
        <div className="w-full justify-start items-center p-10 flex gap-[10rem]">
            <div>
                <h1 className="text-white font-montserrat text-5xl font-bold">Physics</h1>
                <h1 className="text-white font-montserrat text-5xl font-bold ml-10">Simulator</h1>
            </div>

            <Link className="text-white text-2xl" to={"/"}>Home</Link>
            <Link className="text-white text-2xl" to={"/about"}>About</Link>
            <Link className="text-white text-2xl" to={"/"}>Contact</Link>



        </div>
    )
}