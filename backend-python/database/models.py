from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from database.connection import Base

# Tabela associativa para alunos e turmas
class_students = Table(
    'class_students',
    Base.metadata,
    Column('class_id', Integer, ForeignKey('classes.id')),
    Column('student_id', Integer, ForeignKey('users.id'))
)

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    user_type = Column(String(20), nullable=False)  # student ou teacher
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    classes_teaching = relationship("Class", back_populates="teacher")
    classes_enrolled = relationship("Class", secondary=class_students, back_populates="students")
    grades = relationship("Grade", back_populates="student")
    messages_received = relationship("Message", back_populates="student")

class Class(Base):
    __tablename__ = "classes"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    teacher_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    teacher = relationship("User", back_populates="classes_teaching")
    students = relationship("User", secondary=class_students, back_populates="classes_enrolled")
    materials = relationship("Material", back_populates="class_obj")
    grades = relationship("Grade", back_populates="class_obj")
    messages = relationship("Message", back_populates="class_obj")

class Material(Base):
    __tablename__ = "materials"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    file_url = Column(String(500))
    file_type = Column(String(50))
    class_id = Column(Integer, ForeignKey('classes.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    class_obj = relationship("Class", back_populates="materials")

class Grade(Base):
    __tablename__ = "grades"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    class_id = Column(Integer, ForeignKey('classes.id'), nullable=False)
    assignment = Column(String(200), nullable=False)
    grade = Column(Float, nullable=False)
    feedback = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    student = relationship("User", back_populates="grades")
    class_obj = relationship("Class", back_populates="grades")

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    class_id = Column(Integer, ForeignKey('classes.id'), nullable=False)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    student = relationship("User", back_populates="messages_received")
    class_obj = relationship("Class", back_populates="messages")
