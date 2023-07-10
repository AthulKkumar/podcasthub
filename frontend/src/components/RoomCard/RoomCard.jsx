import React from "react";
import styles from "./RoomCard.module.css";

const RoomCard = ({ room }) => {
  return (
    <div className={styles.card}>
      <div className={styles.topic}>{room.topic}</div>
      <div className={styles.speakers}>
        <div className={styles.avatars}>
          {/* prints the avatar of speakers */}
          {room.speakers.map((speaker) => {
            return <img src={speaker.avatar} alt="speaker-avatar" />;
          })}
        </div>
        <div className={styles.names}>
          {/*  Where prints the names of the speakers */}
          {room.speakers.map((speaker) => {
            return (
              <div className={styles.nameWrapper}>
                <span>{speaker.name}</span>
                <img src="/images/chat-bubble.png" alt="chat-bubble" />
              </div>
            );
          })}
        </div>
      </div>
      {/* Print the total no of peoples */}
      <div className={styles.peopleCount}>
        <span>{room.totalPeople}</span>
        <img src="/images/user-icon.png" alt="user-icon" />
      </div>
    </div>
  );
};

export default RoomCard;
