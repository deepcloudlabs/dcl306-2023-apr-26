import Container from "./component/common/Container";
import Card from "./component/common/Card";
import CardHeader from "./component/common/CardHeader";
import CardBody from "./component/common/CardBody";
import {useDispatchHr, useEmployees} from "./HrProvider";
import EmployeeForm from "./component/hr/EmployeeForm";
import Badge from "./component/common/Badge";
import {Button} from "react-bootstrap";
import EmployeeDialogBox from "./component/common/EmployeeDialogBox";
import "./Hr.css";

function Hr() {
    const employees = useEmployees();
    const dispatchHr = useDispatchHr();

    function copyEmployeeToForm(employee) {
        dispatchHr({type: "COPY_EMPLOYEE", employee});
    }

    function fireEmployee(emp) {
        fetch(`http://localhost:4001/employees/${emp.identityNo}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then(employee => {
                dispatchHr({type: "FIRE_EMPLOYEE", employee})
            })
    }

    function editEmployee(employee) {
        dispatchHr({type: "OPEN_DIALOG", employee})
    }

    return (
        <>
        <EmployeeDialogBox></EmployeeDialogBox>
        <Container>
            <p></p>
            <EmployeeForm></EmployeeForm>
            <p></p>
            <Card>
                <CardHeader title="Employees"/>
                <CardBody>
                    <table className="table table-bordered table-striped table-hover table-responsive">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Photo</th>
                            <th>Identity No</th>
                            <th>Full Name</th>
                            <th>Salary</th>
                            <th>IBAN</th>
                            <th>Birth Year</th>
                            <th>Job Style</th>
                            <th>Department</th>
                            <th>Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            employees.map((emp, index) =>
                                <tr onClick={e => copyEmployeeToForm(emp)}
                                    key={emp.identityNo}>
                                    <td>{index + 1}</td>
                                    <td><img src={emp.photo} className="img-thumbnail" style={{width: "32px"}} alt=""/>
                                    </td>
                                    <td>{emp.identityNo}</td>
                                    <td>{emp.fullname}</td>
                                    <td>{emp.salary}</td>
                                    <td>{emp.iban}</td>
                                    <td>{emp.birthYear}</td>
                                    <td><Badge bgColor="bg-success"
                                               value={emp.fulltime ? 'FULL-TIME' : 'PART-TIME'}/></td>
                                    <td><Badge bgColor="bg-info"
                                               value={emp.department}/></td>
                                    <td><Button type="button"
                                                varaint="danger"
                                                onClick={(e) => fireEmployee(emp)}>Fire Employee</Button>
                                        <Button type="button"
                                                variant="info"
                                                onClick={(e) => editEmployee(emp)}>Edit Employee</Button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </Container>
        </>
    );
}

export default Hr;
