// src/pages/Home.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#16a34a",
        padding: "40px 16px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: 720,
          textAlign: "center",
          color: "white",
        }}
      >
        <img
          src="/robot.png" /* положи иконку в public/robot.png или убери */
          alt=""
          style={{ width: 140, height: 140, objectFit: "contain", margin: "0 auto 24px" }}
        />
        <h1 style={{ fontSize: 44, margin: "0 0 12px", lineHeight: 1.1 }}>
          Your hilarious AI Study Buddy is here!
        </h1>
        <p style={{ opacity: 0.9, maxWidth: 560, margin: "0 auto 24px" }}>
          Because who said studying has to be a drag? Let’s turn those cram sessions into laugh sessions.
        </p>

        <Link
          to="/study"
          style={{
            display: "inline-block",
            padding: "12px 20px",
            background: "black",
            color: "white",
            borderRadius: 999,
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Let the shenanigans begin!
        </Link>
      </motion.div>
    </div>
  );
}
