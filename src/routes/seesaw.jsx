import { useEffect, useRef } from 'react'
import { Engine, Render, Bodies, World, Body, Matter, Constraint, Vector } from 'matter-js'
import React from 'react'
import { Navbar } from '../components/navbar'

export const SeeSaw = (props) => {
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

    
  useEffect(() => {
        const cw = 800;
        const ch = 650;

        addSeeSaw();

        const render = Render.create({
        element: scene.current,
        engine: engine.current,
        options: {
            width: cw,
            height: ch,
            wireframes: false,
            background: 'White'
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



  const addSeeSaw = () => {
    //const boxA = Bodies.rectangle(150, 450, 80, 80, { density: 0.005, render: { fillStyle: '#0000ff' }});
    //const boxB = Bodies.rectangle(450, 480, 80, 80, { density: 0.005});
    var group = Body.nextGroup(true);
    var catapult =  Bodies.rectangle(400, 520, 320, 20,{ collisionFilter: { group: group } });
    var rectangle1 = Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true, render: { fillStyle: '#060a19' } });
    //var rectangle2 = Bodies.rectangle(250, 555, 20, 50, { isStatic: true, render: { fillStyle: '#060a19' } });
    var rectangle3 = Bodies.rectangle(400, 535, 20, 80, { isStatic: true, collisionFilter: { group: group }, render: { fillStyle: '#060a19' } });
    
    var weight1 = Bodies.rectangle(500, 480, 50,50);
    var weight2 = Bodies.rectangle(300, 480, 50,50);
    
    //var circle1 = Bodies.circle(560, 100, 50, { density: 0.005 });
    var constraint =  Constraint.create({ 
        bodyA: catapult, 
        pointB: Vector.clone(catapult.position),
        stiffness: 1,
        length: 0
    });
    World.add(engine.current.world, [weight1, weight2, constraint, catapult, group,rectangle1, rectangle3]);
    //World.add(engine.current.world, [boxA, boxB]);
  }

  return (
    <div className='w-[100%] h-[100%] bg-black'>
        <Navbar />

        <div className=' bg-black w-full justify-center flex'>
            <div className='border-2 border-color-white h-fit'>
                <div 
                   
                    ref={scene} />
            </div>
            
        </div>
    </div>
    
  )
}