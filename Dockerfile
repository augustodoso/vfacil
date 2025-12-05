# Imagem base Python
FROM python:3.11-slim

# Pasta de trabalho dentro do container
WORKDIR /app

# Instala o Tesseract e dependências do sistema
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-por \
    libtesseract-dev \
    libgl1 \
 && rm -rf /var/lib/apt/lists/*

# Copia o requirements da RAIZ do repositório
COPY requirements.txt .

# Instala as libs Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia a pasta do backend para dentro do container
# (no GitHub ela é vfacil/vfacil_api, por isso copiamos a pasta vfacil inteira)
COPY vfacil ./vfacil

# Garante que /app está no PYTHONPATH
ENV PYTHONPATH=/app

# Expõe a porta usada pela API
EXPOSE 8000

# Sobe a API FastAPI com Uvicorn
# IMPORTANTE: estrutura de pacotes: vfacil.vfacil_api.main:app
CMD ["uvicorn", "vfacil.vfacil_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
