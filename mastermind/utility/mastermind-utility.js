function createDigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createSecret(numberOfDigits) {
    const digits = [];

    digits.push(createDigit(1, 9));
    while (digits.length < numberOfDigits) {
        const digit = createDigit(0, 9);
        if (digits.includes(digit)) continue;
        digits.push(digit);
    }
    return digits.reduce((secret, digit) => 10 * secret + digit);
}

export default function initializeGame(game) {
    game.secret = createSecret(game.level);
    game.numberOfMoves = 0;
    game.moves = [];
}