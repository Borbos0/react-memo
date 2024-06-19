import { useEffect, useState } from "react";
import { getLeaderboard } from "../../utils/api";
import styles from "./Leaderboard.module.css";
import { Link } from "react-router-dom";
import hardPic from "../../components/EndGameModal/images/hardMode.png";
import powerPic from "../../components/EndGameModal/images/powerMode.png";
import noneHardPic from "../../components/EndGameModal/images/noneHardMode.png";
import nonePowerPic from "../../components/EndGameModal/images/nonePowerMode.png";

export function Leaderboard() {
  const [leaderList, setLeaderList] = useState([]);

  const formatDate = time => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.round(time % 60);
    return `${minutes}:${seconds.toString().padStart("2", "0")}`;
  };

  useEffect(() => {
    getLeaderboard().then(data => {
      const leaderList = data.leaders.map(responseData => {
        const hardMode = responseData.achievements.includes(1);
        const powerMode = responseData.achievements.includes(2);
        return { ...responseData, hardMode, powerMode };
      });
      leaderList.sort((a, b) => a.time - b.time);
      setLeaderList(leaderList);
    });
  }, []);
  return (
    <div className={styles.leaderContainer}>
      <div className={styles.mainBlock}>
        <div className={styles.topContainer}>
          <h1 className={styles.title}>Лидерборд</h1>
          <Link className={styles.startGameBtn} to="/">
            Начать игру
          </Link>
        </div>

        <div className={styles.listContainer}>
          <ul className={styles.levels}>
            <li className={styles.leaderItem}>
              <div className={styles.infoLeaderContainer}>
                <p className={styles.infoAboutLeaderTop}>Позиция</p>
                <p className={styles.infoAboutLeaderTop}>Пользователь</p>
                <p className={styles.infoAboutLeaderTop}>Достижения</p>
                <p className={styles.infoAboutLeaderTop}>Время</p>
              </div>
            </li>
            {leaderList.slice(0, 10).map((value, index) => {
              return (
                <li key={value.id} className={styles.leaderItem}>
                  <div className={styles.infoLeaderContainer}>
                    <p className={styles.infoAboutLeader}> #{index + 1}</p>
                    <p className={styles.infoAboutLeader}>{value.name}</p>
                    <div className={styles.infoAboutAchievements}>
                      {value.hardMode ? (
                        <div className={styles.imageActive} data-title="Игра пройдена в сложном режиме">
                          <img className={styles.imageActive} src={hardPic} alt="Сложный уровень (пройден)" />
                        </div>
                      ) : (
                        <img src={noneHardPic} alt="Сложный уровень (не пройден)" />
                      )}
                      {value.powerMode ? (
                        <div className={styles.imageActive} data-title="Игра пройдена без супер-сил">
                          <img className={styles.imageActive} src={powerPic} alt="Супер силы (пройдено)" />
                        </div>
                      ) : (
                        <img src={nonePowerPic} alt="Супер силы (не пройдено)" />
                      )}
                    </div>
                    <p className={styles.infoAboutLeader}>{formatDate(value.time)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
