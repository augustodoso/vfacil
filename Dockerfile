# Imagem base do Python
FROM python:3.11-slim

# Pasta de trabalho base
WORKDIR /app

# --- OPCIONAL, MAS RECOMENDADO: instalar Tesseract para o OCR ---
RUN apt-get update && apt-get install -y tesseract-ocr && rm -rf /var/lib/apt/lists/*
# -----------------------------------------------------------------

# Copia o requirements.txt da raiz do repositório
COPY requirements.txt .

# Instala as dependências do backend
RUN pip install --no-cache-dir -r requirements.txt

# Copia TODO o código do repositório para dentro do container
COPY . .

# AGORA vem o pulo do gato:
# Entramos na pasta vfacil, como você faz localmente com "cd vfacil"
WORKDIR /app/vfacil

# Expõe a porta usada pela API
EXPOSE 8000

# Sobe a API FastAPI com Uvicorn
# Usa EXATAMENTE o mesmo que você roda na sua máquina:
#   uvicorn vfacil_api.main:app --reload
CMD ["uvicorn", "vfacil_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
