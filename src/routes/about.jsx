import { useEffect, useRef } from 'react'
import { Engine, Render, Bodies, World } from 'matter-js'
import React from 'react'
import { Navbar } from '../components/navbar'

export const About = (props) => {
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  useEffect(() => {
        const cw = 600;
        const ch = 500;

        addSeeSaw();

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
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true })
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

  const handleDown = () => {
    isPressed.current = true
  }

  const handleUp = () => {
    isPressed.current = false
  }

  const handleAddCircle = e => {
    if (isPressed.current) {
      const ball = Bodies.circle(
        e.clientX / 2,
        e.clientY / 2,
        10 + Math.random() * 30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            fillStyle: '#0000ff'
          }
        })
      World.add(engine.current.world, [ball])
    }
  }

  const addSeeSaw = () => {
    const boxA = Bodies.rectangle(150, 450, 80, 80, { density: 0.005, render: { fillStyle: '#0000ff' }});
    const boxB = Bodies.rectangle(450, 480, 80, 80, { density: 0.005});


    World.add(engine.current.world, [boxA, boxB]);
  }

  return (
    <div className='w-[100%] h-[100%] bg-black'>
        <Navbar />

        <div className=' bg-black w-full justify-center flex'>
            <div className='border-2 border-color-white h-fit'>
                <div onMouseDown={handleDown}
                    onMouseUp={handleUp}
                    onMouseMove={handleAddCircle} ref={scene} />
            </div>
            
        </div>
    </div>
    
  )
}