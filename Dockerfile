# Imagem base com Python 3.11
FROM python:3.11-slim

# Instala Tesseract e o pacote de idioma português
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-por \
    libtesseract-dev \
    && rm -rf /var/lib/apt/lists/*

# Pasta de trabalho dentro do container
WORKDIR /app

# Copia TODO o repositório para dentro do container
COPY . .

# Instala as dependências do backend
# (ajustado para o seu caminho: vfacil/vfacil_api/requirements.txt)
RUN pip install --no-cache-dir -r vfacil_api/requirements.txt

# (Opcional) Ajuste de path dos dados do Tesseract
ENV TESSDATA_PREFIX=/usr/share/tesseract-ocr/4.00/tessdata

# Expõe a porta usada pelo Uvicorn
EXPOSE 8000

# Comando para subir o FastAPI
# Atenção: aqui estou assumindo que a app é vfacil/vfacil_api/main.py -> app
CMD ["uvicorn", "vfacil.vfacil_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
