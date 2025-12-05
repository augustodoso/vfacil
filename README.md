# 🧾 **V-Fácil — OCR + IA para Notas Fiscais**
### ⚡ Plataforma inteligente para leitura, análise e categorização automática de notas fiscais usando OCR + IA.

---

# 🔗 **Aplicação Online (Teste Agora!)**

👉 **Frontend (Vercel):**  
https://vfacil-drab.vercel.app  

👉 **API (Render):**  
https://aurevix-nfe-api.onrender.com  

> 📌 Faça upload de uma nota fiscal e veja o OCR + IA funcionando AO VIVO.

---

# ✨ **Visão Geral**

O **V-Fácil** é uma plataforma moderna que automatiza a leitura e interpretação de notas fiscais.  
Combinando **OCR (Tesseract)** e **IA Generativa (OpenAI)**, ele extrai e interpreta informações essenciais:

- CNPJ
- Nome da empresa
- Valor total
- Data de emissão
- Categoria de gasto
- Observações inteligentes

Tudo isso com:

- 🔥 Frontend em **React + Tailwind** (deploy na Vercel)  
- 🧠 Backend em **FastAPI** com OCR + IA (deploy na Render)  
- 📡 Comunicação real através de requisições via API  

É um projeto que demonstra **maturidade técnica real**, pronto para portfólio profissional e entrevistas.

---

# 🎯 **Principais Funcionalidades**

### ✔️ Upload de imagem ou PDF  
### ✔️ OCR com extração automática (pytesseract)  
### ✔️ Interpretação da nota por IA (OpenAI GPT)  
### ✔️ Identificação de nome da empresa  
### ✔️ Extração estruturada de CNPJ, valor e data  
### ✔️ Categoria de gasto sugerida pela IA  
### ✔️ Histórico de notas processadas  
### ✔️ Interface moderna e responsiva  
### ✔️ API pública para testes

---

# 🔍 **Exemplo de Resultado Real**

Ao enviar uma nota, o OCR retorna:

```
CNPJ: 12.345.678/0001-95  
Valor: R$ 9,80  
Data: 10/07/2023
```

E a IA interpreta:

```json
{
  "empresa": "SUPERMERCADO BOM PREÇO LTDA",
  "cnpj": "12.345.678/0001-95",
  "data_emissao": "10/07/2023",
  "valor_total": "R$ 9,80",
  "categoria_gasto": "Alimentação",
  "observacoes": "Nota fiscal referente a compra de itens de mercado."
}
```

---

# 🧠 **Como Funciona a IA**

Após o OCR extrair o texto:

1. O backend envia o texto para a OpenAI  
2. A IA interpreta campos estruturados mesmo com OCR ruidoso  
3. Classifica automaticamente a categoria do gasto  
4. Retorna um JSON padronizado  
5. O frontend renderiza tudo imediatamente  

Essa abordagem simula o uso de IA em automação contábil real.

---

# 🛠️ **Tecnologias Utilizadas**

## **Frontend**
- React + Vite  
- TailwindCSS  
- Fetch API  
- Vercel Deploy  

## **Backend**
- FastAPI  
- Pytesseract (OCR)  
- Pillow  
- Uvicorn  
- OpenAI Python SDK  
- Render Deploy  

## **IA**
- OpenAI GPT 4.1-mini  
- Prompt engineering  
- Extração zero-shot  

## **Infraestrutura**
- Deploy contínuo via GitHub  
- Variáveis de ambiente seguras (API Keys)  
- CORS configurado corretamente  
- Arquitetura distribuída (Render → Vercel)

---

# 🌍 **Arquitetura em Produção**

```
Usuário ───> Frontend (Vercel)
                 │
                 ▼
          API Backend (Render)
                 │
                 ▼
            OCR (Tesseract)
                 │
                 ▼
          OpenAI GPT (IA)
```

---

# 💻 **Como Rodar Localmente**

## 🟦 Backend (FastAPI)

### Criar ambiente virtual

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
```

### Instalar dependências

```bash
pip install -r requirements.txt
```

### Criar arquivo `.env`

```
OPENAI_API_KEY=sk-sua-chave-aqui
```

### Rodar servidor

```bash
uvicorn vfacil_api.main:app --reload
```

API disponível em:

```
http://127.0.0.1:8000
```

---

## 🟣 Frontend (React + Vite)

```bash
cd vfacil-frontend
npm install
npm run dev
```

Abra:

```
http://127.0.0.1:5173
```

---

# 📂 Estrutura do Projeto

```
vfacil/
│
├── backend/
│   ├── vfacil_api/
│   │   ├── main.py
│   │   ├── services/
│   │   │   ├── ocr_service.py
│   │   │   └── genai_service.py
│   │   └── utils/
│   ├── requirements.txt
│
├── vfacil-frontend/
│   ├── src/
│   │   ├── pages/Upload.jsx
│   │   ├── App.jsx
│   ├── index.html
│   ├── package.json
│
└── README.md
```

---

# 🥇 **Por que este projeto impressiona recrutadores?**

### ✔️ Tem **deploy real**, não é só projeto local  
### ✔️ Usa **IA generativa aplicada a problema real**  
### ✔️ Integração completa entre **frontend, backend e IA**  
### ✔️ Soluciona uma dor real: automação fiscal  
### ✔️ Demonstra domínio de:
- APIs REST  
- Cloud (Vercel + Render)  
- OCR  
- Processamento de imagens  
- Engenharia de prompt  
- Deploy profissional  
- Tratamento de erros e logs  

### ✔️ Código limpo, organizado e documentado  

Recrutadores **amam** projetos assim.

---

# 👨‍💻 **Autor**

**Augusto Cezar de Macedo Doso**  
Desenvolvedor Full Stack | Python | IA | Cloud  
Criador da **Aurevix Tech**

🌐 GitHub: https://github.com/augustodoso  
🔗 LinkedIn: https://www.linkedin.com/in/augusto-cezar-de-macedo-doso/  

---

# ⭐ **Se este projeto te ajudou, deixe uma estrela no repositório!**
