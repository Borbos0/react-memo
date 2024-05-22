import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useModeContext } from "../../components/Context/useModeContext";

export function SelectLevelPage() {
  const { isEasyMode, chooseMode } = useModeContext();

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/3">
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/6">
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/9">
              3
            </Link>
          </li>
        </ul>
        <div className={styles.mode}>
          <label className={styles.modeText}>
            <input className={styles.modeInput} type="checkbox" checked={isEasyMode} onChange={e => chooseMode()} />
            Упрощенный режим
            {isEasyMode ? "123" : "456"}
          </label>
        </div>
      </div>
    </div>
  );
}
