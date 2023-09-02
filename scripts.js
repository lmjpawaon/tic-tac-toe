document.addEventListener("DOMContentLoaded", function () {
    const tiles = document.querySelectorAll(".tile");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

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
    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", () => {
        // Clear the tiles and reset the gameBoard
        tiles.forEach(tile => {
            tile.textContent = "";
        });
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        updateStatus();
    });

    function updateStatus() {
        const status = document.querySelector(".header h1");
        if (checkWinner()) {
            status.textContent = `${checkWinner()} wins!`;
        } else if (!gameBoard.includes("") && !checkWinner()) {
            status.textContent = "It's a draw!";
        } else {
            status.textContent = `Current Player: ${currentPlayer}`;
        }
    }

    function checkWinner() {
        for (const combo of winCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }
        return null;
    }
});
