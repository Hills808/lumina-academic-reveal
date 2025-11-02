import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production-min-32-chars"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 horas
    
    # Database
    DATABASE_URL: str = "sqlite:///./lumina.db"
    
    # CORS
    CORS_ORIGINS: list = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://*.lovable.app",
        "https://*.lovableproject.com",
        "https://*.githubpreview.dev",
        "https://*.app.github.dev"
    ]
    
    # File Storage
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

# Criar diretório de uploads
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
