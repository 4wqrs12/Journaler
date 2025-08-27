import { useEffect, useState } from "react";
import styles from "./NewJournalStyles.module.css";

function TimedMessage({ visible, text }) {
  return (
    <div className={`${styles.timedMessage}`}>{visible && <p>{text}</p>}</div>
  );
}

export default TimedMessage;
