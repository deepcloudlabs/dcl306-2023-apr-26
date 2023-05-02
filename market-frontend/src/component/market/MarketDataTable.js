import Card from "../common/Card";
import CardHeader from "../common/CardHeader";
import CardBody from "../common/CardBody";

export default function MarketDataTable({trades}){
    return(
        <Card>
            <CardHeader title="Trades"></CardHeader>
            <CardBody>
                <table className="table table-bordered table-responsive table-hover table-striped">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Volume</th>
                        <th>Timestamp</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        trades.map( (trade,index) =>
                            <tr key={trade.timestamp.toString().concat(index.toString())}>
                                <td>{index+1}</td>
                                <td>{trade.price}</td>
                                <td>{trade.quantity}</td>
                                <td>{Number(trade.price)*Number(trade.quantity)}</td>
                                <td>{trade.timestamp}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}