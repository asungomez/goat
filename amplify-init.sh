#!/bin/bash
set -e
IFS='|'

REACTCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"build\",\
\"BuildCommand\":\"npm run-script build\",\
\"StartCommand\":\"npm run-script start\"\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"profileName\":\"default\",\
\"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
\"secretAccessKey\":\"$AWS_SECRET_ACCESS_KEY\",\
\"region\":\"$AWS_REGION\"\
}"
AMPLIFY="{\
\"projectName\":\"geapp\",\
\"envName\":\"dev\",\
\"defaultEditor\":\"code\"\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"
AUTHCONFIG="{\
\"userPoolId\": \"$USER_POOL_ID\",\
\"webClientId\": \"$AWS_WEB_CLIENT_ID\",\
\"nativeClientId\": \"$AWS_NATIVE_CLIENT_ID\",\
\"identityPoolId\": \"$AWS_IDENTITY_POOL_ID\"\,\
\"googleAppIdUserPool\": \"$AMPLIFY_GOOGLE_CLIENT_ID\"\,\
\"googleAppSecretUserPool\": \"$AMPLIFY_GOOGLE_CLIENT_SECRET\"\
}"

CATEGORIES="{\
\"auth\":$AUTHCONFIG\
}"

amplify init \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \
--categories $CATEGORIES \
--yes