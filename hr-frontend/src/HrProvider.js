import {createContext, useContext, useReducer} from "react";
import Hr from "./Hr";
import Employee from "./model/Employee";
import HrReducer from "./reducer/HrReducer";

export const HrContext = createContext(null);
const initialHrState = {
    employee: new Employee(),
    employees: [],
    showDialog: false,
    departments: ["IT", "Sales", "Finance", "HR"]
}

export function useHr() {
    const {hr} = useContext(HrContext);
    return hr;
}
export function useDepartments() {
    const {hr} = useContext(HrContext);
    return hr.departments;
}
export function useShowDialog() {
    const {hr} = useContext(HrContext);
    return hr.showDialog;
}

export function useEmployee() {
    const {hr} = useContext(HrContext);
    return hr.employee;
}

export function useEmployees() {
    const {hr} = useContext(HrContext);
    return hr.employees;
}

export function useDispatchHr() {
    const {dispatchHr} = useContext(HrContext);
    return dispatchHr;
}

export default function HrProvider() {
    const [hr, dispatchHr] = useReducer(HrReducer, initialHrState);
    return (
        <HrContext.Provider value={{hr, dispatchHr}}>
            <Hr/>
        </HrContext.Provider>
    )
}