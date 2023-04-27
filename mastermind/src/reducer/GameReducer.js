// pure function
import initializeGame from "../utility/mastermind-utility";
import Move from "../model/Move";

export default function gameReducer(game, action) {
    const newGame = {...game};
    switch (action.type) {
        case "PLAY":
            newGame.numberOfMoves++;
            if (newGame.secret === newGame.guess) {
                newGame.level++;
                if (newGame.level > 10) {
                    //TODO
                } else {
                    initializeGame(newGame);
                }
            } else {
                if (newGame.numberOfMoves > 10) {
                    newGame.lives--;
                    if (newGame.lives <= 0) {
                        //TODO
                    } else {
                        initializeGame(newGame);
                    }
                } else {
                    newGame.moves = [...newGame.moves, new Move(newGame)];
                }
            }
            break;
        case "GUESS_CHANGED":
            newGame.guess = Number(action.event.target.value);
            break;
        default:
            throw new Error("Unknown action type");
    }
    return newGame;
}