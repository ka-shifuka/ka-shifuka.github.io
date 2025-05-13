const {Engine, Runner, Composite, Bodies} = Matter
const {Mouse, MouseConstraint, Constraint} = Matter

let engine, runner, mouse, circles = [], connected1, connected2

function setup() {
  const canvas = createCanvas(600, 600)
  canvas.parent("canvas-p5")
  canvas.addClass("canvas-p5")
  canvas.elt.style = ""

  engine = Engine.create()
  runner = Runner.create()

  const mouseCanvas = Mouse.create(canvas.elt)
  mouseCanvas.pixelRatio = pixelDensity()
  mouse = MouseConstraint.create(engine, {
    mouse: mouseCanvas,
    constraint: {
      stiffness: 0.8
    }
  })

  circles.push(new Circle(300, 300, 20, {isStatic: true}))
  circles.push(new Circle(300, 100, 20))
  circles.push(new Circle(200, 200, 20))

  connected1 = Constraint.create({
    bodyA: circles[0].body,
    bodyB: circles[1].body,
    length: 130
  })
  connected2 = Constraint.create({
    bodyA: circles[1].body,
    bodyB: circles[2].body,
    length: 130
  })

  Composite.add(engine.world, [mouse, connected1, connected2])
  Runner.run(runner, engine)
}

function draw() {
  background(color("#ffffff"))
  lines()

  for (let cirs of circles) {
    cirs.draw()
  }
}

function lines() {
  const a = circles[0].body.position
  const b = circles[1].body.position
  const c = circles[2].body.position

  line(a.x, a.y, b.x, b.y)
  line(b.x, b.y, c.x, c.y)

}

class Circle {
  /**@type {Matter.IBodyDefinition} options*/
  constructor(x, y, radius, options = {}) {
    this.radius = radius
    this.body = Bodies.circle(x, y, this.radius, options)

    Composite.add(engine.world, this.body)
  }

  draw() {
    push()
    translate(this.body.position.x, this.body.position.y)
    strokeWeight(1)
    circle(0, 0, this.radius * 2)
    pop()
  }
}
