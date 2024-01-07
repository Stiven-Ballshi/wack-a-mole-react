import { useEffect, useState } from "react";

import hole from "./assets/hole.png";
import mole from "./assets/mole.png";

import "./App.css";

function App() {
  const [holes, setHoles] = useState<boolean[]>(new Array(9).fill(true));
  const [score, setScore] = useState(0);

  const moleVisibility = (idx: number, isVisible: boolean) => {
    const newHoles = [...holes];
    newHoles[idx] = isVisible;
    setHoles(newHoles);
  };

  const handleClick = (idx: number) => {
    if (holes[idx]) return;
    moleVisibility(idx, true);
    setScore(score + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPos = Math.floor(Math.random() * holes.length);
      moleVisibility(randomPos, false);

      setTimeout(() => {
        moleVisibility(randomPos, true);
      }, 1000);
    }, 2000);

    return () => clearInterval(interval);
  }, [holes]);

  return (
    <>
      <h1 className="title">Your score is : {score}</h1>

      <div className="img-container">
        {holes.map((isHole: any, idx: number) => (
          <img
            onClick={() => handleClick(idx)}
            key={idx}
            src={isHole ? hole : mole}
          />
        ))}
      </div>
    </>
  );
}

export default App;
