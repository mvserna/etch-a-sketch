
const canvas = document.getElementById('canvas');
const resetButton = document.getElementById('button-reset');
const grayscaleButton = document.getElementById('button-grayscale');
const rainbowButton = document.getElementById('button-rainbow');
const polychromaticButton = document.getElementById('button-polychromatic');
let paintColor = "grayscale";


function paint(e) {
  let targetLightness = e.target.getAttribute('data-lightness');
  let targetHue = e.target.getAttribute('data-hue');
  e.target.style.backgroundColor = `hsl(${targetHue}, 100%, ${targetLightness}%)`;
  e.target.setAttribute('data-lightness', `${targetLightness - 10}`)
}

function drawGrid(dimension) {
  while (canvas.lastElementChild) {
    canvas.removeChild(canvas.lastElementChild);
  }
  
  for ( i=0 ; i < (dimension*dimension) ; i++) {
    let randomHue = Math.random() * 360;
    let newDiv = document.createElement('div');
    newDiv.setAttribute('data-lightness', '100');
    newDiv.setAttribute('data-hue', `${randomHue}`)
    newDiv.style.backgroundColor = 'lightgray';
    canvas.appendChild(newDiv);
  }

  canvas.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${dimension}, 1fr)`;
  let gridDivs = canvas.querySelectorAll('div');
  for ( i = 0; i < gridDivs.length; i++) {
    gridDivs[i].addEventListener('mouseover', 
      paint );
  }
  return;
}



resetButton.addEventListener('click', () => {
  let response = prompt('How many pixels per side? (100 max)');
  if (response > 100) return
  drawGrid(response)
});

drawGrid(16);