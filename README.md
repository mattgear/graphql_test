# graphql_test

Using Postgresql, Graphql and Express.

Database set up found in database.sql.

Get request example structure:
{
customer(id: "1") {
customer_id
customer_name
contacts {
contact_name
email
phone
}
}
}

Response:
{
"data": {
"customer": {
"customer_id": "1",
"customer_name": "Whale Corp",
"contacts": [
{
"contact_name": "John Doe",
"email": "john.doe@whale.com",
"phone": "07234122345"
},
{
"contact_name": "Jane Doe",
"email": "jane.doe@whale.com",
"phone": "07894324352"
}
]
}
}
}
