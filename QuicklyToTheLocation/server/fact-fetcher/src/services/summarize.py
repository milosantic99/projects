import json
import requests
from transformers import PegasusForConditionalGeneration, PegasusTokenizer

WIKI_BASE_URL=''
WIKI_SUMMARY_LINK='https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&exchars={}&titles={}'

# Load tokenizer 
tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")

# Load model 
model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")

# TODO: check if there is an upper limit to input string
def summarize_text(text: str) -> str:
    # Create tokens - number representation of our text
    tokens = tokenizer(text, truncation=True, padding="longest", return_tensors="pt")
    
    # Summarize 
    summary = model.generate(**tokens)

    return tokenizer.decode(summary[0])

def summarize_wiki(query: str, max_chars: int) -> str:
    response = requests.get(WIKI_SUMMARY_LINK.format(max_chars, query))
    res_text = json.loads(response.text)

    pages = res_text['query']['pages']
    
    for x in pages.values():
        return x['extract']
