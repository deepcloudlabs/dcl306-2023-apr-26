export default function Button({label, id, className, action}) {
    return (
        <button className={"btn ".concat(className)}
                id={id}
                onClick={action}>{label}</button>
    );
}