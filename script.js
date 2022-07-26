const combinations = [123, 456, 789, 147, 258, 369, 159, 357];
const whoWinDiv = document.querySelector('#whoWin');
let winner;

const randomNumber = () => Math.floor(Math.random() * (10 - 1) + 1);

const play = (cellNum) => {
    const [, busyCells] = getBusyCells();

    if (winner || busyCells.includes(cellNum)) return;

    const playerCell = document.querySelector(`#position${cellNum}`);
    playerCell.innerText = "X";

    isWinner();

    if (winner) return;

    const computerCell = document.querySelector(`#position${randomCellNum(randomNumber())}`);
    computerCell.innerHTML = "O";

    isWinner();

};

const start = () => {
    winner = false;
    const allCell = document.querySelectorAll('.gamePosition');
    whoWinDiv.innerText = '';
    Array.from(allCell)?.forEach(cell => cell.innerText = '');
};

const randomCellNum = (number) => {
    const [, busyCells] = getBusyCells();

    return !busyCells.includes(number) ? number : randomCellNum(randomNumber());
};

const isWinner = () => {
    const [allCell, busyCells] = getBusyCells();

    const computer = Array.from(allCell)?.filter(htmlElement => htmlElement.innerHTML === 'O').map(htmlElement => +htmlElement.id.slice(-1));
    const player = Array.from(allCell)?.filter(htmlElement => htmlElement.innerHTML === 'X').map(htmlElement => +htmlElement.id.slice(-1));

    if (whoWin(player) === 3){
        winner = true;
        return whoWinDiv.innerText = 'player is a winner';
    }

    if (whoWin(computer) === 3){
        winner = true;
        return whoWinDiv.innerText = 'computer is a winner';
    }

    if (busyCells?.length === 9){
        winner = true;
        return whoWinDiv.innerText = 'draw';
    }
};

const whoWin = (gamer) => {
    return combinations?.reduce((obj, number) => {

        if (!obj.threeTrue){

            if (number.toString().includes(gamer?.[0])){
                obj.arrWithBoolean = [...obj.arrWithBoolean, true];
            }

            if (number.toString().includes(gamer?.[1])){
                obj.arrWithBoolean = [...obj.arrWithBoolean, true];
            }

            if (number.toString().includes(gamer?.[2])){
                obj.arrWithBoolean = [...obj.arrWithBoolean, true];
            }

            if (number.toString().includes(gamer?.[3])){
                obj.arrWithBoolean = [...obj.arrWithBoolean, true];
            }

            if (number.toString().includes(gamer?.[4])){
                obj.arrWithBoolean = [...obj.arrWithBoolean, true];
            }

            if (obj.arrWithBoolean.length === 3 && obj.arrWithBoolean.every(value => value === true)){
                obj.threeTrue = true;
                return obj;
            }
                obj.arrWithBoolean = [];
            }
        
        return obj;

    },{ threeTrue: false, arrWithBoolean: []})?.arrWithBoolean?.length;
};

const getBusyCells = () => {
    const allCell = document.querySelectorAll('.gamePosition');
    const busyCells = Array.from(allCell)?.filter(htmlElement => htmlElement.innerHTML).map(htmlElement => +htmlElement.id.slice(-1));
    return [allCell, busyCells];
};
