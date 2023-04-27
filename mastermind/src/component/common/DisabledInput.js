export default function DisabledInput({id,label,name,value}){
    return (
        <div className="form-floating">
            <input type="number"
                   className="form-control"
                   id={id}
                   disabled
                   name={name}
                   value={value}/>
            <label htmlFor={id}>{label}</label>
        </div>
    );
}