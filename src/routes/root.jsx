import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { ProblemCard } from "../components/problemcard";

export const Root = () => {
    return (
        <div className="flex flex-col justify-start items-start h-full w-full bg-black">
            <Navbar />

            
            <ProblemCard link="/seesaw" title="See Saw" desc="Can you figure out how the boxes will balance?"/>

        </div> 
    )
}