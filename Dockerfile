# 1) Imagem base
FROM python:3.11-slim

# 2) Instala Tesseract + idioma português
RUN apt-get update && \
    apt-get install -y tesseract-ocr tesseract-ocr-por && \
    rm -rf /var/lib/apt/lists/*

# 3) Diretório de trabalho dentro do container
WORKDIR /app

# 4) Copia o requirements.txt da raiz do projeto
COPY requirements.txt .

# 5) Instala as dependências do backend
RUN pip install --no-cache-dir -r requirements.txt

# 6) Copia apenas a pasta do backend para dentro do container
COPY vfacil ./vfacil

# 7) Ajuste opcional do path de dados do Tesseract (por segurança)
ENV TESSDATA_PREFIX=/usr/share/tesseract-ocr/4.00/tessdata

# 8) Vamos trabalhar de dentro da pasta que tem o main.py
WORKDIR /app/vfacil/vfacil_api

# 9) Expõe a porta usada pelo Uvicorn
EXPOSE 8000

# 10) Sobe a API FastAPI apontando pro main.py local
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
