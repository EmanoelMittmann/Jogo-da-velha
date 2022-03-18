const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
let isCircleTurn;
const winningMessageTxtElement = document.querySelector("[data-winning-message-text]");

const winningMessage = document.querySelector("[data-winning]");
const winningMessageButton = document.querySelector("[data-winning-button]");

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const startGame = () => {
    isCircleTurn = false;

    for(const cell of cellElements) {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener("Click", handleClick);
        cell.addEventListener("click",handleClick,{once :true});
    }


    setBoardHoverClass();        
    winningMessage.classList.remove("show-winning-message");
};
const endGame = (isDraw) => {
    if(isDraw){
        winningMessageTxtElement.innerText = "Empate!";
    }else{
        winningMessageTxtElement.innerText = isCircleTurn ? ' O Venceu!' : 'X Venceu';
    }

    winningMessage.classList.add("show-winning-message");
};


const placeMark = (cell, classToAdd) =>{
    cell.classList.add(classToAdd);
};

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination =>{
        return combination.every((index)=>{
         return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every(cell =>{
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

const setBoardHoverClass = () =>{
    board.classList.remove('circle');
    board.classList.remove('x');

    if(isCircleTurn){
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }

}

const swapTurns = () =>{
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
};

const handleClick = (e) => {
    //colocar circulo
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    
    //verificar vitoria
    const isWin = checkForWin(classToAdd);
    if(isWin){
       endGame(false);
    }
    //verificar empate

    const isDraw = checkForDraw();

    if(isWin){
        endGame(false);
    }else if(isDraw){
        endGame(true);
    }else{
    //mudar simbolo
        swapTurns();
    }

};

startGame();

winningMessageButton.addEventListener('click', startGame);
