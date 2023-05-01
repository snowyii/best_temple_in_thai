import json
import base64

import boto3
from botocore.exceptions import ClientError

s3 = boto3.client("s3")
S3_BUCKET_NAME = 'BUCKET_NAME'

def lambda_handler(event, context):
    
    data = json.loads(event['body'])
    file_name = data['fileName']
    
    try:
        file = s3.get_object(Bucket=S3_BUCKET_NAME, Key=file_name)["Body"].read()
        file_content = base64.b64encode(file).decode('utf-8')
        
    except ClientError as e:
        return {
                "statusCode" : 404,
                "body": json.dumps(e)
                }
        
    return {
            "statusCode": 200,
            "body": json.dumps(file_content)
            
            }
