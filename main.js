
const canvas = document.getElementById('canvas');
const button = document.getElementById('button');

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
      (e) => e.target.style.backgroundColor = 'black' );
  }
  return;
}

button.addEventListener('click', () => {
  drawGrid( prompt('How many pixels per side?') );
});

drawGrid(16);