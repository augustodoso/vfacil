FROM python:3.11-slim

WORKDIR /app

# Tesseract para o OCR
RUN apt-get update && apt-get install -y tesseract-ocr && rm -rf /var/lib/apt/lists/*

# Dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# COPIA o backend novo para dentro da imagem
COPY backend/vfacil_api ./vfacil_api

# Porta da API
EXPOSE 8000

# Sobe a API
CMD ["uvicorn", "vfacil_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
