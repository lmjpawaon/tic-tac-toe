document.addEventListener("DOMContentLoaded", function () {
    const tiles = document.querySelectorAll(".tile");
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    
    const xStreakElement = document.getElementById('x-streak');
    const oStreakElement = document.getElementById('o-streak');
    const drawStreakElement = document.getElementById('draw-streak');

    // Initialize streak counts from localStorage and update the display
    let xStreak = parseInt(localStorage.getItem('xStreak')) || 0;
    let oStreak = parseInt(localStorage.getItem('oStreak')) || 0;
    let drawStreak = parseInt(localStorage.getItem('drawStreak')) || 0;

    updateStreaksDisplay();

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

        updateStreaksDisplay();
    }

    // Function to update the display of streak counts
    function updateStreaksDisplay() {
        xStreakElement.textContent = `X Wins: ${xStreak}`;
        oStreakElement.textContent = `O Wins: ${oStreak}`;
        drawStreakElement.textContent = `Draws: ${drawStreak}`;
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
            tile.classList.remove("winner")
            tile.style.animation = "none";
        });
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        updateStatus();
    });

    function updateStatus() {
        const status = document.querySelector(".header h2");
        const winner = checkWinner();
        
        if (winner) {
            const winningPattern = winCombos.find(combo => {
                return combo.every(index => gameBoard[index] === winner);
            });
            if (winningPattern) {
                winningPattern.forEach(index => {
                    tiles[index].classList.add("winner");
                    tiles[index].style.animation = "flip 0.5s ease";
                });
            }
            setTimeout(() => {
                window.alert(`${winner} wins!`);
            }, 500);
            updateStreaks(winner);
        } else if (!gameBoard.includes("") && !winner) {
            setTimeout(() => {
                window.alert("It's a draw!");
            }, 500);
            updateStreaks("draw");
        } else {
            status.textContent = `Current Player: ${currentPlayer}`;
        }
    }

    function checkWinner() {
        for (const combo of winCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a]; // Returns either X or O
            }
        }
        return null;
    }
});
