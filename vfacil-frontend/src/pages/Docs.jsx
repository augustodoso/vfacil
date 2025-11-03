import { useEffect, useState } from "react";

export default function Docs() {
  const API = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/docs`);
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`HTTP ${res.status} - ${txt}`);
        }
        const data = await res.json();
        setDocs(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setErr("Falha ao carregar documentos.");
        setDocs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Documentos</h1>

      {loading && <p>Carregando…</p>}
      {err && <p className="text-red-600">{err}</p>}

      {!loading && !err && (
        <ul className="divide-y border rounded">
          {docs.length > 0 ? (
            docs.map((d) => (
              <li key={d.id} className="p-3 flex justify-between">
                <span>{d.nome}</span>
                <span className="text-gray-500">
                  {typeof d.valor === "number" ? `R$ ${d.valor.toFixed(2)}` : d.valor}
                </span>
              </li>
            ))
          ) : (
            <li className="p-3 text-gray-500">Nenhum documento.</li>
          )}
        </ul>
      )}
    </div>
  );
}
