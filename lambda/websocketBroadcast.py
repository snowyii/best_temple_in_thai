import json
import urllib3
import boto3


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('connectionId')
endpoint_url = 'secret-endpoint'
client = boto3.client('apigatewaymanagementapi' , endpoint_url=endpoint_url)
BUCKET_NAME='BUCKET_NAME'
def lambda_handler(event, context):
    # TODO implement
    print(event)
    print('-------')
    print(context)
    connectionId = event['requestContext']['connectionId']

    body= json.loads(event['body'])
    
    type = body['type']
    
    print("TYPE" , type)
    if type == 'getUser':
        response = table.scan()
        currentUser = []
        for item in response['Items']:
            try:
                id = item['id']
                currentUser.append(id)
            except Exception as e:
                print("error" , e)
                pass
        

        res = client.post_to_connection(ConnectionId=connectionId, Data=json.dumps({"status" : "join" , "persons" : currentUser }).encode('utf-8'))
    elif type == 'texter':
        response = table.scan()
        for item in response['Items']:
            try:
                message = body['message']
                id = item['id']
                client.post_to_connection(ConnectionId=id , Data = json.dumps({"status" : "texter" , "message" : message}).encode('utf-8'))
            except Exception as e:
                print(e)
                pass
            
    elif type == 'start':
        response = table.scan()
        for item in response['Items']:
            try:
                id = item['id']
                client.post_to_connection(ConnectionId=id , Data = json.dumps({"status" : "start"}).encode('utf-8'))
                print("FIN")
    
            except Exception as e:
                print("ERR", e)
                pass
    elif type == 'add-voice':
        bucket_name=BUCKET_NAME
        response = table.scan()
        for item in response['Items']:
            try:
                message = body['message']
                id = item['id']
                client.post_to_connection(ConnectionId=id , Data = json.dumps({"status" : "add-voice" , "message" : bucket_name+ message}).encode('utf-8'))

            except Exception as e:
                print("ERR" , e)
                pass
    elif type == 'end-pray':
        response = table.scan()
        for item in response['Items']:
            try:
                id = item['id']
                client.post_to_connection(ConnectionId=id , Data = json.dumps({"status" : "end-pray"}).encode('utf-8'))
            except Exception as e:
                print("ERR" , e)
                pass

    
    

    
    return {
        'statusCode': 200
    }
