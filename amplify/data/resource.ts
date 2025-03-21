import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
Here we define the entire DB structure.

The "Event" contains the top-level data of the event.  
The Event is the root of the tree describing general parameters of the entire Conference.
The Event further comprises "Page"s and "Product"s.
The Event alsom comprises two fields that are particularly important for 
managing the conference: the chair (string[]), and the roleManager (string[]).
The names (or better: unique userIDs) recorded there will have special rights in editing 
the data and to manage the access rights of others.

Each "Page" is a general description page of the website, and just provide a nice 
general description of the Event.  E.g. "Overview", "Programme", "Venue", "Contact and Support"

Each "Product" is a part of the Event, for which participants can subscribe, 
and to which participants can possibly submit some contributions.
Each Product may contain further "SubmissionType"s that each describe a possible 
contribution, that the participants can upload, and which can then be reviewed 
and either accepted or rejected.
Each Product can have several "Price"s associated with it, to allow different rates
for normal participants, volunteers, students, earlybirds, late registrations, etc
Each Product can have several "Option"s.  This allows the selection of some specific
service.  E.g. when registering for a dinner, to select a type of menu, or to tick 
a box that allows entering freetext for special needs. 

E.g. for a conference, there should be at least one Product, the conference itself, 
so that participants can register for the conference.  If such a product is not provided, 
then the pages still provide a general description of the entire event, but no
submissions are possible. 
The conference-product itself can then accept a certain number of different types of 
submissions, declared as "SubmissionType"s.  E.g. any registered participant can 
choose to submit one or nore papers for the main track, or papers for a special 
session, and posters for a poster session. The "main track", "special session" and 
"posters" would be the allowed SubmissionTypes, and each such SubmissionType can have 
its own review scheme.

Sometimes, it would be useful to require separate registration for certain events 
(different Workshops, Sessions, Courses, Exhibition, Gala-event, etc), either to 
be able to manage/limit the number of paticipants, to charge a separate fee, or 
simply to clarify that these are entirely seperate (sub-)events.
In this case, seperate "Products" should be created.  This allows fine-grained control 
of the separate sub-events. These may or may not require additional payment.  As each 
sub-event is also just a "Product", it can then also allow submissions of any desired
type. 

=========================================================================*/
const schema = a.schema({
  Event: a.model({
    eventID: a.id().required(),
    title: a.string(),
    eventType: a.string(),
    logoImage: a.url(),
    chair: a.string().array(),
    roleManager: a.string().array(),
    contentsEditor: a.string().array(),
    location: a.string(),
    pages: a.hasMany('Page', 'pageID'),
    products: a.hasMany('Product', 'productID'),
    theme: a.string(),
    availableLanguages: a.string().array(),
    language: a.string(),
    jsonobject: a.string(),
  })
    .identifier(['eventID'])
    .authorization((allow) => [allow.owner()]),

  Page: a.model({
    pageID: a.id().required(),
    partOfEvent: a.belongsTo('Event', 'eventID'),
    pageTitle: a.string(),
    pageContent: a.string(),
    language: a.string(),
    jsonobject: a.string(),
  })
    .identifier(['pageID'])
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
    minParticipants: a.integer(),
    maxParticipants: a.integer(),
    registrationStartDate: a.date(),
    registrationEndDate: a.date(),
    option: a.hasMany('Option', 'optionID'),
    minNumberOfOptionsToSelect: a.integer(),
    maxNumberOfOptionsToSelect: a.integer(),
    submission: a.hasMany('SubmissionType', 'submissionTypeID'),
    price: a.hasMany('Price', 'priceID'),
    language: a.string(),
    jsonobject: a.string(),
  })
    .identifier(['productID'])
    .authorization((allow) => [allow.owner()]),

  Option: a.model({
    optionID: a.id().required(),
    forProduct: a.belongsTo('Product', 'productID'),
    description: a.string(),
    language: a.string(),
    jsonobject: a.string(),
  })
    .identifier(['optionID'])
    .authorization((allow) => [allow.owner()]),

  Price: a.model({
    priceID: a.id().required(),
    forProduct: a.belongsTo('Product', 'productID'),
    amount: a.float(),
    currency: a.string(),
    description: a.string(),
    startDate: a.date(),
    endDate: a.date(),
    language: a.string(),
    jsonobject: a.string(),
  })
    .identifier(['priceID'])
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
    jsonobject: a.string(),
  })
    .identifier(['submissionTypeID'])
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
    jsonobject: a.string(),
  })
    .identifier(['submissionID'])
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
    jsonobject: a.string(),
  })
    .identifier(['reviewID'])
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
