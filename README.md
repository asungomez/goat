# GOAT project

Welcome to the GOAT project! This is a project to create the GOAT (Greatest Of All Time) city guide as a web application.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 18 or higher)
- [Yarn](https://yarnpkg.com/) (version 1.22 or higher)
- [Docker](https://www.docker.com/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/) (version 1.29 or higher)
- [Python](https://www.python.org/) (version 3.11 or higher)
- [Pip](https://pypi.org/project/pip/) (version 21.3 or higher)
- [AWS CLI](https://aws.amazon.com/cli/) (version 2.2 or higher)

Optional:

- [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html)

### Installation

1. Clone the repository
2. Run `yarn install` in the root of the repository
3. Create a Python virtual environment
4. Run `pip install -r amplify/backend/api/graphql/src/requirements.txt` in the root of the repository

### Running the application

For running the front-end:

1. Run `yarn start` in the root of the repository
2. Open [http://localhost:3000](http://localhost:3000) in your browser

For running the database:

1. Run `yarn db:start` in the root of the repository

For running the API:

1. Run `yarn api:start` in the root of the repository
2. Open [http://localhost:8000](http://localhost:8000) in your browser

## Running the tests

### Front-end

1. Run `yarn test:unit` in the root of the repository for unit tests

### Back-end

TBD

### End-to-end

1. Run `yarn test:e2e` in the root of the repository for end-to-end tests

## Deployment

Deployment to the development environment is done automatically when a pull request is merged to the `main` branch.

## Local development environment

### NoSQL Workbench

To use NoSQL Workbench with DynamoDB Local:

1. Download [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html)
2. Open NoSQL Workbench
3. Select DynamoDB
4. Select `Operation Builder` on the left side menu
5. Select `Add Connection`
6. Select the tab `DynamoDB local`
7. In the `Connection name` field, enter `GOAT`
8. In the `Hostname` field, enter `localhost`
9. In the `Port` field, enter `8008`
