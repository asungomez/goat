import { API, Auth } from 'aws-amplify';

const PATHS = ['/listUsers', '/setUserGroup', '/removeUserGroups'] as const;
const ROLES = ['Admin', 'Editor', 'Visitor'] as const;

export type Role = (typeof ROLES)[number];

export type UserResponse = {
  Username: string;
  Attributes: { Name: string; Value: string }[];
  Groups: string[];
};

export type User = {
  id: string;
  email: string;
  role: Role;
};

const get = async (
  path: (typeof PATHS)[number],
  queryParams: { [param: string]: string | undefined | number } = {},
) => {
  return API.get('AdminQueries', path, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${(await Auth.currentSession())
        .getAccessToken()
        .getJwtToken()}`,
    },
    queryStringParameters: queryParams,
  });
};

const post = async (
  path: (typeof PATHS)[number],
  body: { [param: string]: string } = {},
) => {
  return API.post('AdminQueries', path, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${(await Auth.currentSession())
        .getAccessToken()
        .getJwtToken()}`,
    },
    body,
  });
};

const findAttributeValue = (user: UserResponse, attribute: string) =>
  user.Attributes.find((att) => att.Name === attribute)?.Value;

const isUserResponse = (value: unknown): value is UserResponse =>
  typeof value === 'object' &&
  value !== null &&
  'Username' in value &&
  'Attributes' in value &&
  'Groups' in value &&
  Array.isArray((value as UserResponse)['Groups']) &&
  Array.isArray((value as UserResponse)['Attributes']) &&
  (value as UserResponse)['Attributes'].reduce(
    (correct, value) => correct && isAttribute(value),
    true,
  );

const isAttribute = (
  value: unknown,
): value is { Name: string; Value: string } =>
  typeof value === 'object' &&
  value !== null &&
  'Name' in value &&
  'Value' in value &&
  !!(value as { Name: string; Value: string })['Name'] &&
  !!(value as { Name: string; Value: string })['Value'];

export type ListUsersResponse = {
  users: User[];
  nextToken?: string;
};

export const listUsers = async (
  nextToken?: string,
  email?: string,
): Promise<ListUsersResponse> => {
  const response = await get('/listUsers', {
    token: nextToken,
    limit: 10,
    search: email,
  });
  if (
    !response.Users ||
    !Array.isArray(response.Users) ||
    !response.Users.length
  ) {
    return { users: [] };
  }
  const users = response.Users.map((user: unknown): User | null => {
    if (!isUserResponse(user)) {
      return null;
    }
    const id = user.Username;
    const email = findAttributeValue(user, 'email');
    if (!id || !email) {
      return null;
    }
    let role: Role = 'Visitor';
    for (const group of user.Groups) {
      if (ROLES.includes(group as Role)) {
        role = group as Role;
      }
    }
    return { id, email, role };
  }).filter(Boolean);
  return {
    users,
    nextToken: response.NextToken,
  };
};

export const setUserRole = async (id: string, role: Role): Promise<void> => {
  if (role !== 'Visitor') {
    await post('/setUserGroup', { username: id, groupname: role });
  } else {
    await post('/removeUserGroups', { username: id });
  }
};
