# Imagem base do Python
FROM python:3.11-slim

# Pasta de trabalho dentro do container
WORKDIR /app

# Copia o requirements.txt da raiz do repositório
COPY requirements.txt .

# Instala as dependências do backend
RUN pip install --no-cache-dir -r requirements.txt

# Copia TODO o código do repositório para dentro do container
COPY . .

# Expõe a porta usada pela API
EXPOSE 8000

# Sobe a API FastAPI com Uvicorn
# Estrutura do seu repositório:
#   vfacil/vfacil_api/main.py → módulo vfacil.vfacil_api.main
CMD ["uvicorn", "vfacil.vfacil_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
