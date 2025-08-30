import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

import robot from "../assets/min.png";

export default function Home() {
  return (
    <div className={styles.wrapper} aria-label="AI Study Buddy Home">
      <div className={styles.center}>
        <div className={styles.card}>
          <div className={styles.imgWrap}>
            <img
              className={styles.robot}
              alt="Animated AI character"
              src={robot}
            />
          </div>

          <h1 className={styles.title}>
            Your hilarious AI Study Buddy is here!
          </h1>

          <p className={styles.subtitle}>
            Because who said studying has to be a drag? Let’s turn those cram sessions into laugh sessions.
          </p>

          <div className={styles.actions}>
            <Link to="/study" className={styles.cta}>
              Let the shenanigans begin!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
