export default function InputType({label, id, value, handleChange}) {
    return (
        <div className="form-floating">
            <input type="text"
                   className="form-control"
                   id={id}
                   name={id}
                   value={value}
                   onChange={handleChange}></input>
            <label htmlFor={id}>{label}</label>
        </div>
    );
}