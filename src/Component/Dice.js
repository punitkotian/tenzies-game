import React from "react";
import "./Dice.css";
import { nanoid } from "nanoid";


export default function Dice(props) {
    const styleBg = {
        backgroundColor: props.isHeld ? "#7e734b" : "#69000b",
    };
    const styleGrid = {
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
    };

    function createDots(ndots, classObj) {
    const arrDots = [];

    for (let i = 0; i < ndots; i++) {
        const dotClasses = `dice-dot ${classObj.length ? classObj[i] : ''}`
        arrDots.push(<div className={dotClasses} key={nanoid()}></div>);
    }
    return arrDots;
    }

    function placeDots(ndots) {
    const classObj = {
        id_1: ["mid"],
        id_2: ["top-right", "bottom-left"],
        id_3: ["top-right", "mid", "bottom-left"],
        id_5: ["top-right", "top-left", "mid", "bottom-right", "bottom-left"],
    };

    if (ndots === 4 || ndots === 6) {
        styleGrid["gridTemplateColumns"] = "repeat(2, 1fr)";
        styleGrid["gridTemplateRows"] = `repeat(${ndots / 2}, 1fr)`;
        return createDots(ndots, []);
    }

    return createDots(ndots, classObj[`id_${ndots}`]);
    }

    const elem = placeDots(props.value);

    return (
    <div
        className="dice-face"
        style={{ ...styleBg, ...styleGrid }}
        onClick={props.holdDice}
    >
        {elem}
    </div>
    );
}
