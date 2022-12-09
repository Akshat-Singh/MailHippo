from google_search_results import GoogleSearchResults

searchParams = {
    "engine": "google",
    "q": "Coffee",
    "google_domain": "google.com",
    "gl": "in",
    "hl": "en",
    "api_key": "df823b687cb4a3fd3dfb2314b812bc540e876e6d3764a9b324b5be07afdf815c"
}

client = GoogleSearchResults(searchParams)
results = client.get_dict()

print(results)