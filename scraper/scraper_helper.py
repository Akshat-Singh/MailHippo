from selenium import webdriver
import os
import bs4
import time
import requests
from collections import defaultdict

def clean_response(res):
    res = res.split(' | ')[0]
    res = res.split('in.linkedin.com')[0]
    return res


def scrape_person(org, pos):
    org = org.replace(" ", "+").replace('"', '')
    pos = pos.replace(" ", "+").replace('"', '')
    url = f"https://google.com/search?q={pos}+{org}+linkedin"
    print(url)
    request_result=requests.get(url)

    soup_links = bs4.BeautifulSoup(request_result.content, "html.parser")
    soup_title = bs4.BeautifulSoup(request_result.text, "html.parser")

    heading_object=soup_title.find_all('a', href=True)

    info = defaultdict(lambda: None)
    final = []

    for item in heading_object:
        href_url = item['href'][7:]
        if "linkedin" not in href_url:
            continue
        
        cleaned_response = clean_response(item.getText()) 
        print(cleaned_response)
        response_list = cleaned_response.split(" - ")

        if len(response_list) < 3:
            continue
        
        print(response_list)
        final.append({"Name" : response_list[0], "Position": response_list[1], "Company": response_list[2]})
    
    return final  

