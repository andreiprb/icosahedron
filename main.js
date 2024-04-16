let triangleWidth = 100
let sqrt3 = 1.732
let tilt = 52.62
let capHeight = -1.051 * triangleWidth
let triangleHeight = triangleWidth * sqrt3
let vShift = capHeight + triangleHeight / 2

let $innerRadius = 1.376 * triangleWidth
let outerRadius = 1.701 * triangleWidth
let sideTilt = 10.81
let sideHeight = outerRadius
let vShift2 = sideHeight + triangleHeight - vShift
let opacity = 0.5

let currentColor = "random"
let count = 0
let poleLimit = 85
let xRotation = 0
let yRotation = 0
let isDragging = false

renderShape()
renderColor(currentColor)
renderShadow(xRotation)
initializeControls()
initializeMenu()
initializeInfoAlert()
noActivity()

function renderShape () {
    for (i=1; i<=5; i++) {
        let vShift2 = vShift
        document.getElementById(`face${i}`).style.transform = `translateY(${vShift2}px) rotateY(${i * 72}deg) rotateX(${tilt}deg)` 
    }
    for (i=6; i<=10; i++) {
        document.getElementById(`face${i}`).style.transform = `translateY(${vShift2}px) rotateY(${i * 72 + 36}deg) rotateX(${180 - tilt}deg)`
    }
    for (i=11; i<=15; i++) {
        document.getElementById(`face${i}`).style.transform = `translateY(${triangleHeight / 2}px) rotateY(${i * 72 + 36}deg) translateZ(${outerRadius}px) rotateX(${-sideTilt}deg)`
    }
    for (i=16; i<=20; i++) {
        document.getElementById(`face${i}`).style.transform = `translateY(${triangleHeight / 2 + sideHeight}px) rotateY(${i * 72}deg) rotateZ(180deg) translateZ(${outerRadius}px) rotateX(${-sideTilt}deg)`
    }
}

function renderColor (color) {
        if (color == "random") {
            for (i=1; i<=20; i++) {
                document.getElementById(`face${i}`).style.borderBottomColor = `rgb(${Math.floor((Math.random() * 255) + 1)}, ${Math.floor((Math.random() * 255) + 1)}, ${Math.floor((Math.random() * 255) + 1)})`
                document.getElementById(`face${i}`).style.opacity = opacity - .1
            }
        } else {
            count--
            if (count < 0) count = 4
            for (i=1; i<=5; i++) {
                document.getElementById(`face${i}`).style.borderBottomColor = color
                document.getElementById(`face${i}`).style.opacity = opacity - (i+count)%5/10
            }
            for (i=6; i<=10; i++) {
                document.getElementById(`face${i}`).style.borderBottomColor = color
                document.getElementById(`face${i}`).style.opacity = opacity - (i+count)%5/10
            }
            for (i=11; i<=15; i++) {
                document.getElementById(`face${i}`).style.borderBottomColor = color
                document.getElementById(`face${i}`).style.opacity = opacity - (i+count)%5/10
            }
            for (i=16; i<=20; i++) {
                document.getElementById(`face${i}`).style.borderBottomColor = color
                document.getElementById(`face${i}`).style.opacity = opacity - (i+count)%5/10
            }
        }
    if (currentColor != color) currentColor = color
}

function renderShadow (xRotation) {
    document.getElementsByClassName("shadow")[0].style.transform = `rotateX(${xRotation + poleLimit}deg) translateZ(-300px)`
    if (xRotation + poleLimit > 90) document.getElementsByClassName("shadow")[0].style.visibility = `hidden`
    else document.getElementsByClassName("shadow")[0].style.visibility = `visible`
}

function initializeControls () {
    document.getElementsByClassName("menu")[0].addEventListener("mouseover", () => isDragging = true)
    document.getElementsByClassName("menu")[0].addEventListener("mouseout", () => isDragging = false)
    document.addEventListener("mouseup", () => {
        noActivity()
        document.removeEventListener("mousemove", dragLoop)
        document.getElementsByTagName("html")[0].style.cursor = `grab`
        document.getElementsByTagName("body")[0].style.cursor = `grab`
        document.getElementsByClassName("menu")[0].style.cursor = `pointer`
        isDragging = !isDragging
    })
    document.addEventListener("mousedown", (event) => {
        if (event.button == 0 && !isDragging) {
            isDragging = !isDragging
            document.getElementsByTagName("html")[0].style.cursor = `grabbing`
            document.getElementsByTagName("body")[0].style.cursor = `grabbing`
            document.getElementsByClassName("menu")[0].style.cursor = `grabbing`
            x = event.pageY
            y = event.pageX
            document.addEventListener("mousemove", dragLoop = (event) => {
                xRotation += (x - event.pageY) / 4
                yRotation -= (y - event.pageX) / 4
                if (xRotation >= poleLimit || xRotation <= -poleLimit) {
                    xRotation = Math.sign(xRotation) * poleLimit
                } else {
                    x = event.pageY
                }
                if (Math.abs(yRotation) >= 360) yRotation -= 360 * Math.sign(yRotation)
                y = event.pageX
                document.getElementsByClassName("icosahedron")[0].style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`
                renderShadow(xRotation, yRotation)
            })
        }
        clearTimeout(timeout); clearInterval(interval)
    })
}

function noActivity() {
    timeout = setTimeout(() => {
        interval = setInterval(() => {
            renderColor(currentColor)
        }, 1000);
    }, 5000)
}
