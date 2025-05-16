const {Engine, Runner, Composite, Bodies} = Matter
const {Mouse, MouseConstraint, Constraint} = Matter

let engine, runner, mouse

let crl1, crl2, crl3
let cn1o, cn1q, cn2o, cn2q
let rct1, rct2
let x
function setup() {
  const canvas = createCanvas(600, 600)
  canvas.parent("canvas-p5")
  canvas.addClass("canvas-p5")
  canvas.elt.style = ""

  engine = Engine.create()
  engine.constraintIterations = 50
  engine.gravity.scale = 0.001
  runner = Runner.create()

  const mouseCanvas = Mouse.create(canvas.elt)
  mouseCanvas.pixelRatio = pixelDensity()
  mouse = MouseConstraint.create(engine, {
    mouse: mouseCanvas,
    constraint: {
      stiffness: 0.2
    }
  })

  crl1 = new Circle(width / 2, height / 2, 2, {
    isStatic: true,
    isSensor: true
  })
  crl2 = new Circle(width / 2 - 100, height / 2 + 100, 2, {
    isSensor: true
  })
  crl3 = new Circle(width / 2 + 100, height / 2 - 100, 2, {
    isSensor: true
  })

  x = Math.random() * 400 - 200

  rct1 = new Rect((width / 2) + x, (height / 2) + x, 160, 30, {
    isSensor: true,
    frictionAir: 0,
    color: "#273f4f"
  })
  rct2 = new Rect((width / 2) + x + 50, (height / 2) + x + 50, 160, 30, {
    frictionAir: 0,
    color: "#fe7743"
  })

  cn1o = createConstraint({
    bodyA: crl1.body,
    bodyB: rct1.body,
    pointB: {
      x: -rct1.width / 2 + 10,
      y: 0
    },
    stiffness: 0.9,
    length: 0
  })
  cn1q = createConstraint({
    bodyA: crl2.body,
    bodyB: rct1.body,
    pointB: {
      x: rct1.width / 2 - 10,
      y: 0
    },
    stiffness: 0.9,
    length: 0
  })
  cn2o = createConstraint({
    bodyA: crl2.body,
    bodyB: rct2.body,
    pointB: {
      x: -rct2.width / 2 + 10,
      y: 0
    },
    stiffness: 0.9,
    length: 0
  })
  cn2q = createConstraint({
    bodyA: crl3.body,
    bodyB: rct2.body,
    pointB: {
      x: rct2.width / 2 - 10,
      y: 0
    },
    length: 0
  })


  Composite.add(engine.world, [mouse])
  Runner.run(runner, engine)
}

function draw() {
  background(color("#ffffff"))

  rct1.draw()
  crl1.draw()
  rct2.draw()
  crl2.draw()
  crl3.draw()

}

class Circle {
  /**@param {Matter.IBodyDefinition} options*/
  constructor(x, y, radius, options = {}) {
    this.radius = radius
    this.body = Bodies.circle(x, y, this.radius, options)

    Composite.add(engine.world, this.body)
  }

  draw() {
    push()
    translate(this.body.position.x, this.body.position.y)
    strokeWeight(0.5)
    fill(0)
    circle(0, 0, this.radius * 2)
    pop()
  }
}

class Rect {
  /**@param {Matter.IBodyDefinition} options*/
  constructor(x, y, width, height, options = {}) {
    this.width = width
    this.height = height
    this.color = options.color || "#ffffff"
    this.body = Bodies.rectangle(x, y, this.width, this.height, options)

    Composite.add(engine.world, this.body)
  }

  draw() {
    push()
    translate(this.body.position.x, this.body.position.y)
    rectMode("center")

    rotate(this.body.angle)
    strokeWeight(0.5)
    fill(color(this.color))
    rect(0, 0, this.width, this.height, 10)

    pop()
  }
}

/**@param {Matter.IConstraintDefinition} options*/
function createConstraint(options = {}) {
  const constraint = Constraint.create(options)
  Composite.add(engine.world, constraint)

  return constraint
}
