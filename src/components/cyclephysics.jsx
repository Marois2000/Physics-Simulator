import React from "react";
import Matter from 'matter-js';
import { useEffect, useRef, useState } from 'react'


export const CyclePhysics = () => {
    let Engine = Matter.Engine,
        Events = Matter.Events,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Bodies = Matter.Bodies,
        Vector = Matter.Vector,
        World = Matter.World,
        Common = Matter.Common;

    const scene = useRef();
    const engine = useRef(Engine.create());
    const [currentView, setCurrentView] = useState(0);
    const amountOfScenes = 4;
    const [viewWidth, setWidth] = useState(600);
    const [viewHeight, setHeight] = useState(400);
    
    //Credits to https://github.com/liabru/matter-js/blob/master/examples/doublePendulum.js
    const doublePendulum = () => {
        // create engine
        var engine = Engine.create(),
            world = engine.world;

        // create renderer
        var render = Render.create({
            element: scene.current,
            engine: engine,
            options: {
                width: viewWidth,
                height: viewHeight,
                wireframes: false
            }
        });

        Render.run(render);

        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);

        // add bodies
        var group = Body.nextGroup(true),
            length = 200,
            width = 25;
            
        var pendulum = Composites.stack(350, 160, 2, 1, -20, 0, function(x, y) {
            return Bodies.rectangle(x, y, length, width, { 
                collisionFilter: { group: group },
                frictionAir: 0,
                chamfer: 5,
                render: {
                    fillStyle: 'transparent',
                    lineWidth: 1
                }
            });
        });

        engine.gravity.scale = 0.002;
        
        Composites.chain(pendulum, 0.45, 0, -0.45, 0, { 
            stiffness: 0.9, 
            length: 0,
            angularStiffness: 0.7,
            render: {
                strokeStyle: '#4a485b'
            }
        });
        
        Composite.add(pendulum, Constraint.create({ 
            bodyB: pendulum.bodies[0],
            pointB: { x: -length * 0.42, y: 0 },
            pointA: { x: pendulum.bodies[0].position.x - length * 0.42, y: pendulum.bodies[0].position.y },
            stiffness: 0.9,
            length: 0,
            render: {
                strokeStyle: '#4a485b'
            }
        }));

        var lowerArm = pendulum.bodies[1];

        Body.rotate(lowerArm, -Math.PI * 0.3, {
            x: lowerArm.position.x - 100,
            y: lowerArm.position.y
        });
        
        Composite.add(world, pendulum);

        var trail = [];

        Events.on(render, 'afterRender', function() {
            trail.unshift({
                position: Vector.clone(lowerArm.position),
                speed: lowerArm.speed
            });

            Render.startViewTransform(render);
            render.context.globalAlpha = 0.7;

            for (var i = 0; i < trail.length; i += 1) {
                var point = trail[i].position,
                    speed = trail[i].speed;
                
                var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
                render.context.fillStyle = 'hsl(' + hue + ', 100%, 55%)';
                render.context.fillRect(point.x, point.y, 2, 2);
            }

            render.context.globalAlpha = 1;
            Render.endViewTransform(render);

            if (trail.length > 2000) {
                trail.pop();
            }
        });

        // add mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        Composite.add(world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;

        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 700, y: 600 }
        });

        // context for MatterTools.Demo
        return {
            engine: engine,
            runner: runner,
            render: render,
            canvas: render.canvas,
            stop: function() {
                Matter.Render.stop(render);
                Matter.Runner.stop(runner);
            }
        };
    };

    //Credits to https://github.com/liabru/matter-js/blob/master/examples/chains.js
    const chains = () => {
        // create engine
        var engine = Engine.create(),
            world = engine.world;
    
        // create renderer
        var render = Render.create({
            element: scene.current,
            engine: engine,
            options: {
                width: viewWidth,
                height: viewHeight,
                showAngleIndicator: true,
                showCollisions: true,
                showVelocity: true
            }
        });
    
        Render.run(render);
    
        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);
    
        // add bodies
        var group = Body.nextGroup(true);
            
        var ropeA = Composites.stack(100, 50, 8, 1, 10, 10, function(x, y) {
            return Bodies.rectangle(x, y, 50, 20, { collisionFilter: { group: group } });
        });
        
        Composites.chain(ropeA, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2, render: { type: 'line' } });
        Composite.add(ropeA, Constraint.create({ 
            bodyB: ropeA.bodies[0],
            pointB: { x: -25, y: 0 },
            pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
            stiffness: 0.5
        }));
        
        group = Body.nextGroup(true);
        
        var ropeB = Composites.stack(350, 50, 10, 1, 10, 10, function(x, y) {
            return Bodies.circle(x, y, 20, { collisionFilter: { group: group } });
        });
        
        Composites.chain(ropeB, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2, render: { type: 'line' } });
        Composite.add(ropeB, Constraint.create({ 
            bodyB: ropeB.bodies[0],
            pointB: { x: -20, y: 0 },
            pointA: { x: ropeB.bodies[0].position.x, y: ropeB.bodies[0].position.y },
            stiffness: 0.5
        }));
        
        group = Body.nextGroup(true);
    
        var ropeC = Composites.stack(600, 50, 13, 1, 10, 10, function(x, y) {
            return Bodies.rectangle(x - 20, y, 50, 20, { collisionFilter: { group: group }, chamfer: 5 });
        });
        
        Composites.chain(ropeC, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });
        Composite.add(ropeC, Constraint.create({ 
            bodyB: ropeC.bodies[0],
            pointB: { x: -20, y: 0 },
            pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
            stiffness: 0.5
        }));
        
        Composite.add(world, [
            ropeA,
            ropeB,
            ropeC,
            Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true })
        ]);
    
        // add mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });
    
        Composite.add(world, mouseConstraint);
    
        // keep the mouse in sync with rendering
        render.mouse = mouse;
    
        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 700, y: 600 }
        });
    
        // context for MatterTools.Demo
        return {
            engine: engine,
            runner: runner,
            render: render,
            canvas: render.canvas,
            stop: function() {
                Matter.Render.stop(render);
                Matter.Runner.stop(runner);
            }
        };
    }

    const rolling = () => {
        // create engine
        var engine = Engine.create(),
        world = engine.world;

        // create renderer
        var render = Render.create({
            element: scene.current,
            engine: engine,
            options: {
                width: viewWidth,
                height: viewHeight,
                showAngleIndicator: true
            }
        });

        Render.run(render);

        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);

        // add bodies
        var stack = Composites.stack(20, 20, 20, 5, 0, 0, function(x, y) {
            return Bodies.circle(x, y, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 });
        });

        Composite.add(world, stack);

        Composite.add(world, [
            Bodies.rectangle(200, 150, 700, 20, { isStatic: true, angle: Math.PI * 0.06, render: { fillStyle: '#060a19' } }),
            Bodies.rectangle(500, 350, 700, 20, { isStatic: true, angle: -Math.PI * 0.06, render: { fillStyle: '#060a19' } }),
            Bodies.rectangle(340, 580, 700, 20, { isStatic: true, angle: Math.PI * 0.04, render: { fillStyle: '#060a19' } })
        ]);

        // add mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        Composite.add(world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;

        // fit the render viewport to the scene
        Render.lookAt(render, Composite.allBodies(world));

        // wrapping using matter-wrap plugin
        for (var i = 0; i < stack.bodies.length; i += 1) {
            stack.bodies[i].plugin.wrap = {
                min: { x: render.bounds.min.x, y: render.bounds.min.y },
                max: { x: render.bounds.max.x, y: render.bounds.max.y }
            };
        }


        // context for MatterTools.Demo
        return {
            engine: engine,
            runner: runner,
            render: render,
            canvas: render.canvas,
            stop: function() {
                Matter.Render.stop(render);
                Matter.Runner.stop(runner);
            }
        };
    }

    const wreckingBall = () => {
        // create engine
        var engine = Engine.create(),
        world = engine.world;

        // create renderer
        var render = Render.create({
            element: scene.current,
            engine: engine,
            options: {
                width: viewWidth,
                height: viewHeight,
                showAngleIndicator: true
            }
        });

        Render.run(render);

        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);

        // add bodies
        var rows = 10,
            yy = 600 - 25 - 40 * rows;

        var stack = Composites.stack(400, yy, 5, rows, 0, 0, function(x, y) {
            return Bodies.rectangle(x, y, 40, 40);
        });

        Composite.add(world, [
            stack,
            // walls
            Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
            Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
            Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
            Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
        ]);

        var ball = Bodies.circle(100, 400, 50, { density: 0.04, frictionAir: 0.005});

        Composite.add(world, ball);
        Composite.add(world, Constraint.create({
            pointA: { x: 300, y: 100 },
            bodyB: ball
        }));

        // add mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        Composite.add(world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;

        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 800, y: 600 }
        });

        // context for MatterTools.Demo
        return {
            engine: engine,
            runner: runner,
            render: render,
            canvas: render.canvas,
            stop: function() {
                Matter.Render.stop(render);
                Matter.Runner.stop(runner);
            }
        };
    }

    useEffect(() => {
        if(currentView == 0) {
           let render = doublePendulum().render;
           return () => {
                Render.stop(render)
                World.clear(engine.current.world)
                Engine.clear(engine.current)
                render.canvas.remove()
                render.canvas = null
                render.context = null
                render.textures = {}
            }
        } else if (currentView == 1) {
            let render = chains().render;
            return () => {
                 Render.stop(render)
                 World.clear(engine.current.world)
                 Engine.clear(engine.current)
                 render.canvas.remove()
                 render.canvas = null
                 render.context = null
                 render.textures = {}
             }
        } else if (currentView == 2) {
            let render = rolling().render;
            return () => {
                 Render.stop(render)
                 World.clear(engine.current.world)
                 Engine.clear(engine.current)
                 render.canvas.remove()
                 render.canvas = null
                 render.context = null
                 render.textures = {}
             }
        } else if (currentView == 3) {
            let render = wreckingBall().render;
            return () => {
                 Render.stop(render)
                 World.clear(engine.current.world)
                 Engine.clear(engine.current)
                 render.canvas.remove()
                 render.canvas = null
                 render.context = null
                 render.textures = {}
             }
        }
        
        
    }, [currentView])

    useEffect(() => {
        setTimeout(() => {
            setCurrentView((currentView + 1) % amountOfScenes);
            console.log(currentView);
        }, 5000);
    })


    return (
        <div className='w-full justify-end flex'>
            <div className='border-4 border-color-white h-fit rounded-lg'>
                <div ref={scene} />
            </div>
        </div>
    )
}