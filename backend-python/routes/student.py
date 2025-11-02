from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database.connection import get_db
from database.models import User, Material, Message
from schemas.class_schema import ClassResponse
from schemas.material import MaterialResponse
from schemas.message import MessageResponse
from middleware.auth import get_current_student

router = APIRouter()

@router.get("/subjects", response_model=List[ClassResponse])
def get_student_subjects(
    current_user: User = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    classes = current_user.classes_enrolled
    return [ClassResponse.model_validate(c) for c in classes]

@router.get("/materials", response_model=List[MaterialResponse])
def get_student_materials(
    current_user: User = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    materials = []
    for class_obj in current_user.classes_enrolled:
        materials.extend(class_obj.materials)
    
    return [MaterialResponse.model_validate(m) for m in materials]

@router.get("/messages", response_model=List[MessageResponse])
def get_student_messages(
    current_user: User = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    messages = current_user.messages_received
    return [MessageResponse.model_validate(m) for m in messages]
