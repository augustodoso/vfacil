# 💼 V-Fácil — API de Automação Fiscal

API desenvolvida em **Python (FastAPI)** para processamento, leitura e automação de documentos fiscais (como notas XML), com integração modular e suporte a front-end via API REST.

---

## 🚀 Tecnologias Utilizadas

- **Python 3.11+**
- **FastAPI**
- **Uvicorn**
- **Pydantic**
- **SQLAlchemy**
- **dotenv**
- **CORS Middleware**

---

## ⚙️ Estrutura do Projeto

vfacil/
├── vfacil_api/
│ ├── database/
│ ├── models/
│ ├── services/
│ ├── utils/
│ └── main.py
├── requirements.txt
├── README.md
└── .gitignore


---

## 🧠 Funcionalidades

- Leitura e tratamento de arquivos XML de notas fiscais  
- CRUD básico (cadastro, leitura e exclusão de documentos)  
- Integração entre backend FastAPI e frontend (React/Vite)  
- Estrutura preparada para deploy em nuvem  

---

## ▶️ Como Rodar o Projeto

### Backend (FastAPI)

# Cria o ambiente virtual
python -m venv venv

# Ativa o ambiente (Windows)
venv\Scripts\activate

# Instala dependências
pip install -r requirements.txt

# Executa o servidor
uvicorn vfacil_api.main:app --reload

Frontend (Vite/React)
cd vfacil-frontend
npm install
npm run dev

📂 API Endpoints
Método	Rota	Descrição
GET	/api/docs	Lista documentos
POST	/api/upload	Envia novo arquivo
DELETE	/api/delete/{id}	Remove um documento

🧩 Autor

Augusto Cezar de Macedo Doso
GitHub
 • LinkedIn

Projeto desenvolvido como parte de estudos e portfólio para estágio em desenvolvimento backend.
© 2025 — Todos os direitos reservados.

