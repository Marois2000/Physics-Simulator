import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/navbar";

export const Root = () => {
    return (
        <div className="flex justify-start items-start h-full w-full bg-black">
            <Navbar />

        </div> 
    )
}