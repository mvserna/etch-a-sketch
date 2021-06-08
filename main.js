
const canvas = document.getElementById('canvas');


function drawGrid(dimension) {
  for ( i=0 ; i < (dimension*dimension) ; i++) {
    let newDiv = document.createElement('div');
    newDiv.style.backgroundColor = 'lightblue';
    canvas.appendChild(newDiv);
    canvas.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${dimension}, 1fr)`;
  }
  return;
}

