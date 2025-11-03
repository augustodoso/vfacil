import { useState } from "react";

export default function ChatWidget() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const API = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

  async function handleSubmit(e) {
    e.preventDefault();
    setResponse("...enviando");

    try {
      const res = await fetch(`${API}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResponse(`Erro ${res.status}: ${data.detail || JSON.stringify(data)}`);
        return;
      }
      setResponse(data.message || "Sem resposta do servidor.");
    } catch (err) {
      console.error(err);
      setResponse(`Falha de conexão: ${err.message}`);
    }
  }

  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        V-Fácil Chatbot 🤖
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
        <input
          className="border p-2 w-80 rounded"
          placeholder="Digite sua pergunta..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-6 rounded hover:bg-blue-700">
          Enviar
        </button>
      </form>

      <p className="mt-4 font-semibold">Resposta: {response}</p>
    </div>
  );
}
