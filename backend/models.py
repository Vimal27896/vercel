from app import db
from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean

class PredictionResult(db.Model):
    __tablename__ = 'prediction_results'
    
    id = Column(Integer, primary_key=True)
    filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    prediction_class = Column(String(50), nullable=False)
    confidence_score = Column(Float, nullable=False)
    risk_level = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Additional metadata
    file_size = Column(Integer)
    image_width = Column(Integer)
    image_height = Column(Integer)
    processing_time = Column(Float)
    
    def to_dict(self):
        return {
            'id': self.id,
            'filename': self.filename,
            'prediction_class': self.prediction_class,
            'confidence_score': self.confidence_score,
            'risk_level': self.risk_level,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'file_size': self.file_size,
            'image_dimensions': {
                'width': self.image_width,
                'height': self.image_height
            } if self.image_width and self.image_height else None,
            'processing_time': self.processing_time
        }

class User(db.Model):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    email = Column(String(120), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'is_active': self.is_active
        }
