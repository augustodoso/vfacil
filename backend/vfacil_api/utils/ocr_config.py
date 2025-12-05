import os
import pytesseract


# Configura o caminho do Tesseract de forma diferente para Windows e Linux
if os.name == "nt":  # Windows
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
else:  # Linux (Render)
    pytesseract.pytesseract.tesseract_cmd = "/usr/bin/tesseract"


try:
    _ = pytesseract.get_tesseract_version()
    print("Tesseract configurado corretamente!")
except Exception as e:
    print("Erro ao configurar Tesseract:", e)
