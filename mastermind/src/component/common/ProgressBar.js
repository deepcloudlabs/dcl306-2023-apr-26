// stateless component -> function -> NO this.state
// props -> value,pbColor, pbWidth
export default function ProgressBar({value,pbColor, pbWidth}){
    return (
        <div className="progress">
            <div className={pbColor}
                 style={{width: pbWidth}}>*** {value} ***</div>
        </div>
    );
}