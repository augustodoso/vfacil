# 1) Imagem base com Python
FROM python:3.11-slim

# 2) Diretório de trabalho dentro do container
WORKDIR /app

# 3) Instala Tesseract + idioma português (pro OCR funcionar)
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-por \
    libtesseract-dev \
 && rm -rf /var/lib/apt/lists/*

# 4) Copia o arquivo de dependências Python
#    (esse requirements.txt deve estar na RAIZ do repo)
COPY requirements.txt .

# 5) Instala as libs Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia o backend
COPY vfacil ./vfacil

# Define a raiz do projeto como diretório de trabalho
WORKDIR /app

# Sobe o FastAPI apontando pro módulo correto
CMD ["uvicorn", "vfacil.vfacil_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
