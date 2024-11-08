document.querySelector("#matrixForm").addEventListener("submit", function (e) {

  e.preventDefault();
  const rows = parseInt(document.querySelector("#enterRow").value);
  const columns = parseInt(document.querySelector("#enterCol").value);
   
  document.getElementById("matrixContainer").innerHTML = "";
  document.getElementById("resultContainer").innerHTML = "";

  generateMatrix(rows, columns);

});


let matrix = [];
let maxElement = { value: -Infinity, row: 0, col: 0 };


function showNotification(message) {
  console.log("hey it is in notificatuib fun ")
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.remove("hidden");
  notification.classList.add("visible");
  console.log(notification);
  
  setTimeout(() => {
    notification.classList.remove("visible");
    notification.classList.add("hidden");
  }, 4000);
}

function generateMatrix(rows, columns) {

  
  matrix = [];
 maxElement = { value: -Infinity, row: 0, col: 0 };
  
  if (rows <= 0) {
    console.log("is it working");
    showNotification("Please enter a valid row value");
    return;
  }
  if (columns <= 0) {
    console.log("what is this ");
    showNotification("Please enter a valid column value");
    return;
  }
  const matrixContainer = document.getElementById("matrixContainer");
  matrix = Array.from({ length: rows }, () => Array(columns).fill("-"));
  maxElement = { value: -Infinity, row: 0, col: 0 };


  for (let i = 0; i < rows; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "matrix-row";


    for (let j = 0; j < columns; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.className = "matrix-input";
      

      
      input.addEventListener("input", function () {
        const value = parseInt(input.value) || 0;
       
      
        matrix[i][j] = value;


        if (value > maxElement.value) {
          maxElement = { value, row: i, col: j };
        }
      });
      rowDiv.appendChild(input);
    }
    matrixContainer.appendChild(rowDiv);
  }
}


window.submitMatrix = function () {
   
  if (matrix.length === 0) {
    showNotification("Please generate the matrix first.");
    return;
  }


  const { row, col } = maxElement;
  const leftNeighbor = col > 0 ?( matrix[row][col - 1] =="-"?"empty":matrix[row][col-1] ) : "N/A";
  const rightNeighbor =
    col < matrix[0].length - 1 ? (matrix[row][col + 1] =="-"?"empty":matrix[row][col+1] ): "N/A";


  const resultContainer = document.getElementById("resultContainer");

   if(maxElement.value != -Infinity)
   {
    resultContainer.innerHTML = `
    <p>Max Element: ${maxElement.value}</p>
    <p>Left Neighbor: ${leftNeighbor}</p>
    <p>Right Neighbor: ${rightNeighbor}</p>
  `;
   }
   else
   {
    resultContainer.innerHTML = `
    <p> Matrix is empty , please enter values first and then try</p>
    
  `;
   }
  
};











