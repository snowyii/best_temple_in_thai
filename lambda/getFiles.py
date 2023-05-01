import json
import base64

import boto3
from botocore.exceptions import ClientError

s3 = boto3.client("s3")
S3_BUCKET_NAME = 'BUCKET_NAME'

def lambda_handler(event, context):
    try:
        files = s3.list_objects_v2(Bucket=S3_BUCKET_NAME)
        print(files)
        file_names = [obj['Key'] for obj in files['Contents']]
        print(file_names)
        
        
    except ClientError as e:
        return {
            "statusCode": 404,
            "body": str(e)
        }
        
    return {
        "statusCode": 200,
        "body": json.dumps(file_names)
    }
