import io
import re
import logging
import pytesseract
from vfacil_api.utils import ocr_config  # importa e executa a configuração
from PIL import Image, UnidentifiedImageError

logger = logging.getLogger(__name__)


def extrair_texto(imagem_bytes: bytes) -> str:
    """
    Recebe bytes de imagem e retorna o texto bruto extraído via OCR.

    - Tenta abrir a imagem com Pillow.
    - Tenta usar Tesseract com lang='por'.
    - Se qualquer coisa der errado, registra o erro e retorna string vazia,
      para não derrubar a API com erro 500.
    """
    try:
        imagem = Image.open(io.BytesIO(imagem_bytes))
    except UnidentifiedImageError as e:
        logger.error(f"Erro ao abrir imagem para OCR: {e}")
        return ""
    except Exception as e:
        logger.error(f"Erro inesperado ao abrir imagem: {e}")
        return ""

    texto = ""
    try:
        # tenta com português
        texto = pytesseract.image_to_string(imagem, lang="por")
    except Exception as e_lang:
        logger.warning(f"Falha com lang='por' no Tesseract: {e_lang}")
        try:
            # tenta sem lang (padrão)
            texto = pytesseract.image_to_string(imagem)
        except Exception as e_default:
            logger.error(f"Falha no Tesseract (padrão): {e_default}")
            return ""

    return texto or ""


def processar_nota(imagem_bytes: bytes) -> dict:
    """
    Fluxo padrão: extrai o texto via OCR e tenta pegar CNPJ, Valor e Data.
    Mesmo que o OCR falhe, devolve campos 'não identificado' em vez de erro 500.
    """
    texto = extrair_texto(imagem_bytes)
    return extrair_dados(texto)


def extrair_dados(texto: str) -> dict:
    """Extrai CNPJ, valor e data do texto da nota usando regex simples."""
    cnpj = extrair_cnpj(texto)
    data = extrair_data(texto)
    valor = extrair_valor(texto)

    return {
        "CNPJ": cnpj or "não identificado",
        "Valor": valor or "não identificado",
        "Data": data or "não identificada",
    }


def extrair_cnpj(texto: str) -> str | None:
    """
    Procura um CNPJ no texto.
    Aceita formatos:
      00.000.000/0000-00
      00000000000000
    """
    padrao_cnpj = r"\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2}"
    match = re.search(padrao_cnpj, texto)
    if match:
        cnpj = match.group()

        # Normaliza para o formato 00.000.000/0000-00
        numeros = re.sub(r"\D", "", cnpj)
        if len(numeros) == 14:
            return (
                f"{numeros[0:2]}."
                f"{numeros[2:5]}."
                f"{numeros[5:8]}/"
                f"{numeros[8:12]}-"
                f"{numeros[12:14]}"
            )
        return cnpj

    return None


def extrair_data(texto: str) -> str | None:
    """
    Procura uma data no formato dd/mm/aaaa.
    (Simples, mas já resolve muitas NFe).
    """
    padrao_data = r"\b\d{2}/\d{2}/\d{4}\b"
    match = re.search(padrao_data, texto)
    if match:
        return match.group()
    return None


def extrair_valor(texto: str) -> str | None:
    """
    Procura um valor monetário.
    Ex: 1.234,56  ou  123,45
    Tenta priorizar linhas que contenham 'TOTAL' ou 'Valor'.
    """
    padrao_valor = r"\d{1,3}(?:\.\d{3})*,\d{2}"

    linhas = texto.splitlines()

    # Primeiro, procura em linhas que pareçam ser total da nota
    for linha in linhas:
        if any(chave in linha.upper() for chave in ["TOTAL", "VALOR", "R$", "NOTA"]):
            match = re.search(padrao_valor, linha)
            if match:
                return match.group()

    # Se não achar, procura em todo o texto
    match_global = re.search(padrao_valor, texto)
    if match_global:
        return match_global.group()

    return None
