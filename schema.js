const graphql = require('graphql');
require('dotenv').config();
const connectionString = process.env.MYURI;
const pgp = require('pg-promise')();
const db = {};
db.conn = pgp(connectionString);

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = graphql;

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    customer_id: { type: GraphQLID },
    customer_name: { type: GraphQLString },
    contacts: {
      type: new GraphQLList(ContactType),
      resolve(parentValue, args) {
        const query = `SELECT * from "test"."contacts" WHERE customer_id=${parentValue.customer_id}`;
        return db.conn
          .many(query)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            return 'The error is: ', err;
          });
      },
    },
  }),
});

const ContactType = new GraphQLObjectType({
  name: 'Contact',
  fields: {
    contact_id: { type: GraphQLID },
    customer_id: { type: GraphQLID },
    contact_name: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM "test"."customers" WHERE customer_id=${args.id}`;
        return db.conn
          .one(query)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            return 'The error is: ', err;
          });
      },
    },
    contact: {
      type: ContactType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM "test"."contacts" WHERE customer_id=${args.id}`;
        return db.conn
          .one(query)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            return 'The error is: ', err;
          });
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

module.exports = schema;
