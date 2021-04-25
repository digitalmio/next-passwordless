# Next.js Passwordless

## This project is incomplete, but getting closer...
----
## Overview
Next Passwordless is a simple open source magic link authentication library for Next.js applications.
It is designed from the ground up to support [Next.js](https://nextjs.org/).

It will NOT work with plain React apps.

## Getting started
Install package using NPM or Yarn:
```
npm i next-passwordless
yarn add next-passwordless
```

## Features
- Simple passwordless, magic link sign in mechanisms
- JWT tokens based
- Restrictive, secure cookie policy by default (HTTP only cookies)
- No database required for the package to work
- Bring Your Own User, database agnostic

## Example

### Add API Route
Simply add `[[...nextPasswordless]].ts` (or js) file in `pages/api/auth`.

```
import { NextPasswordlessServer } from 'next-passwordless';

export default NextPasswordlessServer({
  secret: 'someRandomString',
  rootUrl: 'https://yourDomainName.com/',
  generateEmailContent: async(code, link) => 'HtmlEmailCopy',
  sendEmail: async(destination, code) => sendEmailToUser(destination, code),
});
```

### React component
```
import { useSession } from 'next-passwordless';

function Component() {
  const { loading, session } = useSession();

  if (loading) {
    return <p>Loading</p>
  }

  if (session) {
    // user is logged in
    return <p>{JSON.stringify(session)}</p>
  }

  // User is not logged in
  return <p>You need to be logged in to view this page</p>;
}

export default Component
```

## Typescript
Next Passwordless is build in Typescript and comes fully typed.