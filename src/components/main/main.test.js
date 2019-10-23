import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom';
import nock from 'nock';
import { wait, getByText } from "@testing-library/react";
import Main from './main'
import {fakeResponse} from './main.fakedata.js';

let container = null;


it('renders without crashing', async() => {
    const scope = nock('https://api.carbonintensity.org.uk')
        .get('/generation')
        .reply(200, fakeResponse, { 
            'Access-Control-Allow-Origin': '*', 
            'Content-type': 'application/json' 
          });

    const div = document.createElement('div');

    
    render(<Main />, div);
    
    expect(div.querySelector("div").getAttribute("class")).toBe("loader");
    await wait (() => getByText(div, "Number of results", { exact: false }));
    // Let's test if the data actually gets loaded
    expect(div.querySelector("div").getAttribute("class")).toBe("component-main");

    unmountComponentAtNode(div);

}, 30000);