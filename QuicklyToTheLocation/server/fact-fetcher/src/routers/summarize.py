from services import summarize

from fastapi import APIRouter, Query
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter(prefix='/summarize')

@router.get('/')
async def summarize_text(text: Optional[str] = Query(..., description='Text to summarize')):
    return summarize.summarize_text(text)
    
@router.get('/wiki')
async def summarize_wiki(
    query: Optional[str] = Query(..., description='Search query which will be used to search Wikipedia (English only)'),
    max_chars: Optional[int] = Query(1200, min=0, max=1200, description='Maximum number of characters to transfer. Number between 0 and 1200.')
):
    return summarize.summarize_wiki(query, max_chars)
