#!/usr/bin/env python3
"""
Script to run the Flask backend server for Landslide Shield
"""
import os
import sys
import subprocess

def install_requirements():
    """Install required Python packages"""
    requirements = [
        "Flask==2.3.3",
        "Flask-SQLAlchemy==3.0.5",
        "Pillow==10.0.1",
        "Werkzeug==2.3.7"
    ]
    
    print("Installing Python requirements...")
    for req in requirements:
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", req])
            print(f"✓ Installed {req}")
        except subprocess.CalledProcessError as e:
            print(f"✗ Failed to install {req}: {e}")
            return False
    
    return True

def run_flask_server():
    """Run the Flask development server"""
    # Change to backend directory
    backend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'backend')
    
    if not os.path.exists(backend_dir):
        print(f"Backend directory not found: {backend_dir}")
        return False
    
    os.chdir(backend_dir)
    
    # Set environment variables
    env = os.environ.copy()
    env['FLASK_APP'] = 'app.py'
    env['FLASK_ENV'] = 'development'
    env['FLASK_DEBUG'] = '1'
    
    print("Starting Flask backend server...")
    print("Backend will be available at: http://localhost:5000")
    print("API endpoints:")
    print("  - POST /api/predict - Upload image for landslide prediction")
    print("  - GET /api/predictions - Get prediction history")
    print("  - GET /api/health - Health check")
    print("\nPress Ctrl+C to stop the server")
    
    try:
        subprocess.run([sys.executable, "-m", "flask", "run", "--host=0.0.0.0", "--port=5000"], 
                      env=env, check=True)
    except KeyboardInterrupt:
        print("\nShutting down Flask server...")
    except subprocess.CalledProcessError as e:
        print(f"Error running Flask server: {e}")
        return False
    
    return True

if __name__ == "__main__":
    print("Landslide Shield Backend Setup")
    print("=" * 40)
    
    # Install requirements
    if not install_requirements():
        print("Failed to install requirements. Exiting.")
        sys.exit(1)
    
    # Run Flask server
    if not run_flask_server():
        print("Failed to start Flask server. Exiting.")
        sys.exit(1)
