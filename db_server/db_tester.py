import pymongo 
from flask_pymongo import PyMongo
import time


mongodb_client = pymongo.MongoClient('mongodb+srv://Akshat-Singh:nFq9o6UCBGTh4RTD@cluster0.oup2qmt.mongodb.net/?retryWrites=true&w=majority')
db = mongodb_client.get_database('Users')

dbc = mongodb_client.get_database('Data_By_Company')
dbr = mongodb_client.get_database('Data_By_Role')


def test_duplication_insert():
    records_v1 = dbc.Consulting
    records_v2 = dbr.Consulting

    
    for i in range(100):
        
        records_v1.insert_one({"org_id": "Bain and Company", "format": "{first}.{last}@bain.com", "example": "jane.doe@bain.org"})
        records_v2.insert_one({"org_id": "Bain and Company", "format": "{first}.{last}@bain.com", "example": "jane.doe@bain.org"})



def test_duplication_view():
    records_v1 = dbc.Consulting
    records_v2 = dbr.Consulting

    
    for i in range(100):
        
        records_v1.find({"org_id": "Bain and Company"})
        records_v2.find({"org_id": "Bain and Company"})


def test_indexed_insert():
    records = db.Tester
    
    for i in range(100):
        records.insert_one({"org_id": "Bain and Company", "format": "{first}.{last}@bain.com", "example": "jane.doe@bain.org"})


def test_indexed_view():
    records = db.Tester
    
    for i in range(100):
        records.find({"org_id": "Bain and Company"})


time_index_view1 = time.time() 
test_indexed_view()
time_index_view2 = time.time() 

time_index_insert1 = time.time()
test_indexed_insert()
time_index_insert2 = time.time()

time_duplicate_view1 = time.time()
test_duplication_view()
time_duplicate_view2 = time.time()

time_duplicate_insert1 = time.time()
test_duplication_insert()
time_duplicate_insert2 = time.time()

print(time_index_view2 - time_index_view1, "secs. ")
print(time_index_insert2 - time_index_insert1, "secs. ")
print(time_duplicate_view2 - time_duplicate_view1, "secs. ")
print(time_duplicate_insert2 - time_duplicate_insert1, "secs. ")


