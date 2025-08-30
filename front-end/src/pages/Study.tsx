import React from "react";
import styles from "./Study.module.scss";

export default function Study() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg viewBox="0 0 24 24">
            <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10,10-4.48,10-10S17.52,2,12,2ZM13,17h-2v-2h2v2Zm0-4h-2V7h2v6Z" />
          </svg>
          <h1>AI Study Buddy</h1>
        </div>

        <nav className={styles.nav}>
          <a href="#">Home</a>
          <a href="#">Subjects</a>
          <a href="#">Study Sets</a>
        </nav>

        <div className={styles.userSection}>
          <button className={styles.helpBtn}>
            <svg viewBox="0 0 256 256">
              <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
            </svg>
          </button>
          <div
            className={styles.avatar}
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXu...")',
            }}
          />
        </div>
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
          <p className={styles.uploadTitle}>Slingshot your notes into the void!</p>
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
      </main>
    </div>
  );
}

