import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "../components/FadeInSection";
import { api } from "../lib/axios";

type Post = { id: number; title: string; body: string };

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    api
      .get<Post[]>("/posts", { signal: controller.signal })
      .then((r) => setPosts(r.data.slice(0, 5)))
      .catch((e) => {
        if (e.name !== "CanceledError") setError(e.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 16px" }}>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Vite + React + Axios + Framer Motion
      </motion.h1>

      <FadeInSection>
        <p>Below we fetch posts from an API and animate the list items.</p>
      </FadeInSection>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

      <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
        <AnimatePresence>
          {posts.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              style={{
                padding: "12px 16px",
                marginBottom: 10,
                border: "1px solid #eee",
                borderRadius: 10,
              }}
            >
              <strong>{p.title}</strong>
              <div style={{ opacity: 0.7 }}>{p.body}</div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
