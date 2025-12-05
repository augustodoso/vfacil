# Imagem base do Python
FROM python:3.11-slim

# Pasta de trabalho base
WORKDIR /app

# --- (OPCIONAL, mas RECOMENDADO) ---
# Instala o Tesseract dentro do container para o OCR funcionar
RUN apt-get update && apt-get install -y tesseract-ocr && rm -rf /var/lib/apt/lists/*
# ------------------------------------

# Copia o requirements.txt da raiz do repo para o container
COPY requirements.txt .

# Instala as dependências do backend
RUN pip install --no-cache-dir -r requirements.txt

# Copia TODO o código do repositório pra dentro do container
COPY . .

# Agora mudamos o diretório de trabalho para dentro da pasta do backend
# Fica exatamente como você roda localmente (cd vfacil)
WORKDIR /app/vfacil

# Expõe a porta usada pela API
EXPOSE 8000

# Sobe a API FastAPI com Uvicorn
# Aqui usamos o mesmo módulo que você usa localmente
CMD ["uvicorn", "vfacil_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
