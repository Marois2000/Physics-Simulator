import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World } from 'matter-js'
import React from 'react'
import { Navbar } from '../components/navbar'

export const FloatingBall = () => {
    const scene = useRef();
    const engine = useRef(Engine.create());

    const [radius, setRadius] = useState();
    const [fluidD, setFluidD] = useState();
    const [ballD, setBallD] = useState();
    const [ballMass, setBallMass] = useState();
    const [ballV, setBallV] = useState();

    const [answer, setAnswer] = useState();
    

        
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

        World.add(engine.current.world, [
            
            Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
            Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
            Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
            Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
            Bodies.circle(cw/2, ch/2, 50, { isStatic: true, render: { fillStyle: "#ffffff"}})
        ])

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
        const r = Math.round(Math.random() * 25) + 5;
        setRadius(r);

        const mass = Math.round(Math.random() * 10) + 1;
        setBallMass(mass);
        setFluidD(Math.round(Math.random() * 1000));

        const volume = (4 * (r*0.01)**3 * Math.PI)/3;
        setBallV(volume);

        const density = mass/volume;
        setBallD(density);

        if(Math.random() > 0.9) {
            setFluidD(density);
        }
    }



    const floatBall = () => {
        
    }

    console.log(answer)

    return (
        <div className='bg-black justify-center items-center flex flex-col'>
            <Navbar />

            <div className='my-10 w-[70%]'>
                <h1 className='text-2xl font-montserrat text-white'>The Floating Ball Problem</h1>
                <p className='text-lg font-montserrat text-white pt-5'>
                    A <u>{ballMass}kg</u> ball with a radius of <u>{radius}cm</u>  is in a fluid with a density of <u>{fluidD}kg/m<sup>3</sup></u>  <br /><br />
                    The Balls density is {ballD}. <br /><br />
                    The Balls Volume is {ballV}. <br /><br />
                    In it's current state will the ball sink, float, or remain where it is?
                </p>
            </div>

            <div className='flex justify-between w-[70%] gap-10'>
                <div className='flex flex-col items-start justify-start w-full'>
                    <h2 className='text-2xl font-montserrat text-white'><u>Select one of the Following:</u></h2>
                    <div className='grid w-full grid-cols-3 gap-2 rounded-xl bg-gray-200 p-2 my-5'>
                        <div>
                            <input type="radio" name="option" id="1" value="1" class="peer hidden" onClick={() => setAnswer(1)}  />
                            <label for="1" class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-black peer-checked:font-bold peer-checked:text-white">Float</label>
                        </div>

                        <div>
                            <input type="radio" name="option" id="2" value="2" class="peer hidden" onClick={() => setAnswer(2)} />
                            <label for="2" class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-black peer-checked:font-bold peer-checked:text-white">Balanced</label>
                        </div>

                        <div>
                            <input type="radio" name="option" id="3" value="3" class="peer hidden" onClick={() => setAnswer(3)} />
                            <label for="3" class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-black peer-checked:font-bold peer-checked:text-white">Sink</label>
                        </div>
                    </div>
                </div>

                <div className='w-full justify-end flex'>
                    <div className='border-2 border-color-white h-fit'>
                        <div ref={scene} />
                    </div>
                </div>
            </div>
            
        </div>
    )
}