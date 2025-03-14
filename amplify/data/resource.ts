import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Event: a.model({
    eventID: a.id().required(),
    title: a.string(),
    eventType: a.string(),
    logoImage: a.url(),
    location: a.string(),
    pages: a.hasMany('Page', 'pageID'),
    products: a.hasMany('Product', 'productID'),
    chair: a.string().array(),
    theme: a.string(),
    roleManager: a.string().array(),
    contentsEditor: a.string().array(),
    availableLanguages: a.string().array(),
    language: a.string(),
  })
    .authorization((allow) => [allow.owner()]),

  Page: a.model({
    pageID: a.id().required(),
    partOfEvent: a.belongsTo('Event', 'eventID'),
    pageTitle: a.string(),
    pageContent: a.string(),
    language: a.string(),
  })
    .authorization((allow) => [allow.owner()]),

  Product: a.model({
    productID: a.id().required(),
    partOfEvent: a.belongsTo('Event', 'eventID'),
    title: a.string(),
    type: a.string(),
    description: a.string(),
    chair: a.string().array(),
    date: a.date(),
    time: a.time(),
    location: a.string(),
    registrationDeadline: a.date(),
    submission: a.hasMany('SubmissionType', 'submissionTypeID'),
    price: a.float(),
    priceCurrency: a.string(),
    priceDescription: a.string(),
    priceDeadline: a.date(),
    price1: a.float(),
    price1Currency: a.string(),
    price1Description: a.string(),
    price1Deadline: a.date(),
    price2: a.float(),
    price2Currency: a.string(),
    price2Description: a.string(),
    price2Deadline: a.date(),
    price3: a.float(),
    price3Currency: a.string(),
    price3Description: a.string(),
    price3Deadline: a.date(),
    language: a.string(),
  })
    .authorization((allow) => [allow.owner()]),

  SubmissionType: a.model({
    submissionTypeID: a.id().required(),
    forProduct: a.belongsTo('Product', 'productID'),
    submissionTypeName: a.string(),
    description: a.string(),
    required: a.boolean(),
    callForSubmission: a.string(),
    reviewScheme: a.string(),
    submissionDeadlineDate: a.date(),
    submissionDeadlineTime: a.time(),
    reviewDeadline: a.date(),
    acceptanceNotificationDate: a.date(),
    submissions: a.hasMany('Submission', 'submissionID'),
    language: a.string(),
  })
    .authorization((allow) => [allow.owner()]),

  Submission: a.model({
    submissionID: a.id().required(),
    submissionType: a.belongsTo('SubmissionType', 'submissionTypeID'),
    title: a.string(),
    contributor: a.string(),
    originalFilename: a.string(),
    documentLink: a.url(),
    filingDate: a.date(),
    filingTime: a.time(),
    review: a.hasMany('Review', 'reviewID'),
    accepted: a.boolean(),
    language: a.string(),
  })
    .authorization((allow) => [allow.owner()]),

  Review: a.model({
    reviewID: a.id().required(),
    submission: a.belongsTo('Submission', 'submissionID'),
    reviewer: a.string(),
    review: a.string(),
    filingDate: a.date(),
    filingTime: a.time(),
    recommendAcceptance: a.boolean(),
    language: a.string(),
  })
    .authorization((allow) => [allow.owner()]),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
