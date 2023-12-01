docker-compose up dynamodb -d &&
aws dynamodb create-table \
  --endpoint-url http://localhost:8008 \
  --table-name goat \
  --attribute-definitions \
    AttributeName=PK,AttributeType=S \
    AttributeName=SK,AttributeType=S \
  --key-schema \
    AttributeName=PK,KeyType=HASH \
    AttributeName=SK,KeyType=RANGE \
  --provisioned-throughput \
    ReadCapacityUnits=5,WriteCapacityUnits=5 \
  2>&1 > /dev/null