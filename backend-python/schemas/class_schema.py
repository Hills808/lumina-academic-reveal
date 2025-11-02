from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class ClassCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None

class ClassResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    teacher_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class StudentInClass(BaseModel):
    id: int
    name: str
    email: str
    
    class Config:
        from_attributes = True
