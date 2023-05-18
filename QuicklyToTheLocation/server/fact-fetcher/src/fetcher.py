import config

import uvicorn
from routers import  summarize
from fastapi import FastAPI

app = FastAPI()

app.include_router(summarize.router)

if __name__ == "__main__":   
     uvicorn.run("fetcher:app", host=config.HOST_NAME, port=config.SERVER_PORT, reload=True, workers=config.WORKER_NUM, debug=True)  

