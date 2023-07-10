import React from "react";
import styles from "./Rooms.module.css";
import RoomCard from "../../components/RoomCard/RoomCard";

// Dummy data (from backend)
const rooms = [
  {
    id: 1,
    topic: "which is best frame work?",
    speakers: [
      {
        id: 1,
        name: "jonh doe",
        avatar: "/images/mic.png",
      },
      {
        id: 2,
        name: "saar",
        avatar: "/images/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 2,
    topic: "which is best frame work?",
    speakers: [
      {
        id: 1,
        name: "jonh doe",
        avatar: "/images/monkey-avatar.png",
      },
      {
        id: 2,
        name: "saar",
        avatar: "/images/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 3,
    topic: "which is best frame work?",
    speakers: [
      {
        id: 1,
        name: "jonh doe",
        avatar: "/images/monkey-avatar.png",
      },
      {
        id: 2,
        name: "saar",
        avatar: "/images/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 4,
    topic: "which is best frame work?",
    speakers: [
      {
        id: 1,
        name: "jonh doe",
        avatar: "/images/monkey-avatar.png",
      },
      {
        id: 2,
        name: "saar",
        avatar: "/images/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 5,
    topic: "which is best frame work?",
    speakers: [
      {
        id: 1,
        name: "jonh doe",
        avatar: "/images/monkey-avatar.png",
      },
      {
        id: 2,
        name: "saar",
        avatar: "/images/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
];

const Rooms = () => {
  return (
    <>
      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice rooms</span>
            <div className={styles.searchBox}>
              <img src="/images/search-icon.png" alt="search" />
              <input type="text" className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.startRoomButton}>
              <img src="/images/add-room-icon.png" alt="start-room" />
              <span>Start a room</span>
            </div>
          </div>
        </div>
        {/* Iterate through every rooms */}
        <div className={styles.roomList}>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Rooms;
