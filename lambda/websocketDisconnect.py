import json
import boto3


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('connectionId')
ENDPOINT_URL='ENDPOINT_URL'

client = boto3.client('apigatewaymanagementapi' , endpoint_url=ENDPOINT_URL)

def lambda_handler(event, context):
    # TODO implement
    connectionId = event['requestContext']['connectionId']
    try:
        table.delete_item(Key={'id': connectionId})
        response = table.scan()
        currentUser = []
        for item in response['Items']:
            try:
                id = item['id']
                currentUser.append(id)
            except Exception as e:
                print("error" , e)
                pass
        
        for id in currentUser:
            res = client.post_to_connection(ConnectionId=id, Data=json.dumps({"status" : "join" , "persons" : currentUser }).encode('utf-8'))
       
            
            

    except Exception as e :
        print(e)
        pass
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
