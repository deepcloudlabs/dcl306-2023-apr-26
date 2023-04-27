// 1. Component-based Programming
//    i) Stateful Component
//       A) Class
//       B) React Hooks -> function -> useState()
//   ii) * Stateless Component
//       C) function
// level  -> 3
// secret -> 549
// 123 -> No match
// 456 -> -2
// 576 -> +1
// 584 -> -1 +1
// 549 -> level -> 4, secret -> 3615
// 1234 -> -2
// 60 sec. + max move 10, lives: 3
import {PureComponent} from "react";
import Move from "./model/Move";
import initializeGame, {createSecret} from "./utility/mastermind-utility";
import ProgressBar from "./component/common/ProgressBar";
import DisabledInput from "./component/common/DisabledInput";
import Container from "./component/common/Container";

class Mastermind extends PureComponent { // Stateful Component
    constructor(props, context) {
        super(props, context);
        let mastermind = JSON.parse(localStorage.getItem("mastermind"));
        this.state = mastermind;
        // 1-way Binding: Model  --> View (React)
        // 2-way Binding: Model <--> View (Angular/Vue/KO)
    }

    componentDidMount() {
        setInterval(() => {
            let constraint = {...this.state.constraint};
            let game = {...this.state.game};
            constraint.counter--;
            if (constraint.counter <= 0){
                game.lives--;
                if (game.lives === 0){
                    //TODO: Player loses
                } else {
                    initializeGame(game);
                    constraint.counter = 60;
                }
            }
            constraint.pbCounterWidth = ((constraint.counter * 5 )/3) + "%";
            if (constraint.counter < 30){
                constraint.pbCounterClass = "progress-bar bg-danger";
            } else if (constraint.counter < 40){
                constraint.pbCounterClass = "progress-bar bg-warning";
            } else if (constraint.counter < 50){
                constraint.pbCounterClass = "progress-bar bg-info";
            } else {
                constraint.pbCounterClass = "progress-bar bg-success";
            }
            this.setState({constraint, game}, this.saveStateToLocalStorage);

        }, 1_000);
    }
    play = () => {
         let game = {...this.state.game};
         let constraint = {...this.state.constraint};
         game.numberOfMoves++;
         if (game.secret === game.guess){
             game.level++;
             if (game.level>10){
                 // TODO: player wins
             } else {
                initializeGame(game);
             }
         } else {
             if (game.numberOfMoves >constraint.maxNumberOfMoves){
                 game.lives--;
                 if (game.lives <= 0){
                     // TODO: player loses
                 } else {
                    initializeGame(game);
                 }
             } else {
                 game.moves = [...game.moves,new Move(game)];
             }
         }
         this.setState({game},this.saveStateToLocalStorage);
    }

    saveStateToLocalStorage = () => {
            localStorage.setItem("mastermind", JSON.stringify({...this.state}))
    }
    handleInputChange = (event) => {
        let guess = event.target.value;
        let game = {...this.state.game};
        game.guess = Number(guess);
        this.setState({game},this.saveStateToLocalStorage);
    }

    render() {
        return ( // View
            <Container>
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Mastermind Game Board</h4>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <DisabledInput id="gameLevel"
                                           label="Game Level"
                                           value={this.state.game.level}
                                           name="gameLevel"></DisabledInput>
                        </div>
                        <div className="mb-3">
                            <DisabledInput id="lives"
                                           label="Lives"
                                           value={this.state.game.lives}
                                           name="lives"></DisabledInput>
                        </div>
                        <div className="mb-3">
                            <DisabledInput id="numberOfMoves"
                                           label="Number of Moves"
                                           value={this.state.game.numberOfMoves}
                                           name="numberOfMoves"></DisabledInput>
                        </div>
                        <div className="mb-3">
                            <ProgressBar pbColor={this.state.constraint.pbCounterClass}
                                         pbWidth={this.state.constraint.pbCounterWidth}
                                         value={this.state.constraint.counter}></ProgressBar>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating">
                                <input type="number"
                                       className="form-control"
                                       id="guess"
                                       name="guess"
                                       onChange={this.handleInputChange}
                                       value={this.state.game.guess}/>
                                <label htmlFor="guess">Guess</label>
                                <button className="btn btn-success"
                                        onClick={this.play}>Play</button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <table className="table table-bordered table-hover table-striped table-responsive">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Guess</th>
                                        <th>Partial Match</th>
                                        <th>Perfect Match</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.game.moves.map(
                                        (move,index) =>
                                        <tr key={move.guess}>
                                            <td>{index+1}</td>
                                            <td>{move.guess}</td>
                                            <td>{move.partial}</td>
                                            <td>{move.perfect}</td>
                                            <td>{move.message}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Mastermind;
