import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { ProblemCard } from "../components/problemcard";

export const Root = () => {
    return (
        <div className="flex flex-col justify-start items-center h-full w-full bg-black">
            <Navbar />

            
            <div className="flex justify-between w-[80%] items center my-20">
                <div className="flex flex-col justify-center">
                    <h1 className="text-white font-montserrat text-3xl font-bold">Try a Problem</h1>
                    <p className="text-white text-lg font-montserrat w-[40ch]">Click on one of the problems below and see if you can get it right!</p>
                </div>
            </div>



            <ProblemCard link="/seesaw" title="See Saw" desc="Can you figure out how the boxes will balance?"/>

        </div> 
    )
}