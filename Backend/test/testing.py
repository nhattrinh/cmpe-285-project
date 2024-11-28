app = FastAPI(
    title="Polygon.io Microservice",
    description="A microservice for accessing financial data via Polygon.io API",
    version="1.0.0"
)

@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint."""
    return {"status": "ok"}