import CardHeader from "../common/CardHeader";
import CardBody from "../common/CardBody";
import InputType from "../common/InputType";
import SelectBox from "../common/SelectBox";
import CheckBox from "../common/CheckBox";
import Photo from "../common/Photo";
import Card from "../common/Card";
import {useDepartments, useDispatchHr, useEmployee} from "../../HrProvider";
import {Button} from "react-bootstrap";
import EmployeeDialogBox from "../common/EmployeeDialogBox";

export default function EmployeeForm() {
    const employee = useEmployee();
    const dispatchHr = useDispatchHr();
    const departments = useDepartments();

    function handleInputChange(e) {
        dispatchHr({type: "HANDLE_INPUT_CHANGE", value: e.target.value, name: e.target.name})
    }

    function handlePhotoChange(data) {
        dispatchHr({type: "HANDLE_PHOTO_CHANGE", data})
    }

    function hireEmployee() {
        fetch("http://localhost:4001/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(employee)
        }).then(res => res.json())
            .then(response => {
                if (response.status === "OK") {
                    dispatchHr({type: "HIRE_EMPLOYEE", response})
                }
            })
    }

    function retrieveEmployees() {
        fetch("http://localhost:4001/employees", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then(employees => {
                dispatchHr({type: "RETRIEVE_EMPLOYEES", employees})
            })
    }

    function findEmployee() {
        fetch(`http://localhost:4001/employees/${employee.identityNo}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then(employee => {
                dispatchHr({type: "FIND_EMPLOYEE", employee})
            })
    }

    function updateEmployee() {
        fetch(`http://localhost:4001/employees`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(employee)
        }).then(res => res.json())
            .then(response => {
                dispatchHr({type: "UPDATE_EMPLOYEE", response})
            })
    }

    return (
        <Card>
            <CardHeader title="Employee Panel"/>
            <CardBody>
                <div className="mb-3">
                    <InputType value={employee.identityNo}
                               id="identityNo"
                               label="Identity No"
                               handleChange={handleInputChange}/>
                    <Button type="button"
                            variant="success"
                            onClick={findEmployee}>Find Employee</Button>
                    <Button type="button"
                            value="Find"
                            variant="success"
                            onClick={updateEmployee}>Update Employee</Button>
                </div>
                <div className="mb-3">
                    <InputType value={employee.fullname}
                               id="fullname"
                               label="Full Name"
                               handleChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <InputType value={employee.iban}
                               id="iban"
                               label="IBAN"
                               handleChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <InputType value={employee.salary}
                               id="salary"
                               label="Salary"
                               handleChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <SelectBox value={employee.department}
                               id="department"
                               label="Department"
                               options={departments}
                               handleChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <InputType value={employee.birthYear}
                               id="birthYear"
                               label="Birth Year"
                               handleChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <CheckBox value={employee.fulltime}
                              id="fulltime"
                              label="Full-Time?"
                              handleChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <Photo value={employee.photo}
                           id="photo"
                           label="Photo"
                           handleChange={handlePhotoChange}/>
                </div>
                <div className="mb-3">
                    <Button type="button"
                            variant="warning"
                            onClick={hireEmployee}>Hire Employee</Button>
                    <Button type="button"
                            variant="info"
                            onClick={retrieveEmployees}>Retrieve Employees</Button>

                </div>
            </CardBody>
        </Card>
    );
}
