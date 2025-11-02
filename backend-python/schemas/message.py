from pydantic import BaseModel, Field
from datetime import datetime

class MessageCreate(BaseModel):
    student_id: int
    class_id: int
    title: str = Field(..., min_length=1, max_length=200)
    content: str = Field(..., min_length=1)

class MessageResponse(BaseModel):
    id: int
    student_id: int
    class_id: int
    title: str
    content: str
    created_at: datetime
    
    class Config:
        from_attributes = True
