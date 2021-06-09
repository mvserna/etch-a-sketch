
const canvas = document.getElementById('canvas');
const button = document.getElementById('button');
let lightness = 100; 

function paint(e) {
  let randomHue = Math.random() * 360;
  e.target.style.backgroundColor = `hsl(${randomHue}, 100%, ${lightness-10}%)`;
  lightness -= 10;
}

function drawGrid(dimension) {
  while (canvas.lastElementChild) {
    canvas.removeChild(canvas.lastElementChild);
  }
  
  for ( i=0 ; i < (dimension*dimension) ; i++) {
    let newDiv = document.createElement('div');
    newDiv.style.backgroundColor = 'lightblue';
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



button.addEventListener('click', () => {
  let response = prompt('How many pixels per side? (100 max)');
  if (response > 100) return
  drawGrid(response)
});

drawGrid(16);