import Employee from "../model/Employee";

export default function HrReducer(hr, action) {
    const newHr = {...hr};
    switch (action.type) {
        case "HANDLE_INPUT_CHANGE":
            if (action.name === "fulltime") {
                newHr.employee.fulltime = !newHr.employee.fulltime;
            } else {
                newHr.employee[action.name] = action.value;
            }
            break;
        case "HANDLE_PHOTO_CHANGE":
            newHr.employee.photo = action.data;
            break;
        case "HIRE_EMPLOYEE":
            alert(action.response);
            break;
        case "CLOSE_DIALOG":
            newHr.showDialog = false;
            break;
        case "OPEN_DIALOG":
            newHr.showDialog = true;
            newHr.employee = new Employee(action.employee);
            break;
        case "COPY_EMPLOYEE":
            newHr.employee = new Employee(action.employee);
            break;
        case "FIRE_EMPLOYEE":
            newHr.employee = new Employee(action.employee);
            const employees = [...newHr.employees];
            newHr.employees = employees.filter(emp => emp.identityNo !== action.employee.identityNo);
            break;
        case "UPDATE_EMPLOYEE":
            let newEmployees = [...newHr.employees];
            newEmployees = newHr.employees.map(emp => emp.identityNo !== newHr.employee.identityNo ? emp : new Employee(newHr.employee));
            newHr.employees = newEmployees;
            break;
        case "FIND_EMPLOYEE":
            newHr.employee = new Employee(action.employee);
            break;
        case "RETRIEVE_EMPLOYEES":
            newHr.employees = action.employees;
            break;
        default:
            throw new Error(`${action.type} IS NOT A VALID ACTION TYPE`);
    }
    return newHr;
}