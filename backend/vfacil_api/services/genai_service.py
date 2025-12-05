# vfacil/vfacil_api/services/genai_service.py

import os
import json
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI


# =====================================================
# Carrega variáveis de ambiente do arquivo .env
# (que fica na pasta vfacil_api/.env)
# =====================================================

BASE_DIR = Path(__file__).resolve().parent.parent  # .../vfacil_api
ENV_PATH = BASE_DIR / ".env"

# Carrega o .env explicitamente
load_dotenv(ENV_PATH)

# Lê as variáveis do .env
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

# Cria o client da OpenAI (ou deixa None se não tiver chave)
client: OpenAI | None = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None


def analisar_texto_nota(texto: str) -> dict:
    """
    Envia o texto bruto da nota fiscal para o modelo de linguagem (GenAI)
    e retorna um dicionário com os campos estruturados.
    """

    # 1) Validação básica
    if not texto.strip():
        return {"erro": "Texto vazio após OCR."}

    if client is None:
        # Aqui ainda devolvemos algo amigável para o frontend
        return {
            "erro": "OPENAI_API_KEY não configurada no backend.",
            "empresa": None,
            "cnpj": None,
            "data_emissao": None,
            "valor_total": None,
            "categoria_gasto": None,
            "observacoes": "Configure a variável OPENAI_API_KEY no arquivo .env do backend.",
        }

    # 2) Prompt para o modelo
    system_prompt = """
Você é um assistente especializado em análise de notas fiscais brasileiras (NFe/DANFE).

Sua tarefa é:
- Ler o texto da nota fiscal (resultado de OCR, pode ter erros).
- Extrair os seguintes campos em um JSON:

{
  "empresa": string ou null,
  "cnpj": string ou null,
  "data_emissao": string ou null,
  "valor_total": string ou null,
  "categoria_gasto": string ou null,
  "observacoes": string ou null
}

Regras IMPORTANTES:
- Responda APENAS com um JSON válido.
- NÃO inclua explicações fora do JSON.
- Se não tiver certeza de algum campo, use null.
"""

    user_prompt = f"""
Texto da nota fiscal (resultado do OCR):

\"\"\"{texto}\"\"\"

Gere o JSON apenas com os campos pedidos.
"""

    # 3) Chamada ao modelo
    try:
        response = client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            response_format={"type": "json_object"},
            temperature=0.1,
        )

        # Conteúdo retornado pelo modelo (deve ser JSON)
        content = response.choices[0].message.content

        try:
            dados = json.loads(content)
        except json.JSONDecodeError:
            # Se, por algum motivo, vier algo que não é JSON
            dados = {
                "empresa": None,
                "cnpj": None,
                "data_emissao": None,
                "valor_total": None,
                "categoria_gasto": None,
                "observacoes": f"Resposta não pôde ser parseada como JSON. Conteúdo bruto: {content}",
            }

        return dados

    except Exception as e:
        # Qualquer erro na chamada da IA cai aqui
        # (timeout, chave inválida, modelo errado, etc.)
        return {
            "erro": f"Falha ao consultar IA: {e.__class__.__name__}: {str(e)}",
            "empresa": None,
            "cnpj": None,
            "data_emissao": None,
            "valor_total": None,
            "categoria_gasto": None,
            "observacoes": "Erro na chamada da IA. Verifique a chave, o modelo e o log do servidor.",
        }
