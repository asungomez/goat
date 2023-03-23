export type AmplifyDependentResourcesAttributes = {
  api: {
    AdminQueries: {
      ApiId: 'string';
      ApiName: 'string';
      RootUrl: 'string';
    };
  };
  auth: {
    goat: {
      AppClientID: 'string';
      AppClientIDWeb: 'string';
      GoogleWebClient: 'string';
      HostedUIDomain: 'string';
      IdentityPoolId: 'string';
      IdentityPoolName: 'string';
      OAuthMetadata: 'string';
      UserPoolArn: 'string';
      UserPoolId: 'string';
      UserPoolName: 'string';
    };
    userPoolGroups: {
      AdminGroupRole: 'string';
      EditorGroupRole: 'string';
    };
  };
  function: {
    AdminQueriesb2085d65: {
      Arn: 'string';
      LambdaExecutionRole: 'string';
      LambdaExecutionRoleArn: 'string';
      Name: 'string';
      Region: 'string';
    };
  };
};
