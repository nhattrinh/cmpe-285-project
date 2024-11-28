from fastapi import APIRouter


api_router = APIRouter()

@api_router.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}

@api_router.get("/hello")
def say_hello(name: str = "World"):
    return {"message": f"Hello, {name}!"}
