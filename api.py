from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

import configparser

class Item(BaseModel):
    name: str
# Configs
config = configparser.ConfigParser()
config.read('backend/backend.ini')
print("Config:", {section: dict(config[section]) for section in config.sections()})

# Server setup
app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)





# @app.get("/server")
# def read_item(data: abc):
#     print(abc)
#     return {"item_id": abc}

@app.get("/")
def read_root():
    return {"Ping":"Pong"}

@app.post("/server")
async def post_data(item: Item):
    print(item)
    return item

@app.get("/check")
def read_root():
    return {"Pingff":"Pong"}
