import React from "react";
import Dice from "./Component/Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
// import './App.css';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {

    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = allHeld ? dice.every(die => die.value === firstValue) : false
    
    if (allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function allNewDice() {
    const newDice = []
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
    }
  }

  function rollDice() {
    if (!tenzies === true) {
      setDice(oldDice => oldDice.map(die => ({
        ...die, value : die.isHeld ? die.value : generateRandomNum()
      })));
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice((ps) => ps.map(curr_die  => {
      return curr_die.id === id ? {...curr_die, isHeld: !curr_die.isHeld} : curr_die
    }));
  }

  const diceElements = dice.map((obj, index) => {
    return (
      <Dice
        value={obj.value}
        isHeld={obj.isHeld}
        key={obj.id}
        holdDice={(event) => holdDice(obj.id)}

      />
    ); 
  });
  
  return (
    <main>
      { tenzies && <Confetti/> }
      <h1 className="title">Tenzies</h1>
      <p className="instruction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        { !tenzies ? 'Roll' : 'New Game' }
      </button>
    </main>
  );
}
