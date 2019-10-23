import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

import Main from './components/main'

const App = () => (
<Container className="p-3">
    <Jumbotron>
        <h1 className="header">UK Energy Mix</h1> 
        <Main></Main>
    </Jumbotron>
</Container>);

export {
    App
}