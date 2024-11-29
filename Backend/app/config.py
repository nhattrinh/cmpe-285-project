import os

class Config: 
    POLYGON_API_KEY = os.getenv("POLYGON_API_KEY")
    BASE_URL = os.getenv("BASE_URL", "https://api.polygon.io")
