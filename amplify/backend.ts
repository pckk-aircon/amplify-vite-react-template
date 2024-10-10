import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

//追加。
import { aws_dynamodb } from "aws-cdk-lib";

defineBackend({
  auth,
  data,
});

//以下、すべて追加。
const externalDataSourcesStack = backend.createStack("MyExternalDataSources");

const externalTable = aws_dynamodb.Table.fromTableName(
  externalDataSourcesStack,
  "MyExternalPostTable",
  "PostTable"
);

backend.data.addDynamoDbDataSource(
  "ExternalPostTableDataSource",
  externalTable
);
