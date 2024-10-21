# IndiePitcher Node.js SDK

Node.js library for the [IndiePitcher](https://indiepitcher.com) API.

Note: The IndiePitcher REST API and this SDK is not means to be used from your frontend code - you would leak your secret access key that is being used to send emails and manupulate your contact lists.

## Instalation

```
npm install resend
```

## Setup

- Create a free account on [IndiePitcher](https://indiepitcher.com)
- Create a project under one of your organizations
- Generate an API key for your project

```typescript
import { IndiePitcher } from 'indiepitcher';
const indiePitcher = new IndiePitcher('sk_xxxxxxxxxxxxxxxxxxxx');
```

## Usage

### Send a simple email

```typescript
await indiePitcher.sendEmail({
  to: 'petr@indiepitcher.com',
  subject: 'Hello World!',
  body: 'This is a test body that supports **markdown**.',
  bodyFormat: 'markdown',
});
```

- This examle turns a markdown string into a decent looking email, where you can customize the appearance in the dashboard.
- All endpoints to send an email also support sending raw HTML email body to send fully custom-looking emails.
- Please understand that sending cold outreach, and other spammy emails is against our Terms and Services, and may get you banned from the platform.


### Sync a contact

```typescript
const contact = (
  await indiePitcher.addContact({
    email: 'petr@indiepitcher.com',
    name: 'Petr Pavlik'
  })
).data;
```

- Refer to our API documentation to learn more about topics such as contact lists and custom properties.


### Send an email to one or more contacts

```typescript
await indiePitcher.sendEmailToContact({
  contactEmail: 'petr@indiepitcher.com',
  subject: 'Hello {{firstName|default:"there"}}',
  body: 'Hi {{firstName|default:"there"}}, This is a personalized email that supports **markdown**.',
  bodyFormat: 'markdown',
  list: 'important',
});
```

- Use the `important` mailing list only for important communication, emails such as a newsletter should have their own mailing list that contacts can unsubscribe from.
- You can send an email to multiple contacts using a single API call by using `contactEmails` field instead, this takes an array of strings.
- You can delay sending of the email by using `delaySeconds` or `delayUntilDate` properties.
- Both markdown and html email bodies can be personalized using personalization tags, such as `{{firstName}}` or `{{firstName|default:"there"}}`.


### Send an email to all contacts subscribed to a mailing list

```typescript
await indiePitcher.sendEmailToMailingList({
  list: 'important',
  subject: 'Hello {{firstName|default:"there"}}',
  body: 'Hi {{firstName|default:"there"}}, This is a personalized email that supports **markdown**.',
  bodyFormat: 'markdown',
});
```


### Create a mailing list management session

```typescript
const data = await indiePitcher.createMailingListsPortalSession(
  'petr@indiepitcher.com',
  'https://indiepitcher.com',
);
// redirect the user to data.returnUrl to manage their mailing list subscripitons
```

