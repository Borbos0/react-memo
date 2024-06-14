import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useModeContext } from "../../components/Context/useModeContext";
import { useState } from "react";
import cn from "classnames";

export function SelectLevelPage() {
  const { isEasyMode, chooseMode } = useModeContext();
  const [difficult, setDifficult] = useState({});
  const selectDifficult = e => {
    const { name, value } = e.target;
    setDifficult({ ...difficult, [name]: value });
  };

  let number = 3;
  if (difficult.mode === "easy") {
    number = 3;
  }
  if (difficult.mode === "middle") {
    number = 6;
  }
  if (difficult.mode === "hard") {
    number = 9;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <input
            className={styles.levelInput}
            type="radio"
            id="radio1"
            name="mode"
            value="easy"
            onChange={selectDifficult}
          />
          <li className={cn(styles.level, { [styles.active]: number === 3 })}>
            <label className={styles.levelLink} htmlFor="radio1">
              1
            </label>
          </li>
          <input
            className={styles.levelInput}
            type="radio"
            id="radio2"
            name="mode"
            value="middle"
            onChange={selectDifficult}
          />
          <li className={cn(styles.level, { [styles.active]: number === 6 })}>
            <label className={styles.levelLink} htmlFor="radio2">
              2
            </label>
          </li>
          <input
            className={styles.levelInput}
            type="radio"
            id="radio3"
            name="mode"
            value="hard"
            onChange={selectDifficult}
          />
          <li className={cn(styles.level, { [styles.active]: number === 9 })}>
            <label className={styles.levelLink} htmlFor="radio3">
              3
            </label>
          </li>
        </ul>
        <Link to={`/game/${number}`}>
          <button className={styles.startBtn}>Старт</button>
        </Link>
        <div className={styles.mode}>
          <label className={styles.modeText}>
            <input className={styles.modeInput} type="checkbox" checked={isEasyMode} onChange={e => chooseMode()} />
            Упрощенный режим
            <br />
            {isEasyMode ? <p>(у вас будет 3 жизни)</p> : ""}
          </label>
        </div>
        <div>
          <Link to={"/leaderboard"}>
            <p className={styles.leaderboard}>Перейти к лидерборду</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
