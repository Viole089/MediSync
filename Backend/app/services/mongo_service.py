from pymongo import MongoClient
from app.core.config import MONGO_URI
from pymongo.server_api import ServerApi

client = MongoClient(MONGO_URI, server_api=ServerApi('1'))
db = client["MediSync"]

users_collection = db["users"]              
patients_collection = db["patients"]         
audit_logs_collection = db["audit_logs"]     
doctors_collection = db["doctors"]

patients_collection.create_index("cin", unique=True)
