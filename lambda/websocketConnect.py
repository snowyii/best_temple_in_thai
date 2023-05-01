import json
import boto3


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('connectionId')
ENDPOINT_URL='ENDPOINT_URL'
client = boto3.client('apigatewaymanagementapi' , endpoint_url=ENDPOINT_URL)


def lambda_handler(event, context):
    # TODO implement
    print(event) 
    print('-----')

    print(context)
    
    connectionId = event['requestContext']['connectionId']
    print(connectionId)
    table.put_item(Item={'id': connectionId})
     
    response = table.scan()
    # responseMessage = 'responding...'
    print("LEN" , len(response['Items']))
    current_people = []
    for item in response['Items']:
        try:
            
            # body = json.loads(event['body'])
            
            id = item['id']
            current_people.append(id)
        except:
            pass
    
    for people in current_people:
        try:
            do = client.post_to_connection(ConnectionId=people, Data=json.dumps({"status" : "join" , "persons": current_people}).encode('utf-8'))
        except Exception as e:
            print("ERR" ,e)
            pass
        
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
