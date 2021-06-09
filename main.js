
const canvas = document.getElementById('canvas');
const resetButton = document.getElementById('button-reset');
const grayscaleButton = document.getElementById('button-grayscale');
const rainbowButton = document.getElementById('button-rainbow');
const polychromaticButton = document.getElementById('button-polychromatic');
let paintColor = "grayscale";
let rainbowCounter = 0;
let rainbowArray = [];




function resetGrid() {
  while (canvas.lastElementChild) {
    canvas.removeChild(canvas.lastElementChild);
  }
  return
}

function generateRainbowArray(dimension) {
  for ( i = 0; i < (dimension*dimension); i++) {
    rainbowArray.push( i * ( 360 / (dimension*dimension) ) )
  }
}

function populateGrid(dimension) {
  for ( i=0 ; i < (dimension*dimension) ; i++) {
    let randomHue = Math.random() * 360;
    let newDiv = document.createElement('div');
    newDiv.setAttribute('data-random-hue', `${randomHue}`);
    newDiv.setAttribute('data-lightness', '100');
    newDiv.setAttribute('data-rainbow-hue', 'none')
    newDiv.style.backgroundColor = 'lightgray';
    canvas.appendChild(newDiv);
  }
  return;
}

function paint(e) {
  let randomHue = e.target.getAttribute('data-random-hue');
  let rainbowHue = e.target.getAttribute('data-rainbow-hue');
  let targetHue = 0;
  let targetSaturation = 100
  let targetLightness = e.target.getAttribute('data-lightness');
  if ( paintColor === 'grayscale' ) { targetSaturation = 0; }
  if ( paintColor === 'rainbow' ) {
    if ( rainbowHue === 'none' ) {
      rainbowHue = rainbowArray[rainbowCounter]
      e.target.setAttribute('data-rainbow-hue', `${rainbowHue}`)
      rainbowCounter++
    }
    targetHue = rainbowHue
  }
  if ( paintColor === 'polychromatic' ) { targetHue = randomHue }
  e.target.style.backgroundColor = `hsl(${targetHue}, ${targetSaturation}%, ${targetLightness}%)`;
  
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
  generateRainbowArray(dimension);
  populateGrid(dimension);
  sizeGrid(dimension);
  return;
}

drawGrid(16);