import boto3
import calendar
import time
import os

db_url = os.environ.get("DB_URL")

dynamodb = (
    boto3.resource(service_name="dynamodb", endpoint_url=db_url)
    if db_url
    else boto3.resource("dynamodb")
)
table = dynamodb.Table(os.environ["STORAGE_GOAT_NAME"])


def add_element(pk: str, sk: str):
    current_gmt = time.gmtime()
    time_stamp = calendar.timegm(current_gmt)
    table.put_item(Item={"PK": pk, "SK": f"{sk}-{time_stamp}"})
