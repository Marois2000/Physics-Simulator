import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World, Body, Matter, Constraint, Vector } from 'matter-js'
import React from 'react'
import { Navbar } from '../components/navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const SeeSaw = (props) => {
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  const [randomXLeft, setRandomXLeft] = useState();
  const [randomMassLeft, setRandomMassLeft] = useState();
  const [randomXRight, setRandomXRight] = useState();
  const [massRight, setMassRight] = useState();

  const [userInput, setUserInput] = useState();



    useEffect(() => {
        const cw = 800;
        const ch = 650;

        setMeasurements(true);

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
  const clearSim = () =>{
    World.clear(engine.current.world);
    Engine.clear(engine.current);

    
  }
  const setMeasurements = (freeze, reset) => {
    
    const randomXLeft = Math.floor(Math.random() * 100) + 266;
    const randomMassLeft = Math.random() + .250;
    const randomXRight = Math.floor(Math.random() * 100) + 420;
    const massRight = (((400-randomXLeft*randomMassLeft*1000)/randomXRight-400)*-1)/1000;
    
    console.log(Math.floor(massRight*1000) + 'g');

    setRandomXLeft(randomXLeft);
    setRandomMassLeft(randomMassLeft);
    setRandomXRight(randomXRight);
    setMassRight(massRight);
    console.log("Mass Should be: " + massRight*1000);

   addSeeSaw(randomXLeft, randomMassLeft, randomXRight, massRight, freeze);
  }
  const runSim = () => {
    addSeeSaw(randomXLeft, randomMassLeft, randomXRight, massRight, false);
  }
  const checkAnswer = (userAnswer) => {
    if(userAnswer<(massRight*1000)+10&&userAnswer>(massRight*1000)-10){
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
    }
    else{
      runSim();
      toast.error('That was wrong, try again!', {
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
  }

  const resetWorld = (refresh) => {
    const cw = 800;
    const ch = 650;
    if(refresh) {
        setMeasurements(true);
  }
  else{
      setMeasurements(false);
  }

    
}

  const addSeeSaw = (xLeft, mLeft, xRight, mRight, freeze) => {
    if(freeze){
    var group = Body.nextGroup(true);
    var catapult =  Bodies.rectangle(400, 520, 320, 20,{ collisionFilter: { group: group } });
    var rectangle1 = Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true, render: { fillStyle: '#060a19' } });
    var rectangle2 = Bodies.rectangle(400, 535, 20, 80, { isStatic: true, collisionFilter: { group: group }, render: { fillStyle: '#060a19' } });
    var massLeft = Bodies.rectangle(xLeft, 485, 50,50,{ isStatic: true, mass: mLeft});
    var massRight = Bodies.rectangle(xRight, 485, 50,50,{ isStatic: true, mass: mRight});
    var constraint =  Constraint.create({ 
        bodyA: catapult, 
        pointB: Vector.clone(catapult.position),
        stiffness: 1,
        length: 0
    });
    World.add(engine.current.world, [massLeft, massRight, constraint, catapult, group,rectangle1, rectangle2]);
  }
  else{
    
    var group = Body.nextGroup(true);
    var catapult =  Bodies.rectangle(400, 520, 320, 20,{ collisionFilter: { group: group } });
    var rectangle1 = Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true, render: { fillStyle: '#060a19' } });
    var rectangle2 = Bodies.rectangle(400, 535, 20, 80, { isStatic: true, collisionFilter: { group: group }, render: { fillStyle: '#060a19' } });
    var massLeft = Bodies.rectangle(xLeft, 485, 50,50,{ isStatic: false, mass: mLeft});
    var massRight = Bodies.rectangle(xRight, 485, 50,50,{ isStatic: false, mass: mRight});
    var constraint =  Constraint.create({ 
        bodyA: catapult, 
        pointB: Vector.clone(catapult.position),
        stiffness: 1,
        length: 0
    });
    World.add(engine.current.world, [massLeft, massRight, constraint, catapult, group,rectangle1, rectangle2]);
  }
  
  }

  /*
const addSeeSaw = (xLeft, mLeft, xRight, mRight, freeze) => {
    if(freeze){
    var group = Body.nextGroup(true);
    var catapult =  Bodies.rectangle(400, 520, 320, 20,{ collisionFilter: { group: group } });
    var rectangle1 = Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true, render: { fillStyle: '#060a19' } });
    var rectangle2 = Bodies.rectangle(400, 535, 20, 80, { isStatic: true, collisionFilter: { group: group }, render: { fillStyle: '#060a19' } });
    var massLeft = Bodies.rectangle(xLeft, 485, 50,50,{ isStatic: false, mass: mLeft});
    var massRight = Bodies.rectangle(xRight, 485, 50,50,{ isStatic: false, mass: mRight});
    var constraint =  Constraint.create({ 
        bodyA: catapult, 
        pointB: Vector.clone(catapult.position),
        stiffness: 1,
        length: 0
    });
    World.add(engine.current.world, [massLeft, massRight, constraint, catapult, group,rectangle1, rectangle2]);
  }
  else{

  }
  */

  return (
    <div className='bg-black justify-center items-center flex flex-col min-h-screen'>
        <Navbar />

        <div className='my-10 w-[85%]'>
            <h1 className='text-2xl font-montserrat text-white'> <u>The Seesaw Problem</u> </h1>
            <p className='text-lg font-montserrat text-white pt-5'>
               
                The leftmost cube weighs <u>{Math.floor(randomMassLeft*1000)} g</u> and <u>{400-randomXLeft} cm</u> away from the pivot of the Seesaw. <br /> <br />
                
                If the rightmost cube is <u>{randomXRight-400} cm</u> away from the pivot how much should it weigh to balance the seesaw?
            </p>
            <h3 className='font-montserrat text-white pt-10'><u>Note:</u> round to the nearest whole number!</h3>
        </div>

        <div className='flex justify-between w-[85%] gap-10'>
            <div className='w-full justify-around flex flex-col'>
                <div className='flex flex-col items-start justify-start w-[80%]'>
                    <h2 className='text-2xl font-montserrat text-white' id='userAnswer'><u>Enter your answer here:</u></h2> 
                    <label>
                    <input type="number" name="name" value={userInput} onChange={(e) => setUserInput(e.target.value)} /> <span className='text-lg font-montserrat text-white pt-5'>g</span>
                    </label>  
                </div>

                <div className='w-full py-5 flex justify-start gap-5'>
                    <button onClick={() => checkAnswer(userInput)} className='text-black text-2xl bg-white py-2 px-3 rounded-md font-montserrat hover:bg-green-500 hover:text-white duration-300'>Test</button>
                    <button onClick={() => resetWorld(false)} className='text-black text-2xl bg-white py-2 px-3 rounded-md font-montserrat hover:bg-blue-600 hover:text-white duration-300'>Reset Simulation</button>
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
      
    </div>
)

}