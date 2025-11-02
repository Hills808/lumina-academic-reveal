from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class GradeCreate(BaseModel):
    student_id: int
    class_id: int
    assignment: str = Field(..., min_length=1, max_length=200)
    grade: float = Field(..., ge=0, le=10)
    feedback: Optional[str] = None

class GradeResponse(BaseModel):
    id: int
    student_id: int
    class_id: int
    assignment: str
    grade: float
    feedback: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True
