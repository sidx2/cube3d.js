// get the canvas and create canvas context
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

// Set the canvas height and width to width of the window
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Create a instance of Cube3d class
// Cube3d(positionX, positionY, sidelength, ctx, lineColor)
const cube = new Cube3d(canvas.width / 2, canvas.height / 2, 150, ctx, "white"); // middle of the canvas

// Create the drawing loop (game-loop)
const loop = () => {
    // clear the canvas before making another draw call
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // just rotate the cube in all 3 dimensions
    cube.rotateX(0.01);
    cube.rotateY(0.01);
    cube.rotateZ(0.01);

    cube.draw(); // finally make a draw call

    window.requestAnimationFrame(loop); // Call the loop at sceen FPS
}

loop(); // start the loop