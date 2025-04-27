from fastapi import APIRouter

router = APIRouter()

@router.get("/view_my_summary")
async def view_my_summary():
    return {"message": "Summary will be implemented later."}
