import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World, Composite, Body } from 'matter-js'
import React from 'react'
import { Navbar } from '../components/navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Footer } from "../components/footer";


export const Friction = () => {
    const scene = useRef();
    const engine = useRef(Engine.create());
    const navigate = useNavigate();

    const [mass, setMass] = useState();
    const [coefficient, setCoefficient] = useState();
    const [frictionForce, setFrictionForce] = useState();
    const [input, setInput] = useState();
    
    useEffect(() => {
        const cw = 600;
        const ch = 500;

        setMeasurements();

        const render = Render.create({
            element: scene.current,
            engine: engine.current,
            options: {
                width: cw,
                height: ch,
                wireframes: false,
                background: 'transparent'
            }
        })

        resetWorld(false);

        Engine.run(engine.current)
        Render.run(render)

        return () => {
            Render.stop(render)
            World.clear(engine.current.world)
            Engine.clear(engine.current)
            render.canvas.remove()
            render.canvas = null
            render.context = null
            render.textures = {}
        }
    }, [])

    const setMeasurements = () => {
        const mass = Math.round(Math.random() * 10) + 1;
        setMass(mass);

        const coefficient = Math.random().toFixed(2);
        setCoefficient(coefficient);

        const friction = Math.ceil((mass * 9.8) * coefficient);
        setFrictionForce(friction);

        console.log("To whoever is smart enough to check this the answer is... \n " + friction);
    }



    const pushBlock = () => {
        const cw = 600;
        const ch = 500;
        const cube = Bodies.rectangle(100, 500, 50, 50);
        
        if(Number(input) >= frictionForce && Number(input) <= frictionForce + 10) {
            toast.success('You Got It! Great Job', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            World.clear(engine.current.world);
            World.add(engine.current.world, [
                Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
                Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
                Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
                Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
                cube
            ]);
        } else if (Number(input) < frictionForce) {
            toast.error('That was too low, Try Again!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.warning('That number was WAY too high, come on no cheating!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        
        setTimeout(() => {
            Body.applyForce( cube, {x: cube.position.x, y: cube.position.y}, {x: 0.12, y: 0});
            clearTimeout();
        }, 100)

    }

    const resetWorld = (refresh) => {
        const cw = 600;
        const ch = 500;
        World.clear(engine.current.world);
        const cube = Bodies.rectangle(100, 400, 50, 50);
        
        setInput("");

        World.add(engine.current.world, [
            Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
            Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
            Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
            Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
            cube
        ]);


        if(refresh) {
            setMeasurements();
        }
    }


    return (
        <div className='bg-black justify-center items-center flex flex-col min-h-screen select-none'>
            <Navbar />

            <div className='my-10 w-[85%]'>
                <h1 className='text-2xl font-montserrat text-white'> <u>The Block Push Problem</u> </h1>
                <p className='text-lg font-montserrat text-white pt-5'>
                    A block with a mass of <u>{mass}kg</u> and a frictional Coefficient of {coefficient}
                </p>
                <h3 className='font-montserrat text-white pt-10'><u>Note:</u> Round your answer up to the nearest whole number!</h3>
            </div>

            <div className='flex justify-between w-[85%] gap-10'>
                <div className='w-full justify-around flex flex-col'>
                    <div className='flex flex-col items-start justify-start w-[80%]'>
                        <h2 className='text-2xl font-montserrat text-white'><u>Enter Your Answer Here:</u></h2>
                        <div className='w-[50%] my-2 items-end flex'>
                            <input type="number" name="" id="" className='py-2 w-[80%] rounded-md' value={input} onChange={(e) => setInput(e.target.value)} />
                            <span className='text-2xl font-montserrat text-white px-1'>N</span>
                        </div>
                    </div>

                    <div className='w-full py-5 flex justify-start gap-5'>
                        <button onClick={() => pushBlock()} className='text-black text-2xl bg-white py-2 px-3 rounded-md font-montserrat hover:bg-green-500 hover:text-white duration-300'>Test</button>
                        <button onClick={() => resetWorld(false)} className='text-black text-2xl bg-white py-2 px-3 rounded-md font-montserrat hover:bg-blue-600 hover:text-white duration-300'>Reset Block</button>
                        <button onClick={() => resetWorld(true)} className='text-black text-2xl bg-white py-2 px-3 rounded-md font-montserrat hover:bg-red-600 hover:text-white duration-300'>Restart</button>
                    </div>
                </div>
                

                <div className='w-full justify-end flex'>
                    <div className='border-2 border-color-white h-fit'>
                        <div ref={scene} />
                    </div>
                </div>
            </div>
            

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <Footer />

        </div>
    )
}