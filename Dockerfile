# 1) Imagem base com Python 3.11
FROM python:3.11-slim

# 2) Diretório de trabalho dentro do container
WORKDIR /app

# 3) Instala Tesseract (OCR) com suporte a português
RUN apt-get update && \
    apt-get install -y tesseract-ocr tesseract-ocr-por && \
    rm -rf /var/lib/apt/lists/*

# 4) Copia o requirements.txt da RAIZ do repositório
# (é aquele arquivo que já existe aí no teu projeto)
COPY requirements.txt ./requirements.txt

# 5) Instala as libs Python do backend
RUN pip install --no-cache-dir -r requirements.txt

# 6) Copia só o código do backend
COPY vfacil ./vfacil

# 7) Ajuste do path dos dados do Tesseract (igual usamos localmente)
ENV TESSDATA_PREFIX=/usr/share/tesseract-ocr/4.00/tessdata

# 8) Expõe a porta usada pelo Uvicorn
EXPOSE 8000

# 9) Sobe a API FastAPI
#   - módulo: vfacil.vfacil_api.main
#   - objeto FastAPI: app
CMD ["uvicorn", "vfacil.vfacil_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
