export default function constraintReducer(constraint, action) {
    const newConstraint = {...constraint};
    switch (action.type) {
        case "COUNT_DOWN":
            newConstraint.counter--;
            newConstraint.pbCounterWidth = ((newConstraint.counter * 5) / 3) + "%";
            if (newConstraint.counter < 30) {
                newConstraint.pbCounterClass = "progress-bar bg-danger";
            } else if (newConstraint.counter < 40) {
                newConstraint.pbCounterClass = "progress-bar bg-warning";
            } else if (newConstraint.counter < 50) {
                newConstraint.pbCounterClass = "progress-bar bg-info";
            } else {
                newConstraint.pbCounterClass = "progress-bar bg-success";
            }
            break;
        default:
            throw new Error("Unknown action type");
    }
    return newConstraint;
}