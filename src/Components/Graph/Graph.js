import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

let logicJS = (brd) => {
    brd.suspendUpdate();

    // main kaj
    var p1 = brd.create('point', [-1, 1], { size: 2 });
    var p2 = brd.create('point', [5, -2], { size: 2 });

    var s = brd.create('segment', [p1, p2], { dash: function () { return (p1.X() < p2.X()) ? 0 : 1 } });
    // main kaj


    brd.unsuspendUpdate();
}

const Graph = () => {
    return (
        <div>
            <JXGBoard
                logic={logicJS}
                boardAttributes={{ axis: true, boundingbox: [-5, 5, 7, -3] }}
                style={{
                    border: "3px solid red"
                }}
            />
        </div>
    )
};

export default Graph;