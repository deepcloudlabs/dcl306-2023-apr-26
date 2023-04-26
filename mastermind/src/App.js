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

class App extends PureComponent { // Stateful Component
    constructor(props, context) {
        super(props, context);
        this.state = { // Model
            game: {
                level: 3,
                lives: 3,
                moves: [],
                secret: 549,
                guess: 123,
                numberOfMoves: 0,
            },
            constraint: {
                counter: 60,
                maxNumberOfMoves: 10
            },
            statistics: {
                wins: 0,
                loses: 0
            },
            preferences: {}
        };
        // 1-way Binding: Model  --> View (React)
        // 2-way Binding: Model <--> View (Angular/Vue/KO)
    }


    componentDidMount() {
        setInterval(() => {
            let constraint = {...this.state.constraint};
            constraint.counter--;
            console.log(constraint.counter)
            this.setState({constraint}, () => {
                console.log(this.state.constraint.counter)
            });

        }, 1_000);
    }

    handleInputChange = (event) => {
        let guess = event.target.value;
        let game = {...this.state.game};
        game.guess = Number(guess);
        this.setState({game});
    }

    render() {
        return ( // View
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Mastermind Game Board</h4>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <div className="form-floating">
                                <input type="number"
                                       className="form-control"
                                       id="gameLevel"
                                       disabled="true"
                                       name="gameLevel"
                                       value={this.state.game.level}/>
                                <label htmlFor="gameLevel">Game Level</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating">
                                <input type="number"
                                       className="form-control"
                                       id="lives"
                                       disabled="true"
                                       name="lives"
                                       value={this.state.game.lives}/>
                                <label htmlFor="lives">Lives</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating">
                                <input type="number"
                                       className="form-control"
                                       id="numberOfMoves"
                                       disabled="true"
                                       name="numberOfMoves"
                                       value={this.state.game.numberOfMoves}/>
                                <label htmlFor="numberOfMoves">Number of moves</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating">
                                <input type="number"
                                       className="form-control"
                                       id="counter"
                                       disabled="true"
                                       name="counter"
                                       value={this.state.constraint.counter}/>
                                <label htmlFor="counter">Time left</label>
                            </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
