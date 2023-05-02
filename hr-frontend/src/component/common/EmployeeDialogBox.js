import React from "react";
import {Button, Modal} from "react-bootstrap";
import {useDispatchHr, useEmployee, useShowDialog} from "../../HrProvider";
import EmployeeForm from "../hr/EmployeeForm";

export default function EmployeeDialogBox(){
    const employee = useEmployee();
    const showDialog = useShowDialog();
    const dispatchHr = useDispatchHr();
    function closeDialog(e){
        dispatchHr({type: "CLOSE_DIALOG"});
    }
    return(
      <Modal show={showDialog}>
          <Modal.Header closeButton>
             <Modal.Title>{employee.fullname}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <EmployeeForm></EmployeeForm>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="danger">Save</Button>
              <Button variant="primary"
                      onClick={closeDialog}
                      >Close</Button>
          </Modal.Footer>
      </Modal>
    );
}