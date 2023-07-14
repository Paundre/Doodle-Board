/* Variables */
var rows = 30;
var columns = 40;
let currentMode = "black";

let rainbowPalette = ['#ed7ba7', '#f79b4f', '#f7e76a', '#96eb8d', '#8db2eb', '#c88deb'];

let mouseDown = 0;
document.body.onmousedown = () => mouseDown = 1;
document.body.onmouseup = () => mouseDown = 0;


/* Appending to DOM */
let gridContainer = document.getElementById("gridContainer");
let rainbowBtn = document.getElementsByClassName("overlayBtn1")[0];
let blackBtn = document.getElementsByClassName("overlayBtn2")[0];
let clearBtn = document.getElementsByClassName("overlayBtn3") [0];
let eraseBtn = document.getElementsByClassName("overlayBtn4")[0];
let slider = document.getElementById("slider");
let sliderText = document.getElementsByClassName("value")[0];

let sliderValue = document.getElementById("color");
let newColor = document.getElementById('color').value;

/* Grid */

// Function to generate the grid //
function generateGrid() {

// Clear the existing grid
gridContainer.innerHTML = '';

// Calculate the size of each grid cell based on the grid container dimensions
const containerWidth = gridContainer.offsetWidth;
const containerHeight = gridContainer.offsetHeight;
const cellWidth = containerWidth / columns;
const cellHeight = containerHeight / rows;

// Create the grid using nested loops
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // Create a new grid cell
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");

      // Set the position and size of the grid cell
      cell.style.position = "absolute";
      cell.style.left = `${j * cellWidth}px`;
      cell.style.top = `${i * cellHeight}px`;
      cell.style.width = `${cellWidth}px`;
      cell.style.height = `${cellHeight}px`;

      // Add the grid cell to the grid container
      gridContainer.appendChild(cell);

       // Start Coloring //
       cell.addEventListener('mouseover', function() {
        if (mouseDown) {
          if (currentMode === "black") {
            cell.style.backgroundColor = "black";
          } else if (currentMode === "rainbow") {
            const randomRainbow = Math.floor(Math.random() * rainbowPalette.length);
            cell.style.backgroundColor = rainbowPalette[randomRainbow];
          } else if (currentMode === "erase") {
            cell.style.backgroundColor = "lightgray";
          } else if (currentMode === "picker") {
            cell.style.backgroundColor = newColor;
          }
        } 
      });
    }
  }
}

generateGrid();

/* Toggle Modes */
rainbowBtn.addEventListener('click', function() {
  currentMode = "rainbow";
});

blackBtn.addEventListener('click', function() {
  currentMode = "black";
});

eraseBtn.addEventListener('click', function() {
    currentMode = "erase";
  });



/* Clear button */
clearBtn.addEventListener('click', function () {
    // Get all the grid cells
    const cells = document.getElementsByClassName('grid-cell');
  
    // Loop through each cell and set the background color to "light-gray"
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "lightgray";
    }
  });

/* Color Picker */
sliderValue.addEventListener('input', function(){
    currentMode = "picker";
    newColor = sliderValue.value;  
});


/* Grid sizing */
slider.addEventListener("input", function() {
    const value = slider.value;
    

    if (value === "3") {
      text = "small";
      rows = 20;
      columns = 30;
    } else if (value === "1") {
      text = "large";
      rows = 40;
      columns = 50;
    } else if (value === "2") {
        text= "medium"
        rows = 30;
        columns = 40;
    }
  
    sliderText.textContent = text;

/* Regenerate the grid with new size */
  generateGrid();
  });



