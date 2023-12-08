import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { ProblemCard } from "../components/problemcard";
import { CyclePhysics } from "../components/cyclephysics";
// Image Imports
import seesawIMG from "../images/SeeSaw.png";
import ballfloatIMG from "../images/Ball Float.png";

export const Problems = () => {
    return(
        <div className="flex flex-col justify-start items-center w-full h-full bg-black ">
            <Navbar />
        <div className="w-[70%] flex flex-col justify-center items-center  py-20">
                <h2 className="text-white font-montserrat text-4xl font-bold pb-10">Problems</h2>
                <div className="flex w-full gap-20 flex-wrap justify-center items-center">
                    <ProblemCard link="/Physics-Simulator/seesaw" title="See Saw" desc="Can you figure out how the boxes will balance?" img={seesawIMG}/>
                    <ProblemCard link="/Physics-Simulator/floatingball" title="Ball Float" desc="Is the ball going to sink, float, or stay perfectly balanced?" img={ballfloatIMG}/>
                </div>
        </div>
        </div>
    )  
}