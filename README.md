# Aurevix NFE · OCR + IA para Notas Fiscais
*(Projeto originalmente iniciado como “v-facil”, agora evoluído para Aurevix NFE)*

Aurevix NFE é um sistema completo que combina **OCR (Tesseract)** com **IA Generativa (OpenAI)** para extrair e analisar informações direto de **imagens de notas fiscais**.

Ele é capaz de:

- Ler imagens de notas (PNG/JPG/PDF)
- Extrair texto com OCR
- Identificar CNPJ, valor, data de emissão
- Enviar o texto para **IA** gerar:
  - Empresa responsável
  - Valor total corrigido
  - Categoria de gasto
  - Detalhes e observações
- Registrar histórico das notas processadas
- Exibir tudo em uma interface moderna em React + Tailwind

---

# 🚀 Tecnologias Utilizadas

### Frontend
- React (Vite)
- Tailtail CSS
- Fetch API para comunicação com backend

### Backend
- FastAPI
- Python 3.11
- Tesseract OCR (`pytesseract`)
- Pillow
- OpenAI API (GenAI)
- Regex para extração via texto

### Infra / Outros
- Tesseract instalado localmente
- `.env` com OpenAI API Key (**não é enviado ao GitHub**)
- Ambiente virtual Python

---

# 🏗 Estrutura do Repositório

```
vfacil/
│
├── vfacil_api/
│   ├── main.py                # Ponto inicial da API
│   ├── services/
│   │   ├── ocr_service.py     # OCR e parsing da nota
│   │   └── genai_service.py   # Integração com IA
│   ├── utils/
│   │   └── ocr_config.py      # Caminho do Tesseract
│   ├── database/              # (para versão futura)
│   ├── models/
│   └── .env                   # API KEY da OpenAI (NUNCA COMITAR!)
│
└── vfacil-frontend/
    ├── src/
    │   ├── pages/Upload.jsx   # Tela principal
    │   ├── components/
    │   └── assets/
    └── public/
```

---

# ⚙️ Rodando o Projeto Localmente

## Backend

```
cd vfacil
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn vfacil_api.main:app --reload
```

Crie o arquivo **vfacil_api/.env**:

```
OPENAI_API_KEY=sk-xxxxx
```

## Frontend

```
cd vfacil-frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

---

# ✨ Criado por Augusto Cezar — Aurevix Tech  
*"Technology Crafted With Precison"*
