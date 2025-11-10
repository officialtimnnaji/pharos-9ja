// src/utils/FixContentStatus.jsx
import React, { useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function FixContentStatus() {
  useEffect(() => {
    const fixStatuses = async () => {
      try {
        const snapshot = await getDocs(collection(db, "communityContent"));
        let fixedCount = 0;

        for (const docSnap of snapshot.docs) {
          const data = docSnap.data();
          const currentStatus = data.status?.toLowerCase();

          if (currentStatus && currentStatus !== "approved") {
            console.log(`🛠 Fixing ${docSnap.id}:`, data.status);
            await updateDoc(doc(db, "communityContent", docSnap.id), {
              status: "approved",
            });
            fixedCount++;
          }
        }

        console.log(`✅ Done! ${fixedCount} documents updated.`);
        alert(`✅ Done! ${fixedCount} documents updated to 'approved'.`);
      } catch (error) {
        console.error("❌ Error fixing statuses:", error);
        alert("❌ Something went wrong. Check console for details.");
      }
    };

    fixStatuses();
  }, []);

  return (
    <div className="text-center mt-40 text-white">
      <h1 className="text-3xl font-bold mb-4">Fixing Content Status...</h1>
      <p>Check the console for progress logs.</p>
    </div>
  );
}
