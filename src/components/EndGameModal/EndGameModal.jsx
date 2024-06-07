import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { postLeaderboard } from "../../utils/api";
import { Link } from "react-router-dom";
import { useState } from "react";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick, isLeader }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState(false);

  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;
  const imgSrcLeader = isLeader ? celebrationImageUrl : "";

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";
  const imgAltLeader = isLeader ? "celebration emodji" : "";

  const gameTime = gameDurationMinutes * 60 + gameDurationSeconds;

  const postLeader = async event => {
    event.preventDefault();
    const data = { name: name, time: gameTime };
    postLeaderboard(data);
    setMessage(true);
  };
  return (
    <>
      {isLeader ? (
        <div className={styles.modal}>
          <div className={styles.mainContainer}>
            <img className={styles.image} src={imgSrcLeader} alt={imgAltLeader} />
            <h2 className={styles.title}>Вы попали на Лидерборд!</h2>
            <input
              className={styles.inputLeaderName}
              type="text"
              name="name"
              value={name}
              defaultValue={"Пользователь"}
              onChange={e => setName(e.target.value)}
              placeholder="Пользователь"
            ></input>
            <p className={styles.description}>Затраченное время:</p>
            <div className={styles.time}>
              {gameDurationMinutes.toString().padStart("2", "0")}:{gameDurationSeconds.toString().padStart("2", "0")}
            </div>
            {message ? (
              <>
                <Link to="/">
                  <Button>Играть снова</Button>
                </Link>
                <p className={styles.leaderMessage}>Результат отправлен!</p>
              </>
            ) : (
              <Button onClick={postLeader}>Отправить результат</Button>
            )}
            <Link to="/leaderboard">
              <p className={styles.linkToLeaderboard}>Перейти к лидерборду</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.modal}>
          <img className={styles.image} src={imgSrc} alt={imgAlt} />
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>Затраченное время:</p>
          <div className={styles.time}>
            {gameDurationMinutes.toString().padStart("2", "0")}:{gameDurationSeconds.toString().padStart("2", "0")}
          </div>
          <Button onClick={onClick}>Начать сначала</Button>
        </div>
      )}
    </>
  );
}
