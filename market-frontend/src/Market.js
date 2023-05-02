import React, {useEffect, useState} from "react";
import Container from "./component/common/Container";
import CardHeader from "./component/common/CardHeader";
import Card from "./component/common/Card";
import CardBody from "./component/common/CardBody";
import SelectBox from "./component/common/SelectBox";
import Button from "./component/common/Button";
import io from "socket.io-client";
import MarketDataTable from "./component/market/MarketDataTable";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, Tooltip, Legend, LinearScale, LineElement, PointElement, Title} from "chart.js";

const socket = io("ws://localhost:5555");
const options = {
    responsive: false,
    animation: false,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'BINANCE Market Data',
        }
    }
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
function Market() {
    const [trades, setTrades] = useState([]);
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [symbols, setSymbols] = useState([]);
    const [windowSize, setWindowSize] = useState(50);
    const [connected, setConnected] = useState(false);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'BTC-USDT Price',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderDashOffset: 0.0,
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }]
    });
    function connect() {
        setConnected(true);
    }

    function disconnect() {
        setConnected(false);
    }

    function handleChange(e) {
        switch (e.target.name) {
            case "windowSize":
                setWindowSize(e.target.value);
                break;
            case "symbol":
                setSymbol(e.target.value);
                break;
        }
    }

    useEffect(() => {
        fetch("https://api.binance.com/api/v3/ticker/price", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then(tickers => {
                let listOfSymbols = tickers.map(ticker => ticker.symbol);
                listOfSymbols.sort();
                setSymbols(listOfSymbols);
            })
    }, []);
    useEffect(() => {
        socket.on("trade", (trade) => {
            let newTrades = [...trades, trade];
            if (newTrades.length > windowSize){
                newTrades = newTrades.slice(newTrades.length-windowSize);
            }
            setTrades(newTrades);
            const newChartData = {...chartData};
            newChartData.datasets = [...chartData.datasets];
            newChartData.datasets[0].data = [...chartData.datasets[0].data, Number(trade.price)]
            if (newChartData.datasets[0].data.length > windowSize){
                newChartData.datasets[0].data.splice(0,newChartData.datasets[0].data.length - windowSize);
            }
            newChartData.labels = [...chartData.labels, trade.timestamp];
            if (newChartData.labels.length > windowSize){
                newChartData.labels.splice(0,newChartData.labels.length - windowSize);
            }
            setChartData(newChartData);
        })
    })
    let connectionButton = <Button action={disconnect}
                                   label="Disconnect"
                                   className="btn-danger"
                                   id="btn-connect"></Button>;
    if (!connected)
        connectionButton = <Button action={connect}
                                   label="Connect"
                                   className="btn-success"
                                   id="btn-connect"></Button>;
    return (
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Market"></CardHeader>
                <CardBody>
                    <div className="mt-3">
                        <SelectBox value={symbol}
                                   id="symbol"
                                   label="Symbol"
                                   handleChange={handleChange}
                                   options={symbols}></SelectBox>
                        {connectionButton}
                    </div>
                    <div className="mt-3">
                        <SelectBox value={windowSize}
                                   id="windowSize"
                                   label="Window Size"
                                   handleChange={handleChange}
                                   options={[10,25,50,100]}></SelectBox>
                    </div>
                </CardBody>
            </Card>
            <p></p>
            <Card>
                <CardHeader title="Market Chart"></CardHeader>
                <CardBody>
                    <Line data={chartData}
                          width={640}
                          height={480}
                          options={options}></Line>
                </CardBody>
            </Card>
            <p></p>
            <MarketDataTable trades={trades}></MarketDataTable>
        </Container>
    );
}

export default Market;
