// https://codesandbox.io/s/heuristic-oskar-kwl78?file=/src/App.js:1435-1448

import "./styles.css";
import React, {
  Fragment,
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo
} from "react";

function Solution() {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && total) {
      interval = setInterval(() => {
        setTotal((total) => total - 1);
      }, 1000);
    } else if (!isActive || !total) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, total]);

  const startHandle = useCallback(() => {
    setTotal(minutes * 60 + Number(seconds));
    setIsActive(true);
  }, [minutes, seconds]);

  const stopHandle = useCallback(() => {
    setIsActive((isActive) => !isActive);
  }, []);

  const resetHandle = useCallback(() => {
    setSeconds(0);
    setMinutes(0);
    setTotal(0);
    setIsActive(false);
  }, []);

  const time = useMemo(() => {
    const sec = total % 60 >= 10 ? `${total % 60}` : `0${total % 60}`;
    const rest = (total - sec) / 60;
    const min = rest >= 10 ? `${rest}` : `0${rest}`;
    return `${min}:${sec}`;
  }, [total]);

  const minutesHandler = useCallback((e) => {
    setMinutes(e.target.value);
    setIsActive(false);
  }, []);

  const secondsHandler = useCallback((e) => {
    setSeconds(e.target.value);
    setIsActive(false);
  }, []);

  return (
    <Fragment>
      <label>
        <input type="number" onChange={minutesHandler} value={minutes} />
        Minutes
      </label>
      <label>
        <input type="number" onChange={secondsHandler} value={seconds} />
        Seconds
      </label>

      <button onClick={startHandle}>START</button>
      <button onClick={stopHandle}>PAUSE / RESUME</button>
      <button onClick={resetHandle}>RESET</button>

      <h1 data-testid="running-clock">{time}</h1>
    </Fragment>
  );
}

export default memo(Solution);
