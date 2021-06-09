
const canvas = document.getElementById('canvas');
const resetButton = document.getElementById('button-reset');
const grayscaleButton = document.getElementById('button-grayscale');
const rainbowButton = document.getElementById('button-rainbow');
const polychromaticButton = document.getElementById('button-polychromatic');
let paintColor = "grayscale";

function resetGrid() {
  while (canvas.lastElementChild) {
    canvas.removeChild(canvas.lastElementChild);
  }
  return
}

function populateGrid(dimension) {
  for ( i=0 ; i < (dimension*dimension) ; i++) {
    let randomHue = Math.random() * 360;
    let newDiv = document.createElement('div');
    newDiv.setAttribute('data-lightness', '100');
    newDiv.setAttribute('data-hue', `${randomHue}`)
    newDiv.style.backgroundColor = 'lightgray';
    canvas.appendChild(newDiv);
  }
  return;
}

function paint(e) {
  let targetLightness = e.target.getAttribute('data-lightness');
  let targetHue = e.target.getAttribute('data-hue');
  e.target.style.backgroundColor = `hsl(${targetHue}, 100%, ${targetLightness}%)`;
  e.target.setAttribute('data-lightness', `${targetLightness - 10}`)
}

function sizeGrid(dimension) {
  canvas.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${dimension}, 1fr)`;
  let gridDivs = canvas.querySelectorAll('div');
  for ( i = 0; i < gridDivs.length; i++) {
    gridDivs[i].addEventListener('mouseover', 
      paint );
  }
  return;
}

grayscaleButton.addEventListener('click', () => {
  return paintColor = 'grayscale';
})

rainbowButton.addEventListener('click', () => {
  return paintColor = 'rainbow';
})

polychromaticButton.addEventListener('click', () => {
  return paintColor = 'polychromatic';
})


resetButton.addEventListener('click', () => {
  let response = prompt('How many pixels per side? (100 max)');
  if (response > 100) return
  drawGrid(response)
});

function drawGrid(dimension) {
  resetGrid();
  populateGrid(dimension);
  sizeGrid(dimension);
  return;
}

drawGrid(16);