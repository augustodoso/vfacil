# V-Fácil — Backend FastAPI para Gestão Fiscal Simples

![Python](https://img.shields.io/badge/Python-3.11%2B-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Em%20uso-teal)
![Status](https://img.shields.io/badge/Status-Em%20desenvolvimento-yellow)

Plataforma em construção para **autônomos e pequenos negócios (MEI)** organizarem notas, recibos e documentos fiscais de forma simples.

> **Objetivo:** centralizar documentos, facilitar consulta e preparar terreno para recursos de OCR, extração de campos e relatórios mensais.

---

## ✨ Funcionalidades (MVP / Planejadas)
- ✅ API FastAPI com estrutura de serviços e utilitários
- ✅ Documentação automática via **Swagger** (`/docs`)
- 🧩 Upload de documentos (WIP)
- 🧩 Remoção/listagem de documentos (WIP)
- 🧩 OCR/extração de campos (planejado)
- 🧩 Relatórios mensais e exportação (planejado)

---

## 🚀 Como rodar localmente

### 1) Clonar o projeto
```bash
git clone https://github.com/augustodoso/vfacil.git
cd vfacil

Criar e ativar o ambiente
Windows (PowerShell):

python -m venv .venv
.venv\Scripts\Activate.ps1

Linux/Mac:
python3 -m venv .venv
source .venv/bin/activate

Instalar dependências:
pip install -r requirements.txt

Subir a API
uvicorn app.main:app --reload --port 8000
# Abra: http://127.0.0.1:8000/docs

🧭 Endpoints (MVP – sujeitos a mudança)
| Método | Rota               | Descrição                     |
| -----: | ------------------ | ----------------------------- |
|    GET | `/docs`            | Swagger UI                    |
|    GET | `/api/docs`        | Lista documentos (WIP)        |
|   POST | `/api/upload`      | Envia novo arquivo (WIP)      |
| DELETE | `/api/delete/{id}` | Remove documento por id (WIP) |

🗂️ Estrutura do projeto
vfacil/
├─ app/
│  ├─ database/        # Persistência (futuro)
│  ├─ services/        # Regras de negócio (OCR, parser, etc.)
│  ├─ utils/           # Helpers/validações
│  └─ main.py          # App FastAPI (ponto de entrada)
├─ requirements.txt
└─ README.md

🛣️ Roadmap

 OCR das notas (Tesseract/Azure Vision)

 Extração (emitente, CNPJ, valor, data)

 Alertas de vencimento por e-mail

 Exportação mensal (CSV/PDF)

 Integração simples com contabilidade

🤝 Contribuição

Sugestões e PRs são bem-vindos. Abra uma issue descrevendo seu caso/ideia.

📄 Licença

Este projeto está sob a licença MIT — veja o arquivo LICENSE.

👤 Autor

Augusto Cezar de Macedo Doso
GitHub: @augustodoso

