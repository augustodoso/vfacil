# Imagem base
FROM python:3.11-slim

# 1) Dependências do sistema (Tesseract + português)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        tesseract-ocr \
        tesseract-ocr-por && \
    rm -rf /var/lib/apt/lists/*

# 2) Diretório de trabalho dentro do container
WORKDIR /app

# 3) Copia só o requirements do backend
# (ele está em vfacil/vfacil_api/requirements.txt no seu repo)
COPY vfacil/vfacil_api/requirements.txt ./requirements.txt

# 4) Instala as libs Python
RUN pip install --no-cache-dir -r requirements.txt

# 5) Copia o código do backend (pacote vfacil + vfacil_api)
COPY vfacil/ ./vfacil

# 6) (Opcional) path dos dados do Tesseract
ENV TESSDATA_PREFIX=/usr/share/tesseract-ocr/4.00/tessdata

# 7) Porta exposta
EXPOSE 8000

# 8) Sobe o FastAPI apontando para o módulo completo
#    vfacil.vfacil_api.main:app  (e não só "main:app")
CMD ["uvicorn", "vfacil.vfacil_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
