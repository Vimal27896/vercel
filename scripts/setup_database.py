#!/usr/bin/env python3
"""
Script to initialize and seed the database for Landslide Shield
"""
import os
import sys
import sqlite3
from datetime import datetime, timedelta

def create_database():
    """Create and initialize the SQLite database"""
    # Get the backend directory path
    backend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'backend')
    instance_dir = os.path.join(backend_dir, 'instance')
    
    # Create instance directory if it doesn't exist
    os.makedirs(instance_dir, exist_ok=True)
    
    db_path = os.path.join(instance_dir, 'landslide.db')
    
    print(f"Creating database at: {db_path}")
    
    # Connect to database (creates file if it doesn't exist)
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Create prediction_results table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS prediction_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename VARCHAR(255) NOT NULL,
            file_path VARCHAR(500) NOT NULL,
            prediction_class VARCHAR(50) NOT NULL,
            confidence_score REAL NOT NULL,
            risk_level VARCHAR(20) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            file_size INTEGER,
            image_width INTEGER,
            image_height INTEGER,
            processing_time REAL
        )
    ''')
    
    # Create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email VARCHAR(120) UNIQUE NOT NULL,
            name VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active BOOLEAN DEFAULT 1
        )
    ''')
    
    conn.commit()
    print("✓ Database tables created successfully")
    
    return conn

def seed_sample_data(conn):
    """Add sample data to the database"""
    cursor = conn.cursor()
    
    # Sample prediction results
    sample_predictions = [
        ('mountain_slope_1.jpg', '/uploads/mountain_slope_1.jpg', 'High Risk Landslide Area', 0.923, 'High', 2.3, 1920, 1080, 245760),
        ('stable_terrain.jpg', '/uploads/stable_terrain.jpg', 'Stable Ground', 0.876, 'Very Low', 1.8, 1600, 1200, 192000),
        ('moderate_risk.jpg', '/uploads/moderate_risk.jpg', 'Moderate Risk Area', 0.674, 'Medium', 2.1, 1280, 720, 153600),
        ('low_risk_area.jpg', '/uploads/low_risk_area.jpg', 'Low Risk Area', 0.426, 'Low', 1.9, 1024, 768, 131072),
        ('cliff_face.jpg', '/uploads/cliff_face.jpg', 'High Risk Landslide Area', 0.941, 'High', 2.7, 2048, 1536, 314572),
    ]
    
    print("Adding sample prediction data...")
    for i, (filename, file_path, pred_class, confidence, risk_level, proc_time, width, height, file_size) in enumerate(sample_predictions):
        # Create timestamps going back in time
        created_at = datetime.now() - timedelta(days=i+1, hours=i*2)
        
        cursor.execute('''
            INSERT INTO prediction_results 
            (filename, file_path, prediction_class, confidence_score, risk_level, 
             processing_time, image_width, image_height, file_size, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (filename, file_path, pred_class, confidence, risk_level, 
              proc_time, width, height, file_size, created_at))
    
    # Sample users
    sample_users = [
        ('admin@landslide-shield.com', 'System Administrator'),
        ('researcher@university.edu', 'Dr. Sarah Johnson'),
        ('geologist@survey.gov', 'Mike Chen'),
    ]
    
    print("Adding sample user data...")
    for email, name in sample_users:
        cursor.execute('''
            INSERT OR IGNORE INTO users (email, name)
            VALUES (?, ?)
        ''', (email, name))
    
    conn.commit()
    print("✓ Sample data added successfully")

def main():
    print("Landslide Shield Database Setup")
    print("=" * 40)
    
    try:
        # Create database and tables
        conn = create_database()
        
        # Add sample data
        seed_sample_data(conn)
        
        # Close connection
        conn.close()
        
        print("\n✓ Database setup completed successfully!")
        print("You can now run the Flask backend server.")
        
    except Exception as e:
        print(f"✗ Error setting up database: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
