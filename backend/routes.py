import os
import time
import random
from flask import request, jsonify, current_app
from werkzeug.utils import secure_filename
from PIL import Image
import logging
from models import PredictionResult, db

logger = logging.getLogger(__name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff', 'h5', 'hdf5'}
UPLOAD_FOLDER = 'uploads'

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def is_h5_file(filename):
    return filename.lower().endswith('.h5') or filename.lower().endswith('.hdf5')

def get_risk_level(confidence):
    """Determine risk level based on confidence score"""
    if confidence >= 0.8:
        return "High"
    elif confidence >= 0.6:
        return "Medium"
    elif confidence >= 0.4:
        return "Low"
    else:
        return "Very Low"

def mock_landslide_prediction(file_path, is_h5=False):
    """
    Mock landslide prediction function
    In a real implementation, this would use a trained ML model
    """
    # Simulate processing time (H5 files take longer)
    processing_time = random.uniform(2, 5) if is_h5 else random.uniform(1, 3)
    time.sleep(processing_time)
    
    if is_h5:
        predictions = [
            {"class": "High Landslide Susceptibility Zone", "confidence": random.uniform(0.75, 0.95)},
            {"class": "Moderate Slope Instability", "confidence": random.uniform(0.6, 0.8)},
            {"class": "Low Risk Terrain", "confidence": random.uniform(0.3, 0.6)},
            {"class": "Geologically Stable Area", "confidence": random.uniform(0.7, 0.95)},
            {"class": "Potential Debris Flow Zone", "confidence": random.uniform(0.65, 0.9)}
        ]
    else:
        predictions = [
            {"class": "High Risk Landslide Area", "confidence": random.uniform(0.7, 0.95)},
            {"class": "Moderate Risk Area", "confidence": random.uniform(0.5, 0.8)},
            {"class": "Low Risk Area", "confidence": random.uniform(0.3, 0.6)},
            {"class": "Stable Ground", "confidence": random.uniform(0.6, 0.9)}
        ]
    
    # Select random prediction
    prediction = random.choice(predictions)
    return prediction["class"], prediction["confidence"]

def register_routes(app):
    
    @app.route('/api/health', methods=['GET'])
    def health_check():
        """Health check endpoint"""
        return jsonify({
            'status': 'healthy',
            'message': 'Landslide Shield API is running',
            'timestamp': time.time()
        })
    
    @app.route('/api/predict', methods=['POST'])
    def predict_landslide():
        """Main prediction endpoint"""
        try:
            # Check if file is present
            if 'file' not in request.files:
                return jsonify({'error': 'No file provided'}), 400
            
            file = request.files['file']
            if file.filename == '':
                return jsonify({'error': 'No file selected'}), 400
            
            if not allowed_file(file.filename):
                return jsonify({'error': 'Invalid file type. Please upload an image or H5 file.'}), 400
            
            is_h5 = is_h5_file(file.filename)
            
            # Create upload directory if it doesn't exist
            upload_dir = os.path.join(current_app.root_path, UPLOAD_FOLDER)
            os.makedirs(upload_dir, exist_ok=True)
            
            # Save file
            filename = secure_filename(file.filename)
            timestamp = str(int(time.time()))
            filename = f"{timestamp}_{filename}"
            file_path = os.path.join(upload_dir, filename)
            file.save(file_path)
            
            width = height = None
            file_size = os.path.getsize(file_path)
            
            if not is_h5:
                # Get image dimensions for regular image files
                try:
                    with Image.open(file_path) as img:
                        width, height = img.size
                except Exception as e:
                    logger.error(f"Error processing image: {e}")
            else:
                # For H5 files, we could extract metadata using h5py in a real implementation
                logger.info(f"Processing H5 file: {file.filename}")
            
            # Record start time for processing
            start_time = time.time()
            
            prediction_class, confidence = mock_landslide_prediction(file_path, is_h5)
            risk_level = get_risk_level(confidence)
            
            # Calculate processing time
            processing_time = time.time() - start_time
            
            # Save to database
            result = PredictionResult(
                filename=file.filename,
                file_path=file_path,
                prediction_class=prediction_class,
                confidence_score=confidence,
                risk_level=risk_level,
                file_size=file_size,
                image_width=width,
                image_height=height,
                processing_time=processing_time
            )
            
            db.session.add(result)
            db.session.commit()
            
            # Return prediction result
            response = {
                'success': True,
                'prediction': {
                    'id': result.id,
                    'class': prediction_class,
                    'confidence': round(confidence, 3),
                    'risk_level': risk_level,
                    'processing_time': round(processing_time, 2)
                },
                'file_info': {
                    'filename': file.filename,
                    'size': file_size,
                    'format': 'H5/HDF5' if is_h5 else 'Image',
                    'dimensions': {
                        'width': width,
                        'height': height
                    } if width and height else None
                }
            }
            
            logger.info(f"Prediction completed for {filename}: {prediction_class} ({confidence:.3f})")
            return jsonify(response)
            
        except Exception as e:
            logger.error(f"Error in prediction endpoint: {e}")
            return jsonify({'error': 'Internal server error occurred during prediction'}), 500
    
    @app.route('/api/predictions', methods=['GET'])
    def get_predictions():
        """Get all prediction results"""
        try:
            page = request.args.get('page', 1, type=int)
            per_page = request.args.get('per_page', 10, type=int)
            
            predictions = PredictionResult.query.order_by(
                PredictionResult.created_at.desc()
            ).paginate(
                page=page, 
                per_page=per_page, 
                error_out=False
            )
            
            return jsonify({
                'predictions': [p.to_dict() for p in predictions.items],
                'pagination': {
                    'page': page,
                    'per_page': per_page,
                    'total': predictions.total,
                    'pages': predictions.pages
                }
            })
            
        except Exception as e:
            logger.error(f"Error fetching predictions: {e}")
            return jsonify({'error': 'Failed to fetch predictions'}), 500
    
    @app.route('/api/predictions/<int:prediction_id>', methods=['GET'])
    def get_prediction(prediction_id):
        """Get specific prediction result"""
        try:
            prediction = PredictionResult.query.get_or_404(prediction_id)
            return jsonify(prediction.to_dict())
            
        except Exception as e:
            logger.error(f"Error fetching prediction {prediction_id}: {e}")
            return jsonify({'error': 'Prediction not found'}), 404
