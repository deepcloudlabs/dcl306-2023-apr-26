function createDigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createSecret(numberOfDigits) {
    const digits = [];

    digits.push(createDigit(1, 9));
    while (digits.length < numberOfDigits) {
        const digit = createDigit(0, 9);
        if (digits.includes(digit)) continue;
        digits.push(digit);
    }
    let secretNumber = digits.reduce((secret, digit) => 10 * secret + digit);
    console.log(secretNumber);
    return secretNumber;
}

export default function initializeGame(game) {
    game.secret = createSecret(game.level);
    game.numberOfMoves = 0;
    game.moves = [];
}