const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionMap = []
for (let i = 0; i < collisions.length; i+=70){
    collisionMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    static width = 66
    static heigth = 66

    constructor({position}){
        this.position = position
        this.width = 66
        this.height = 66
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: -540,
    y: -570
}

collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025){
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.heigth + offset.y
                }
            }))
        }
    })
})

const image = new Image()
image.src = './assets/map.png'

const playerImage = new Image()
playerImage.src = './assets/playerDown.png'

image.onload = () => {
    c.drawImage(image, -540,-570 )
}


class Sprite {
    constructor({position, velocity, image, frames = {max: 1}}) {
        this.position = position
        this.image = image
        this.frames = frames
    }
    
    draw() {
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height, 
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
            )
    }
}

const player = new Sprite({
    position: {
        x: canvas.width/2 - 192/4/2,
        y: canvas.height/2 - 68/2,
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
    
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const testBoundary = new Boundary({
    position: {
        x: 400,
        y: 400
    }
})

const movables = [background, testBoundary]

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    // boundaries.forEach((boundary) => {
    //     boundary.draw()
    // })
    testBoundary.draw()
    player.draw()
    

    if (keys.w.pressed && lastKey === 'w') {
        movables.forEach((element) => {
            element.position.y += 2
        })
    } else if (keys.s.pressed && lastKey === 's') {
        movables.forEach((element) => {
            element.position.y -= 2
        })
    } else if (keys.a.pressed && lastKey === 'a') {
        movables.forEach((element) => {
            element.position.x += 2
        })
    } else if (keys.d.pressed && lastKey === 'd') {
        movables.forEach((element) => {
            element.position.x -= 2
        })
    }
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
  
    switch (e.key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})