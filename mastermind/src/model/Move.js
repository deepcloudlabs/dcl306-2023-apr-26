export default class Move {
    constructor({secret, guess}) {
        this.guess = guess;
        this.perfect = 0;
        this.partial = 0;
        this.message = "";
        let secreteAsString = secret.toString();
        let guessAsString = guess.toString();
        for (let i in secreteAsString) {
            for (let j in guessAsString) {
                if (secreteAsString.charAt(i) === guessAsString.charAt(j)) {
                    if (i === j)
                        this.perfect++;
                    else
                        this.partial++;
                }
            }
        }
        if (this.perfect === 0 && this.partial === 0) {
            this.message = "No Match";
        } else {
            if (this.partial > 0)
                this.message = `-${this.partial}`;
            if (this.perfect > 0)
                this.message = `${this.message}+${this.perfect}`;
        }
    }
}