let playeronename=document.getElementById("playeronename")
let playertwoname=document.getElementById("playertwoname")


let player = (name) => {
    return {name}
}

let array = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]
let count = 1
const boxes = document.querySelectorAll(".box");
let playerone
let playertwo


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
        let message = "";

        if (res === 1) {
            message = `${playerone.name} has won the game`
        } else if (res === 0) {
            message = `${playertwo.name} has won the game !`
        } else {
            message = "Its a Draw!";
        }
        document.getElementById("overlay").style.display = "flex";
        document.getElementById("winnerName").innerText = message;
        document.querySelector(".container").classList.add("blur")
        document.querySelector("#mainGame .title").classList.add("blur");
    }



    let xturn = true

    function addCross(e, row, col) {
        if (array[row - 1][col - 1] === -1) {
            const cross = document.createElement('img')
            cross.src = "imgfold/cross.png"
            cross.style.width = "100px"
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
            zero.style.width = "100px";
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
    document.getElementById("overlay").style.display = "none"
    document.querySelector(".container").classList.remove("blur")
    document.querySelector("#mainGame .title").classList.remove("blur");
}


document.getElementById("Restart").addEventListener("click", function () {
    restart();
    document.getElementById("Restart").classList.add("pressed");
    setTimeout(() => {
        document.getElementById("Restart").classList.remove("pressed")
    }, 400);
})

document.getElementById("start").addEventListener("click", function(){
    document.getElementById("starting").style.display="none"
    document.getElementById("container").style.display="block"
    playerone = player((playeronename.value || "player 1"))
    playertwo = player((playertwoname.value || "player 2"))
})

document.getElementById("Restart").style.marginTop="70px"
document.getElementById("Restart").style.padding="20px"

document.querySelector(".disclaimer").style.color="white"
document.querySelector(".disclaimer").style.letterSpacing="2px"
document.querySelector(".disclaimer").style.fontFamily="Balibrush"
document.querySelector(".disclaimer").style.fontSize="19px"



