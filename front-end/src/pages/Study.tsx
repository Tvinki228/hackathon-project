import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Study.module.scss";

export default function Study() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";

    const lineHeight =
      parseInt(window.getComputedStyle(el).lineHeight, 10) || 20;
    const maxAllowedHeight = lineHeight * 5;

    if (el.scrollHeight <= maxAllowedHeight) {
      el.style.overflowY = "hidden"; // текст вміщається — скрол ховаємо
      el.style.height = el.scrollHeight + "px";
    } else {
      el.style.overflowY = "auto"; // більше 5 рядків — вмикаємо скрол
      el.style.height = maxAllowedHeight + "px";
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg viewBox="0 0 24 24">
            <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10,10-4.48,10-10S17.52,2,12,2ZM13,17h-2v-2h2v2Zm0-4h-2V7h2v6Z" />
          </svg>
          <h1>AILuminate</h1>
        </div>

        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          {/* <a href="#">Subjects</a>
          <a href="#">Study Sets</a> */}
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.intro}>
          <h2>Let's Get This Brain Train Rolling!</h2>
          <p>Pick a subject or feed me your study materials. Don’t be shy!</p>
        </div>

        <div className={styles.uploadBox}>
          <div className={styles.uploadIcon}>
            <svg viewBox="0 0 24 24">
              <path d="M14.5 21H6a2 2 0 0 1-2-2V5a2..."></path>
            </svg>
          </div>
          <p className={styles.uploadTitle}>
            Slingshot your notes into the void!
          </p>
          <p className={styles.uploadDesc}>
            Or click to launch your files (PDF, notes, carrier pigeon)
          </p>
          <button className={styles.uploadBtn}>Upload Files</button>
        </div>

        <section className={styles.subjects}>
          <h3>Or Choose a Popular Subject</h3>
          <div className={styles.grid}>
            <div className={styles.subjectCard}>
              <div className={styles.iconBox}>📜</div>
              <h4>History (aka "The Good Old Days")</h4>
            </div>
            <div className={styles.subjectCard}>
              <div className={styles.iconBox}>⚗️</div>
              <h4>Chemistry (aka "Potion Making 101")</h4>
            </div>
            <div className={styles.subjectCard}>
              <div className={styles.iconBox}>🔢</div>
              <h4>Math (aka "Numbers Go Brrr")</h4>
            </div>
            <div className={styles.subjectCard}>
              <div className={styles.iconBox}>🌍</div>
              <h4>Geography (aka "Where Am I?")</h4>
            </div>
          </div>
        </section>

        <section className={styles.queryBar}>
          <div className={styles.queryContainer}>
            <textarea
              ref={textareaRef}
              type="text"
              placeholder="Enter a query..."
              className={styles.queryInput}
              rows={1}
              onInput={handleInput}
            />
            <button className={styles.queryButton}>Send</button>
          </div>
        </section>
      </main>
    </div>
  );
}
