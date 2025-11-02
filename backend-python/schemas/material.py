from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class MaterialCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    file_type: str
    class_id: int

class MaterialResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    file_url: Optional[str]
    file_type: Optional[str]
    class_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
