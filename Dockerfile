# Imagem base do Python
FROM python:3.11-slim

# Pasta de trabalho
WORKDIR /app

# (opcional, mas recomendado) instala Tesseract pra OCR
RUN apt-get update && apt-get install -y tesseract-ocr && rm -rf /var/lib/apt/lists/*

# Copia e instala as dependências do backend
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia SOMENTE o backend para o container
# (pega vfacil/vfacil_api do repositório e coloca em /app/vfacil_api)
COPY vfacil/vfacil_api ./vfacil_api

# Expõe a porta da API
EXPOSE 8000

# Sobe a API FastAPI com Uvicorn
CMD ["uvicorn", "vfacil_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
