from fastapi import FastAPI, middleware
from app import CreateApp
import uvicorn

# Generating an the app server itself...
# Run the docker file or use python main.py after installing all dependencies
app_factory = CreateApp()
app = app_factory.get_app()

if __name__ == "__main__":
    uvicorn.run(app)
