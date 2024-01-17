import React from "react";
import Dice from "./Component/Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [numOfRolls, setNumOfRolls] = React.useState(1);
  const [totalTime, setTotalTime] = React.useState(new Date().getTime());
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [bestTime, setBestTime] = React.useState(
    parseFloat(localStorage.getItem("bestTime")) || Infinity
  );
  const [isBestTime, setIsBestTime] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = allHeld
      ? dice.every((die) => die.value === firstValue)
      : false

    if (allSameValue) {
      setTenzies(true);
      const elapsedTime = new Date().getTime() - totalTime
      console.log(elapsedTime)
      setTotalTime(elapsedTime / 1000)
      setIsBestTime(bestTime > elapsedTime)
      if (isBestTime) {
        localStorage.setItem("bestTime", elapsedTime.toString())
        setBestTime(elapsedTime)
      }
    }
  }, [dice]);



  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function generateRandomNum() {
    return Math.floor(Math.random() * 5) + 1;
  }

  function generateNewDie() {
    return {
      value: generateRandomNum(),
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => ({
          ...die,
          value: die.isHeld ? die.value : generateRandomNum(),
        }))
      );
      setNumOfRolls((ps) => ps + 1)
    } else {
      setDice(allNewDice());
      setTenzies(false);
      setNumOfRolls(1);
      setTotalTime(new Date().getTime());
    }
  }

  function holdDice(id) {
    setDice((ps) =>
      ps.map((curr_die) => {
        return curr_die.id === id
          ? { ...curr_die, isHeld: !curr_die.isHeld }
          : curr_die;
      })
    );
  }

  const diceElements = dice.map((obj, index) => {
    return (
      <Dice
        value={obj.value}
        isHeld={obj.isHeld}
        key={obj.id}
        holdDice={() => holdDice(obj.id)}
      />
    );
  });

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instruction">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {!tenzies ? "Roll" : "New Game"}
      </button>
      {tenzies && (
        <p>
          {isBestTime
            ? `Congratulations! You achieved victory in ${numOfRolls} rolls, setting a new record time of ${Math.floor(
                totalTime / 60
              )} minutes and ${Math.round(totalTime % 60)} seconds!`
            : `Congratulations on your win! You completed the game in ${numOfRolls} rolls, taking ${Math.floor(
                totalTime / 60
              )} minutes and ${Math.round(totalTime % 60)} seconds.`}
        </p>
      )}
    </main>
  );
}
