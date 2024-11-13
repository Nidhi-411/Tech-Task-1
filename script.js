function goBack() {
  document.getElementById("rows").value = "";
  document.getElementById("columns").value = "";
  document.getElementById("matrixContainer").innerHTML = "";
  document.getElementById("result").innerHTML = "";
}

let matrix = [];
let maxElement = { value: -Infinity, row: 0, col: 0 };

function generateMatrix() {
  matrix = [];
  maxElement = { value: -Infinity, row: 0, col: 0 };

  const rows = document.getElementById("rows").value;
  const columns = document.getElementById("columns").value;
  const matrixBox = document.getElementById("matrixContainer");
  matrix = Array.from({ length: rows }, () => Array(columns).fill("-"));
  maxElement = { value: -Infinity, row: 0, col: 0 };

  matrixBox.innerHTML = "";
  matrixBox.style.gridTemplateColumns = `repeat(${columns}, auto)`;

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

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.id = `cell-${i}-${j}`;
      input.className = "each-input-Box";
      matrixContainer.appendChild(input);
      input.addEventListener("input", function () {
        const value = parseInt(input.value) || 0;
        matrix[i][j] = value;

        if (value > maxElement.value) {
          maxElement = { value, row: i, col: j };
        }
      });
    }
  }
}

function findMaxElement() {
  if (matrix.length === 0) {
    showNotification("Please generate the matrix first.");
    return;
  }

  const { row, col } = maxElement;
  console.log(row, col);
  console.log(maxElement);

  let leftNeighbor;
  if (col < 0) {
    leftNeighbor = "N/A";
  } else {
    leftNeighbor = matrix[row][col - 1] == "-" ? "empty" : matrix[row][col - 1];
    console.log(matrix[row][col - 1]);
  }
  let rightNeighbor;

  if (col >= columns) {
    rightNeighbor = "N/A";
  } else {
    rightNeighbor =
      matrix[row][col + 1] == "-" ? "empty" : matrix[row][col + 1];
    console.log(matrix[row][col + 1]);
  }

  console.log(leftNeighbor, rightNeighbor);
  const resultContainer = document.getElementById("resultContainer");

  if (maxElement.value != -Infinity) {
    resultContainer.innerHTML = `
      <p>Max Element: ${maxElement.value}</p>
      <p>Left Neighbor: ${leftNeighbor}</p>
      <p>Right Neighbor: ${rightNeighbor}</p>
    `;
  } else {
    resultContainer.innerHTML = `
      <p> Matrix is empty , please enter values first and then try</p>
      
    `;
  }
}

function showNotification(message) {
  console.log("hey it is in notificatuib fun ");
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
