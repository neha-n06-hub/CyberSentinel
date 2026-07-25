from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from modules.phishing.routes import router as phishing_router
from modules.network.routes import router as network_router
from modules.traffic.routes import router as traffic_router
from modules.file_analysis.routes import router as file_analysis_router
from modules.password.routes import router as password_router
from modules.risk_engine.routes import router as risk_router

# ==========================================
# CREATE FASTAPI APP
# ==========================================

app = FastAPI(
    title="CyberSentinel API",
    version="0.1.0"
)


# ==========================================
# CORS CONFIGURATION
# ==========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ==========================================
# REGISTER ROUTERS
# ==========================================

app.include_router(
    phishing_router
)

app.include_router(
    network_router
)
app.include_router(
    traffic_router)

app.include_router(
    file_analysis_router)

app.include_router(
    password_router)

app.include_router(
    risk_router)

# ==========================================
# ROOT ENDPOINT
# ==========================================

@app.get("/")
def root():
    return {
        "project": "CyberSentinel",
        "status": "online",
        "version": "0.1.0"
    }