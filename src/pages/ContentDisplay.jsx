// src/pages/ContentDisplay.jsx
import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function ContentDisplay() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "communityContent"), (snapshot) => {
      const approvedPosts = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((post) => post.status === "approved");
      setPosts(approvedPosts);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-900 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <p className="text-gray-400 mb-2">By {post.name}</p>
          {post.link && (
            <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-yellow-500">
              Visit Link
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
