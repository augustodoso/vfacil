# run_api.py (na raiz do projeto)

import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "vfacil.vfacil_api.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )
