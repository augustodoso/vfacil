import pytesseract

# Caminho exato do Tesseract no Windows
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

try:
    _ = pytesseract.get_tesseract_version()
    print("Tesseract configurado corretamente!")
except Exception as e:
    print("Erro ao configurar Tesseract:", e)
