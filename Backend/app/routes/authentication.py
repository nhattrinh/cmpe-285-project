from fastapi import APIRouter, HTTPException
import requests



# This is going to serve as the authentication section of the application
# This is where user_UD
authentication = APIRouter()


# These are test methods to see if the app itself is working
@authentication.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}

@authentication.get("/hello")
def say_hello(name: str = "World"):
    return {"message": f"Hello, {name}!"}
