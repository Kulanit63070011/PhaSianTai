from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import math
import random

app = FastAPI()

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Set the list of allowed origins, or use ["*"] to allow all origins
    allow_credentials=True, # Set to True if you want to allow credentials (cookies, Authorization headers, etc.)
    allow_methods=["GET"], # Set the list of allowed HTTP methods, or use ["*"] to allow all methods
    allow_headers=["*"], # Set the list of allowed headers, or use ["*"] to allow all headers
)
# this color is for 2023
color_match = [
    {
        "red":[
            "cream", "white", "black", "pink", "gray"
        ],
        "brown":[
            "black" , "cream" , "white", "orange", "yellow", "red"
        ],
        "green":[
            "black", "white",  "orange" ,"yellow", "mustard yellow","purple"
        ],
        "blue":[
            "red", "pink", "orange" ,"yellow" ,"gray", "black", "brown"
        ],
        "yellow":[
            "blue", "green", "pink", 'white',"black"
        ],
        "gray":[
             "pink", "blue", "yellow", "orange", "white", "black" 
        ]
    }
]
color_db = [
    {
        "day":"Monday",
        "badLuckColor": [
            ["red", "#ff2e38"]
        ],
        "luckyColor": [
            ["orange", "#f78228"],
            ["yellow", "#ffed4f"],
            ["purple", "#9737e6"],
            ["black", "#0f0f0f"],
            ["dark blue", "#111642"],
            ["green", "#53ed53"],
            ["mustard yellow", "#c7a932"],
            ]
    },
    {
        "day":"Tuesday",
        "badLuckColor": [
            ["white", "#fff"]
            ],
        "luckyColor": [
            ["red", "#ff2e38"],
            ["orange", "#f78228"],
            ["yellow", "#ffed4f"],
            ["purple", "#9737e6"],
            ["black", "#0f0f0f"],
            ["dark blue", "#111642"],
            ["brick", "#8f4032"],
            ["gray", "#cccccc"],
            ]
    },
    {
        "day":"Wednesday",
        "badLuckColor": [
            ["pink","#fc6aae"]
        ],
        "luckyColor": [
            ["dark brown", "#47220c"],
            ["chocolate", "#7b3f00"],
            ["light blue", "#45d4f5"],
            ["orange", "#f78228"],
            ["black", "#0f0f0f"],
            ["dark blue", "#111642"],
            ["yellow", "#ffed4f"],
            ["gray", "#cccccc"],
        ]
    },
    {
        "day":"Thursday",
        "badLuckColor": [
            ["black", "#0f0f0f"],
            ["purple", "#9737e6"]
        ],
        "luckyColor": [
            ["red", "#ff2e38"],
            ["gold", "#af9421"],
            ["yellow", "#ffed4f"],
            ["light blue", "#45d4f5"],
            ["blue", "#0049ae"],
            ["green", "#53ed53"],
            ["cream", "#f1daaa"],
        ]
    },
    {
        "day":"Friday",
        "badLuckColor": [
            ["gray", "#cccccc"],
            ["purple", "#9737e6"]
        ],
        "luckyColor": [
            ["light blue", "#45d4f5"],
            ["orange", "#f78228"],
            ["pink", "#fc6aae"],
            ["yellow", "#ffed4f"],
            ["white", "#fff"],
            ["green", "#53ed53"],
        ]
    },
    {
        "day":"Saturday",
        "badLuckColor": [
            ["green", "#53ed53"],
        ],
        "luckyColor": [
            ["red", "#ff2e38"],
            ["orange", "#f78228"],
            ["light blue", "#45d4f5"],
            ["yellow", "#ffed4f"],
            ["pink", "#fc6aae"],
            ["black", "#0f0f0f"],
            ["dark blue", "#111642"],
            ["gold", "#af9421"],
            ["gray", "#cccccc"],
        ]
    },
    {
        "day":"Sunday",
        "badLuckColor": [
            ["blue", "#0049ae"],
        ],
        "luckyColor": [
            ["green", "#53ed53"],
            ["red", "#ff2e38"],
            ["orange", "#f78228"],
            ["yellow", "#ffed4f"],
            ["purple", "#9737e6"],
            ["black", "#0f0f0f"],
            ["dark blue", "#111642"],
        ]
    },
]
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/colormatch/{color}")
async def get_colormatch(color:str):
    return color_match[color]

@app.get("/colorDay/")
async def get_colorDays():
    return color_db

@app.get("/colorDay/{day_id}")
async def get_colorDay(day_id: int):
    return color_db[day_id]

@app.get("/colorDay/{day_id}/luckyColor")
async def get_colorDay(day_id: int):
    return color_db[day_id]["luckyColor"][math.floor(random.random() * len(color_db[day_id]["luckyColor"]))]