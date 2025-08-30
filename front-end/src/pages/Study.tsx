import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Study.module.scss";

import banana from "../assets/banana.png";

export default function Study() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [answer, setAnswer] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setFile(e.target.files[0]);
  }
};

const handleFileUpload = async () => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://127.0.0.1:8000/rag/ingest", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error uploading file");
    }

    const data = await response.json();
    console.log("Uploaded & ingested:", data);
    alert("PDF uploaded successfully");
  } catch (err) {
    console.error(err);
    alert("Upload failed");
  }
};


  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";

    const lineHeight =
      parseInt(window.getComputedStyle(el).lineHeight, 10) || 20;
    const maxAllowedHeight = lineHeight * 5;

    if (el.scrollHeight <= maxAllowedHeight) {
      el.style.overflowY = "hidden";
      el.style.height = el.scrollHeight + "px";
    } else {
      el.style.overflowY = "auto";
      el.style.height = maxAllowedHeight + "px";
    }
  };

  const handleQuerySubmit = async () => {
    const query = textareaRef.current?.value;
    if (!query) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/rag/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: query,
        }),
      });

      if (!response.ok) {
        throw new Error("Error while fetching the answer");
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error("Error fetching the answer:", error);
      setAnswer("Sorry, something went wrong.");
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
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.intro}>
          <h2>Let's Get This Brain Train Rolling!</h2>
          <p>Pick a subject or feed me your study materials. Don’t be shy!</p>
        </div>

        <div className={styles.uploadBox}>
          <div className={styles.uploadIcon}>
            <img src={banana} alt="banana" />
          </div>
          <p className={styles.uploadTitle}>
            Gimme bananaa!
          </p>
          <p className={styles.uploadDesc}>
            Or click to launch your files (PDF, notes, carrier pigeon)
          </p>
          <div className={styles.uploadBox}>
        <input 
            type="file" 
            accept="application/pdf" 
            onChange={handleFileChange} 
        />
  {/* <button className={styles.uploadBtn} onClick={handleFileUpload}>
    Upload Files
  </button> */}
</div>
        </div>

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
            <button className={styles.queryButton} onClick={handleQuerySubmit}>
              Send
            </button>
          </div>
        </section>

        <section className={styles.answerBox}>
          {answer && <p>{answer}</p>}
        </section>
      </main>
    </div>
  );
}
