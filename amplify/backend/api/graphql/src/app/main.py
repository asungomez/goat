from fastapi import FastAPI
import strawberry
from strawberry.fastapi import GraphQLRouter
from db import add_element


@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        add_element(pk="pk", sk="sk")
        return "Hello world!"


schema = strawberry.Schema(Query)

graphql_app = GraphQLRouter(schema)


app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")
