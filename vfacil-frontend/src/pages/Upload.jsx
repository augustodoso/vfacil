// vfacil-frontend/src/pages/Upload.jsx
import { useState } from "react";

// Backend no Render
const API_BASE_URL = "https://aurevix-nfe-api.onrender.com";

function UploadPage() {
  const [file, setFile] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [isAnalysing, setIsAnalysing] = useState(false);

  const [uploadError, setUploadError] = useState("");
  const [iaError, setIaError] = useState("");

  const [lastOcr, setLastOcr] = useState(null);
  const [iaResult, setIaResult] = useState(null);

  const [history, setHistory] = useState([]);

  function handleFileChange(e) {
    const f = e.target.files?.[0];
    setFile(f || null);
    setUploadError("");
    setIaError("");
    setIaResult(null);
  }

  // ========= OCR =========
  async function handleUploadOcr() {
    if (!file) {
      setUploadError("Selecione um arquivo de nota fiscal primeiro.");
      return;
    }

    setIsUploading(true);
    setUploadError("");
    setIaError("");
    setIaResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file); // nome do campo igual ao backend

      const resp = await fetch(`${API_BASE_URL}/notas/upload`, {
        method: "POST",
        body: formData,
        mode: "cors",
        credentials: "omit",
      });

      if (!resp.ok) {
        const txt = await resp.text();
        console.error("Erro backend OCR:", resp.status, txt);
        throw new Error(`Erro HTTP ${resp.status}`);
      }

      const data = await resp.json();
      console.log("Resposta OCR:", data);

      const ocrResumo = {
        arquivo: data.arquivo ?? file.name,
        cnpj: data.dados?.CNPJ ?? "não identificado",
        valor: data.dados?.Valor ?? "não identificado",
        data: data.dados?.Data ?? "não identificada",
        texto_ocr: data.texto ?? data.texto_ocr ?? "",
        processado_em: data.processado_em ?? new Date().toISOString(),
      };

      setLastOcr(ocrResumo);
      setHistory((prev) => [ocrResumo, ...prev]);
    } catch (err) {
      console.error("ERRO NO OCR:", err);
      setUploadError("Erro ao enviar o arquivo para OCR.");
    } finally {
      setIsUploading(false);
    }
  }

  // ========= IA =========
  async function handleAnaliseIA() {
    setIaError("");
    setIaResult(null);

    if (!lastOcr) {
      setIaError("Primeiro envie a nota para OCR.");
      return;
    }

    const textoParaIA =
      lastOcr.texto_ocr && lastOcr.texto_ocr.trim().length > 0
        ? lastOcr.texto_ocr
        : `
CNPJ: ${lastOcr.cnpj}
Valor total: ${lastOcr.valor}
Data de emissão: ${lastOcr.data}
`;

    setIsAnalysing(true);

    try {
      const resp = await fetch(`${API_BASE_URL}/notas/analisar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texto: textoParaIA }),
        mode: "cors",
        credentials: "omit",
      });

      if (!resp.ok) {
        const txt = await resp.text();
        console.error("Erro backend IA:", resp.status, txt);
        throw new Error(`Erro HTTP ${resp.status}`);
      }

      const data = await resp.json();
      console.log("Resposta IA:", data);

      if (data.erro) {
        setIaError(data.erro);
        setIaResult(null);
      } else {
        const resultado = data.resultado ?? data;

        setIaResult({
          empresa: resultado.empresa ?? "N/A",
          cnpj: resultado.cnpj ?? "N/A",
          data_emissao: resultado.data_emissao ?? "N/A",
          valor_total: resultado.valor_total ?? "N/A",
          categoria_gasto: resultado.categoria_gasto ?? "N/A",
          observacoes: resultado.observacoes ?? "N/A",
        });
      }
    } catch (err) {
      console.error("ERRO NA IA:", err);
      setIaError("Erro ao analisar a nota com IA.");
      setIaResult(null);
    } finally {
      setIsAnalysing(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-8">
      <main className="w-full max-w-4xl bg-neutral-900 rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Upload de Nota Fiscal
        </h2>

        {/* Upload */}
        <div className="flex flex-col gap-4 mb-6">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-purple-600 file:text-white
                       hover:file:bg-purple-700
                       cursor-pointer"
          />

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={handleUploadOcr}
              disabled={isUploading || !file}
              className={`flex-1 py-3 rounded-full font-semibold
                          transition-colors ${
                            isUploading || !file
                              ? "bg-purple-900 text-gray-500 cursor-not-allowed"
                              : "bg-purple-600 hover:bg-purple-700"
                          }`}
            >
              {isUploading ? "Processando OCR..." : "Enviar Nota (OCR)"}
            </button>

            <button
              onClick={handleAnaliseIA}
              disabled={isAnalysing || !lastOcr}
              className={`flex-1 py-3 rounded-full font-semibold
                          transition-colors ${
                            isAnalysing || !lastOcr
                              ? "bg-fuchsia-900 text-gray-500 cursor-not-allowed"
                              : "bg-fuchsia-600 hover:bg-fuchsia-700"
                          }`}
            >
              {isAnalysing ? "Analisando com IA..." : "Analisar com IA (GenAI)"}
            </button>
          </div>

          {uploadError && (
            <p className="text-red-400 text-sm text-center">{uploadError}</p>
          )}
          {iaError && (
            <p className="text-red-400 text-sm text-center">{iaError}</p>
          )}
        </div>

        {/* Último Resultado OCR */}
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-3">
            Último Resultado (OCR):
          </h3>
          <div className="bg-neutral-800 rounded-xl p-4 text-sm">
            {lastOcr ? (
              <>
                <p>
                  <span className="font-semibold">Arquivo:</span>{" "}
                  {lastOcr.arquivo}
                </p>
                <p>
                  <span className="font-semibold">CNPJ:</span> {lastOcr.cnpj}
                </p>
                <p>
                  <span className="font-semibold">Valor:</span> {lastOcr.valor}
                </p>
                <p>
                  <span className="font-semibold">Data:</span> {lastOcr.data}
                </p>
              </>
            ) : (
              <p className="text-gray-400">
                Envie uma nota para ver o resultado do OCR.
              </p>
            )}
          </div>
        </section>

        {/* Análise Inteligente (IA) */}
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-3">
            Análise Inteligente (IA)
          </h3>
          <div className="bg-neutral-800 rounded-xl p-4 text-sm">
            {iaResult ? (
              <>
                <p>
                  <span className="font-semibold">Empresa:</span>{" "}
                  {iaResult.empresa}
                </p>
                <p>
                  <span className="font-semibold">CNPJ:</span>{" "}
                  {iaResult.cnpj}
                </p>
                <p>
                  <span className="font-semibold">Data de emissão:</span>{" "}
                  {iaResult.data_emissao}
                </p>
                <p>
                  <span className="font-semibold">Valor total:</span>{" "}
                  {iaResult.valor_total}
                </p>
                <p>
                  <span className="font-semibold">Categoria de gasto:</span>{" "}
                  {iaResult.categoria_gasto}
                </p>
                <p>
                  <span className="font-semibold">Observações da IA:</span>{" "}
                  {iaResult.observacoes}
                </p>
              </>
            ) : (
              <p className="text-gray-400">
                Clique em{" "}
                <span className="font-semibold">"Analisar com IA"</span> após o
                OCR para ver a análise inteligente da nota.
              </p>
            )}
          </div>
        </section>

        {/* Histórico */}
        <section className="mt-10">
          <h3 className="text-xl font-semibold mb-3">
            Histórico de notas processadas
          </h3>

          <div className="bg-neutral-800 rounded-xl p-4 text-sm overflow-x-auto">
            {history.length === 0 ? (
              <p className="text-gray-400">Nenhuma nota processada ainda.</p>
            ) : (
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="text-gray-400 border-b border-neutral-700">
                  <tr>
                    <th className="py-2 pr-4">Arquivo</th>
                    <th className="py-2 pr-4">CNPJ</th>
                    <th className="py-2 pr-4">Valor</th>
                    <th className="py-2 pr-4">Data</th>
                    <th className="py-2 pr-4">Processado em</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-neutral-700/60 last:border-none"
                    >
                      <td className="py-2 pr-4">{item.arquivo}</td>
                      <td className="py-2 pr-4">{item.cnpj}</td>
                      <td className="py-2 pr-4">{item.valor}</td>
                      <td className="py-2 pr-4">{item.data}</td>
                      <td className="py-2 pr-4">{item.processado_em}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default UploadPage;
