import React from "react";
import { Link } from "react-router-dom";


export const ProblemCard = ({ link, title, desc }) => {
    return (
        <Link to={link}>
            <div className="bg-white flex flex-col items-start rounded-md w-[15vw] h-[10vw] justify-around p-2">
                <h2 className="font-montserrat font-semibold text-xl">{title}</h2>
                <p className="font-montserrat text-lg">{desc}</p>
            </div>
        </Link>
        
    )
}