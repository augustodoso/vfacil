# vfacil/vfacil_api/main.py

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# IMPORTS CORRIGIDOS (RELATIVOS)
from .services.ocr_service import processar_nota, extrair_texto
from .services.genai_service import analisar_texto_nota


app = FastAPI(
    title="Aurevix NFE API",
    version="0.2.0",
    description="API para upload de notas fiscais, OCR e análise com GenAI.",
)

# -----------------------------------------------------------
# CORS – libera o frontend (Vite) em http://localhost:5173
# -----------------------------------------------------------
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------------------------------------
# Health check
# -----------------------------------------------------------
@app.get("/health")
def health_check():
    return {"status": "ok", "service": "aurevix-nfe-api"}


# -----------------------------------------------------------
# MODELO P/ ROTA GENAI
# -----------------------------------------------------------
class NotaTexto(BaseModel):
    texto: str


# -----------------------------------------------------------
# ROTA: UPLOAD DA NOTA (OCR)
# -----------------------------------------------------------
@app.post("/notas/upload")
async def upload_nota(file: UploadFile = File(...)):
    """
    Recebe a imagem da nota, roda OCR e devolve:
    - nome do arquivo
    - texto extraído (texto_ocr)
    - dados básicos (CNPJ, Valor, Data)
    """
    conteudo = await file.read()

    # texto bruto da nota
    texto = extrair_texto(conteudo)

    # dicionário com CNPJ, Valor, Data, etc.
    dados = processar_nota(conteudo)

    return {
        "arquivo": file.filename,
        "texto_ocr": texto,
        "dados": dados,
    }


# -----------------------------------------------------------
# ROTA: ANÁLISE COM IA (GENAI)
# -----------------------------------------------------------
@app.post("/notas/analisar")
async def analisar_nota_genai(payload: NotaTexto):
    """
    Recebe um JSON {"texto": "..."} com o texto da nota
    e devolve a análise inteligente feita pela IA.
    """
    resultado = analisar_texto_nota(payload.texto)
    return resultado
