import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import MastermindHook from "./MastermindHook";
import {Route, Routes} from "react-router";
import PlayerWins from "./wins/PlayerWins";
import PlayerLoses from "./loses/PlayerLoses";
import {BrowserRouter} from "react-router-dom";

const routing =
    <Routes>
         <Route path="/" element={<MastermindHook></MastermindHook>}></Route>
         <Route path="/wins" element={<PlayerWins></PlayerWins>}></Route>
         <Route path="/loses" element={<PlayerLoses></PlayerLoses>}></Route>
    </Routes>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        {routing}
    </BrowserRouter>
);
