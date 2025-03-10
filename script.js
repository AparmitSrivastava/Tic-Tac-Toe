// let box1 = document.getElementById("11")
// let box2 = document.getElementById("12")
// let box3 = document.getElementById("13")
// let box4 = document.getElementById("21")
// let box5 = document.getElementById("22")
// let box6 = document.getElementById("23")
// let box7 = document.getElementById("31")
// let box8 = document.getElementById("32")
// let box9 = document.getElementById("33")

// const boxes = document.querySelectorAll(".box");
// let currentPlayer = "X";
// let board = ["", "", "", "", "", "", "", "", ""];
// let gameActive = true;

// // Winning combinations
// const winPatterns = [
//     [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
//     [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
//     [0, 4, 8], [2, 4, 6]             // Diagonals
// ];

// // Handle Click Event
// boxes.forEach((box, index) => {
//     box.addEventListener("click", () => {
//         if (board[index] === "" && gameActive) {
//             board[index] = currentPlayer;
//             box.innerText = currentPlayer; // Update UI

//             let winner = checkWinner();
//             if (winner) {
//                 alert(winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`);
//                 gameActive = false;
//             } else {
//                 currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch turn
//             }
//         }
//     });
// });

// // Check Winner Function
// function checkWinner() {
//     for (let pattern of winPatterns) {
//         let [a, b, c] = pattern;
//         if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//             return board[a]; // Return "X" or "O" as the winner
//         }
//     }
//     return board.includes("") ? null : "Draw"; // Check for a draw
// }


let player = (name) => {
    return { name }
}

let array = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]
let count = 1
const boxes = document.querySelectorAll(".box");


const game = (() => {
    function checkwin() {
        // checking for win in rows
        for (let i = 0; i < 3; i++) {
            crossCount = 0;
            zeroCount = 0;
            for (let j = 0; j < 3; j++) {
                if (array[i][j] == 1) {
                    crossCount++;
                }
                else if (array[i][j] == 0) {
                    zeroCount++
                }
                else {
                    break;
                }
            }
            if (crossCount == 3) return 1;
            if (zeroCount == 3) return 0;
        }


        // check for all column
        for (let i = 0; i < 3; i++) {
            crossCount = 0;
            zeroCount = 0;
            for (let j = 0; j < 3; j++) {
                if (array[j][i] == 1) crossCount++;
                else if (array[j][i] == 0) zeroCount++;
                else break;
            }
            if (crossCount == 3) return 1;
            if (zeroCount == 3) return 0;
        }

        // check for diagonals
        if (array[0][0] == array[1][1] && array[1][1] == array[2][2] && array[1][1] == 1) return 1;
        else if (array[0][0] == array[1][1] && array[0][0] == array[2][2] && array[0][0] == 0) return 0;

        // 2nd diagonal
        if (array[0][2] == array[1][1] && array[0][2] == array[2][0] && array[0][2] == 1)
            return 1;
        else if (array[0][2] == array[1][1] && array[0][2] == array[2][0] && array[0][2] == 0)
            return 0;

        return -1;
    }



    function decwinner(res) {
        if (res == 1) {
            alert("X has won")
            document.getElementById("status").innerHTML = "X has won"
            document.getElementById("status").style.fontSize = '50px'
            document.getElementById("status").style.color = 'white'
            document.getElementById("status").style.fontFamily = 'Arial'
        }
        else if (res == 0) {
            alert("O has won")
            document.getElementById("status").innerHTML = "O has won"
            document.getElementById("status").style.fontSize = '50px'
            document.getElementById("status").style.color = 'white'
            document.getElementById("status").style.fontFamily = 'Arial'
        }
        else {
            document.getElementById("status").innerHTML = "It's a Draw !"
            document.getElementById("status").style.fontSize = '50px'
        }
    }

    let xturn = true

    function addCross(e, row, col) {
        if (array[row - 1][col - 1] === -1) {
            const cross = document.createElement('img')
            cross.src = "imgfold/cross.png"
            cross.style.width = "70px"
            let id = e.target.id;
            const clickedBox = document.getElementById(`${id}`)
            clickedBox.appendChild(cross);
            array[row - 1][col - 1] = 1;
            xturn = false
            count++
        }
    }



    function addZero(e, row, col) {
        if (array[row - 1][col - 1] === -1) {
            const zero = document.createElement('img');
            zero.src = "imgfold/zero.png";
            zero.style.width = "70px";
            zero.classList.add('zerocross');
            let id = e.target.id;
            const clickedBox = document.getElementById(`${id}`);
            clickedBox.appendChild(zero);

            array[row - 1][col - 1] = 0;
            xturn = true;
            count++;
        }
    }


    function updategame(e) {
        const row = Number(e.target.id.charAt(0))
        const col = Number(e.target.id.charAt(1))

        if (count % 2 == 1) {
            addCross(e, row, col)
        }
        else {
            addZero(e, row, col)
        }

        if (count >= 5) {
            const res = checkwin();
            if (res == 1 || res == 0 || count == 10)
                setTimeout(() => {
                    decwinner(res);
                }, 300)
        }
    }


    return { array, updategame };
})()



boxes.forEach(box => {
    box.addEventListener('click', (e) => {
        game.updategame(e);
    });
});


function restart() {
    boxes.forEach(e => {
        e.innerHTML = ""
    })
    count = 1;
    array = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
}

document.getElementById("Restart").addEventListener("click", function () {
    restart();
    document.getElementById("Restart").classList.add("pressed");
    setTimeout(() => {
        document.getElementById("Restart").classList.remove("pressed")
    }, 400);
})