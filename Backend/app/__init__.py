from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.route import api_router
from .routes.authentication import authentication
from .routes.market import market_router
from .routes.strategies import strategies_router


class CreateApp:

    def __init__(self):
        self.app = FastAPI(title="My FastAPI Application")
        # Add CORS middleware
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        self.configure_routes()

    def configure_routes(self):
        print("Router is being connected")
        self.app.include_router(api_router, prefix="/api")
        self.app.include_router(authentication, prefix="/api/users")
        self.app.include_router(market_router, prefix="/api")
        self.app.include_router(strategies_router, prefix="/api")

    def get_app(self):
        """
        Returns the configured FastAPI application instance.
        """
        return self.app
