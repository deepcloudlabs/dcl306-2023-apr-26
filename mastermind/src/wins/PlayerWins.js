import Card from "../component/common/Card";
import CardHeader from "../component/common/CardHeader";
import CardBody from "../component/common/CardBody";
import Container from "../component/common/Container";
import {Link} from "react-router-dom";

export default function PlayerWins() {
    return (
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Player Wins"></CardHeader>
                <CardBody>
                    <Link to="/">Would you like to play again?</Link>
                </CardBody>
            </Card>
        </Container>
    )
}