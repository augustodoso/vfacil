# Imagem base do Python
FROM python:3.11-slim

# Pasta de trabalho base
WORKDIR /app

# (opcional, mas recomendado) instala o Tesseract pra OCR
RUN apt-get update && apt-get install -y tesseract-ocr && rm -rf /var/lib/apt/lists/*

# Copia requirements e instala dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia TODO o código pro container
COPY . .

# ADICIONA /app/vfacil no PYTHONPATH
# Assim o Python consegue fazer "import vfacil_api"
ENV PYTHONPATH="${PYTHONPATH}:/app/vfacil"

# Expõe a porta da API
EXPOSE 8000

# Sobe a API FastAPI com Uvicorn
CMD ["uvicorn", "vfacil_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
