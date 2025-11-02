from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import shutil
import os
from datetime import datetime
from database.connection import get_db
from database.models import User, Class, Material, Grade, Message
from schemas.class_schema import ClassResponse, StudentInClass
from schemas.material import MaterialCreate, MaterialResponse
from schemas.grade import GradeCreate, GradeResponse
from schemas.message import MessageCreate, MessageResponse
from middleware.auth import get_current_teacher
from config import settings

router = APIRouter()

@router.get("/classes", response_model=List[ClassResponse])
def get_teacher_classes(
    current_user: User = Depends(get_current_teacher),
    db: Session = Depends(get_db)
):
    classes = current_user.classes_teaching
    return [ClassResponse.model_validate(c) for c in classes]

@router.get("/students", response_model=List[StudentInClass])
def get_class_students(
    class_id: int,
    current_user: User = Depends(get_current_teacher),
    db: Session = Depends(get_db)
):
    class_obj = db.query(Class).filter(
        Class.id == class_id,
        Class.teacher_id == current_user.id
    ).first()
    
    if not class_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Turma não encontrada"
        )
    
    return [StudentInClass.model_validate(s) for s in class_obj.students]

@router.post("/materials", response_model=MaterialResponse, status_code=status.HTTP_201_CREATED)
async def upload_material(
    title: str,
    description: str = "",
    class_id: int = 0,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_teacher),
    db: Session = Depends(get_db)
):
    # Verificar se a turma pertence ao professor
    class_obj = db.query(Class).filter(
        Class.id == class_id,
        Class.teacher_id == current_user.id
    ).first()
    
    if not class_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Turma não encontrada"
        )
    
    # Salvar arquivo
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_extension = os.path.splitext(file.filename)[1]
    filename = f"{timestamp}_{file.filename}"
    file_path = os.path.join(settings.UPLOAD_DIR, filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Criar registro no banco
    material = Material(
        title=title,
        description=description,
        file_url=f"/uploads/{filename}",
        file_type=file.content_type,
        class_id=class_id
    )
    
    db.add(material)
    db.commit()
    db.refresh(material)
    
    return MaterialResponse.model_validate(material)

@router.post("/grades", response_model=GradeResponse, status_code=status.HTTP_201_CREATED)
def create_grade(
    grade_data: GradeCreate,
    current_user: User = Depends(get_current_teacher),
    db: Session = Depends(get_db)
):
    # Verificar se a turma pertence ao professor
    class_obj = db.query(Class).filter(
        Class.id == grade_data.class_id,
        Class.teacher_id == current_user.id
    ).first()
    
    if not class_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Turma não encontrada"
        )
    
    # Verificar se o aluno está na turma
    student = db.query(User).filter(User.id == grade_data.student_id).first()
    if not student or class_obj not in student.classes_enrolled:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Aluno não encontrado nesta turma"
        )
    
    # Criar nota
    grade = Grade(
        student_id=grade_data.student_id,
        class_id=grade_data.class_id,
        assignment=grade_data.assignment,
        grade=grade_data.grade,
        feedback=grade_data.feedback
    )
    
    db.add(grade)
    db.commit()
    db.refresh(grade)
    
    return GradeResponse.model_validate(grade)

@router.post("/messages", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def send_message(
    message_data: MessageCreate,
    current_user: User = Depends(get_current_teacher),
    db: Session = Depends(get_db)
):
    # Verificar se a turma pertence ao professor
    class_obj = db.query(Class).filter(
        Class.id == message_data.class_id,
        Class.teacher_id == current_user.id
    ).first()
    
    if not class_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Turma não encontrada"
        )
    
    # Verificar se o aluno está na turma
    student = db.query(User).filter(User.id == message_data.student_id).first()
    if not student or class_obj not in student.classes_enrolled:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Aluno não encontrado nesta turma"
        )
    
    # Criar mensagem
    message = Message(
        student_id=message_data.student_id,
        class_id=message_data.class_id,
        title=message_data.title,
        content=message_data.content
    )
    
    db.add(message)
    db.commit()
    db.refresh(message)
    
    return MessageResponse.model_validate(message)
