import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { ProblemCard } from "../components/problemcard";
import { CyclePhysics } from "../components/cyclephysics";
// Image Imports
import seesawIMG from "../images/SeeSaw.png";
import ballfloatIMG from "../images/Ball Float.png";



export const Root = () => {
    return (
        <div className="flex flex-col justify-start items-center w-full bg-black ">
            <Navbar />

            
            <div className="flex justify-between w-[90%] items center my-20  max-lg:flex-col">
                <div className="flex flex-col justify-center">
                    <h1 className="text-white font-montserrat text-6xl font-medium   pb-10">Welcome</h1>
                    <p className="text-white text-xl font-montserrat w-[40ch]">
                        We make learning physics fun and interactive. <br /><br />
                        Take on our problems, suitable for all levels of curiosity. <br /><br /> 
                        Challenge yourself, explore, and enjoy the journey to becoming a physics pro. <br /><br />
                        Ready to get started? Click on one of the problems down below!
                    </p>
                </div>
                <CyclePhysics />
            </div>

            <div className="w-[70%] flex flex-col justify-center items-center  py-20">
                <h2 className="text-white font-montserrat text-5xl font-bold pb-10">Try A Problem</h2>
                <div className="flex w-full gap-20 flex-wrap justify-center items-center">
                    <ProblemCard link="/Physics-Simulator/seesaw" title="See Saw" desc="Can you figure out how the boxes will balance?" img={seesawIMG}/>
                    <ProblemCard link="/Physics-Simulator/floatingball" title="Ball Float" desc="Is the ball going to sink, float, or stay perfectly balanced?" img={ballfloatIMG}/>
                </div>
            </div>

            

        </div> 
    )
}