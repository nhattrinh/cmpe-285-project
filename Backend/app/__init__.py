from fastapi import FastAPI
from .routes.route import api_router
from .routes.authentication import authentication
# from .config import Settings  


class CreateApp:
    """
    Encapsulates FastAPI application creation and setup.
    """

    def __init__(self):
        # Initialize the app
        self.app = FastAPI(title="My FastAPI Application")
        # self.settings = Settings()  # Optional: Custom settings instance
        self.configure_routes()

    def configure_routes(self):
 
        print("Router is being connected")
        self.app.include_router(api_router, prefix="/api")
        self.app.include_router(authentication, prefix="/api/users")

    def get_app(self):
        """
        Returns the configured FastAPI application instance.
        """
        return self.app
