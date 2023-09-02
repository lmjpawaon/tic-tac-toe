document.addEventListener("DOMContentLoaded", function () {
    const tiles = document.querySelectorAll(".tile");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let xStreak = parseInt(localStorage.getItem('xStreak')) || 0;
    let oStreak = parseInt(localStorage.getItem('oStreak')) || 0;
    let drawStreak = parseInt(localStorage.getItem('drawStreak')) || 0;

    // Function to update and display streak counts
    function updateStreaks(winner) {
        if (winner === "X") {
            xStreak++;
            localStorage.setItem('xStreak', xStreak);
        } else if (winner === "O") {
            oStreak++;
            localStorage.setItem('oStreak', oStreak);
        } else if (winner === "draw") {
            drawStreak++;
            localStorage.setItem('drawStreak', drawStreak);
        }

        // Update the streak display in the HTML
        document.getElementById('x-streak').textContent = `X Wins: ${xStreak}`;
        document.getElementById('o-streak').textContent = `O Wins: ${oStreak}`;
        document.getElementById('draw-streak').textContent = `Draws: ${drawStreak}`;
    }

    // Add click event listeners to each tile
    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => {
            // Check if the tile is empty and the game is not over
            if (!tile.textContent && !checkWinner()) {
                tile.textContent = currentPlayer;
                gameBoard[index] = currentPlayer;
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                updateStatus();
            }
        });
    });

    // Add an event listener for the restart button
    const restartButton = document.getElementById("restart");
    restartButton.addEventListener("click", () => {
        // Clear the tiles and reset the gameBoard
        tiles.forEach(tile => {
            tile.textContent = "";
            tile.classList.remove("winner") //Remove added class winner from updateStatus()
        });
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        updateStatus();
    });

    function updateStatus() {
        const status = document.querySelector(".header h2");
        if (checkWinner()) {
            const winningPattern = winCombos[winCombos.findIndex(combo => {
                return combo.every(index => gameBoard[index] === checkWinner());
            })];
            if (winningPattern) {
                winningPattern.forEach(index => {
                    tiles[index].classList.add("winner"); //Add winner class to be used to highlight box to red
                }); 
            }
            setTimeout(() =>{
                window.alert(`${checkWinner()} wins!`);
            }, 100)
            updateStreaks(checkWinner())
            
        } else if (!gameBoard.includes("") && !checkWinner()) {
            setTimeout(() =>{
                window.alert("It's a draw!");
            }, 100) //Timeout so that the boxes will be highlighted first before the alert shows up
            updateStreaks("draw")
        } else {
            status.textContent = `Current Player: ${currentPlayer}`;
        }
    }

    function checkWinner() {
        for (const combo of winCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a]; //Returns either X or O
            }
        }
        return null;
    }
});
