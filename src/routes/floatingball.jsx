import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World } from 'matter-js'
import React from 'react'
import { Navbar } from '../components/navbar'

export const FloatingBall = () => {
    const scene = useRef();
    const engine = useRef(Engine.create());


    

        
    useEffect(() => {
            const cw = 600;
            const ch = 500;

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



    const floatBall = () => {
        
    }



    return (
        <div className='w-[100%] h-[100%] bg-black justify-center items-center flex flex-col'>
            <Navbar />

            <div className='my-20 w-[80%]'>
                <h1 className='text-2xl font-montserrat text-white'>The Floating Ball Problem</h1>
                <p className='text-lg font-montserrat text-white'>

                </p>
            </div>

            <div className=' bg-black w-full justify-center flex'>
                <div className='border-2 border-color-white h-fit'>
                    <div ref={scene} />
                </div>
                
            </div>
        </div>
    )
}