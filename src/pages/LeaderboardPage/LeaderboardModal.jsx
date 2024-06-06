import { useState } from "react";
import { postLeaderboard } from "../../utils/api";
import styles from "./LeaderboardModal.module.css";
import celebrationImageUrl from "../../components/EndGameModal/images/celebration.png";
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";

export function LeaderboardModal({ isLeader, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState(false);

  const imgSrc = isLeader ? celebrationImageUrl : "";
  const imgAlt = isLeader ? "celebration emodji" : "";
  const gameTime = gameDurationMinutes * 60 + gameDurationSeconds;

  const postLeader = async event => {
    event.preventDefault();
    const data = { name: name, time: gameTime };
    postLeaderboard(data);
    setMessage(true);
  };
  return (
    <div className={styles.modal}>
      <div className={styles.mainContainer}>
        <img className={styles.image} src={imgSrc} alt={imgAlt} />
        <h2 className={styles.title}>Вы попали на Лидерборд!</h2>
        <input
          className={styles.inputLeaderName}
          type="text"
          name="name"
          value={name}
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
  );
}
