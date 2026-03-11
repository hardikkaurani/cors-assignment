import { useState } from "react";

export default function ConnectionTest() {

  const [a, b] = useState("");

  const c = async () => {
    try {
      const d = await fetch("/api/test"); 
      const e = await d.json();
      b(e.msg);
    } 
    catch {
      b("Connection failed ❌");
    }
  };

  return (
    <div>
      <h2>Backend Connection Test</h2>

      <button onClick={c}>Test Connection</button>

      <p>{a}</p>
    </div>
  );
}