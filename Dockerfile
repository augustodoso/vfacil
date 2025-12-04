# Imagem base
FROM python:3.11-slim

# Diretório de trabalho dentro do container
WORKDIR /app

# ---- Dependências de sistema (Tesseract + libs) ----
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-por \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

# ---- Dependências Python ----
# Aqui assumo que o requirements.txt está NA RAIZ do repo (igual ao Dockerfile)
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# ---- Código do backend ----
# Copia a pasta vfacil inteira (onde está vfacil_api, utils, etc.)
COPY vfacil ./vfacil

# Porta usada pelo Uvicorn
EXPOSE 8000

# ---- Comando para subir a API ----
# Caminho do app FastAPI: vfacil/vfacil_api/main.py  ->  vfacil.vfacil_api.main:app
CMD ["uvicorn", "vfacil.vfacil_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
