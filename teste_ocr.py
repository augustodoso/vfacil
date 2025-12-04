from PIL import Image
from vfacil_api.utils.ocr_config import pytesseract

texto = pytesseract.image_to_string(Image.open("ChatGPT Image 2 de dez. de 2025, 18_09_06.png"), lang="por")
print(texto)
