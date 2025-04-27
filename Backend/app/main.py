from fastapi import FastAPI
from app.api import auth_router, doctor_router,admin_router

app = FastAPI(
    title="MediSync Backend",
    description="Backend API for MediSync healthcare platform",
    version="0.1.0"
)

app.include_router(auth_router.router, prefix="/auth", tags=["Authentication"])
app.include_router(doctor_router.router, prefix="/doctor", tags=["Doctor"])
app.include_router(admin_router.router, prefix="/admin", tags=["Administration"])

@app.get("/")
async def root():
    return {"message": "Hello World"}