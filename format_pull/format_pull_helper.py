from selenium import webdriver
import os
import bs4
import time
import requests
from collections import defaultdict

def scrape_format(org):
    url = f"https://google.com/search?q=" + org + "+email+format"
    request_result=requests.get(url)

    soup_links = bs4.BeautifulSoup(request_result.content, "html.parser")
    soup_title = bs4.BeautifulSoup(request_result.text, "html.parser")

    heading_object=soup_title.find_all('a', href=True)

    info = defaultdict(lambda: None)
    final = ""
    found = False
    for item in heading_object:
        href_url = item['href'][7:]
        if "webspotter" in href_url:
            final = href_url.split('&')[0]
            print(final)
            found = True
            break
    
    if not found:
        for item in heading_object:
            href_url = item['href'][7:]
            if "aero" in href_url:
                final = href_url.split('&')[0]
                print(final)
                found = True
                break
    
    if not found:
        return "404"
        

    url = final
    FORMAT_request_result = requests.get(url)

    FORMAT_soup = bs4.BeautifulSoup(FORMAT_request_result.text, "html.parser")
    unpolished_res = FORMAT_soup.find_all('td')

    FORMAT_soup = bs4.BeautifulSoup(FORMAT_request_result.text, "html.parser")

    comp_name = FORMAT_soup.find(lambda tag:tag.name=="h2" and "email formats and examples" in tag.text).getText()
    comp_name = comp_name.split(" email ")[0]

    res_dict = {"format": unpolished_res[0].getText(), "example": unpolished_res[1].getText(), "org": comp_name}

    return(res_dict)

