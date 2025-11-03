import { useState } from "react";

export default function Upload() {
  const API = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const send = async (e) => {
    e.preventDefault();
    if (!file) return setMsg("Selecione um arquivo.");
    setMsg("Enviando...");

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch(`${API}/api/upload`, { method: "POST", body: form });
      const data = await res.json();
      setMsg(`OK: ${data.filename} (${data.bytes} bytes)`);
    } catch (err) {
      setMsg("Falha no upload.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Upload de PDF</h1>
      <form onSubmit={send} className="flex items-center gap-3">
        <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0] || null)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}
