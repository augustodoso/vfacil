# 1) Imagem base
FROM python:3.11-slim

# 2) Pasta de trabalho inicial dentro do container
WORKDIR /app

# 3) Copia o requirements da raiz do repositório
COPY requirements.txt .

# 4) Instala as dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# 5) Copia a pasta do backend (a pasta "vfacil" inteira)
COPY vfacil ./vfacil

# 6) Muda o diretório de trabalho para dentro da pasta onde está o main.py
#    Estrutura no repo:
#      /vfacil/vfacil_api/main.py
WORKDIR /app/vfacil/vfacil_api

# 7) Expõe a porta da API
EXPOSE 8000

# 8) Sobe a API FastAPI com Uvicorn
#    Aqui a gente manda rodar o arquivo main.py direto
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
