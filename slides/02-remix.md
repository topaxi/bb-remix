## What is Remix?

---

### Main Concepts

- Routes
- Data-Flow with Loaders, Actions and Forms

---

### Routes

- Convention based directory structure by default
- Only one level deep, with potential subfolder for route only code
- Routes can also be configured explicitly in code

---

#### Route

- A route is a combination of
  - A loader (optional)
  - An action (optional)
  - A component (optional)

---

#### Examples

TODO: Add file based routing example

---

TODO: Add code example of explicit routes

---

### Data-Flow

TODO: Add diagram like here: https://remix.run/docs/en/main/discussion/data-flow

---

#### Loaders and Actions

- TypeScript support
- Single place to interact with services or databases
- Clear separation between GET and POST (TODO: reword this)

---

TODO: Add example code here, non-ebill and one ebill example

---

#### Forms and Fetchers

- Handles concurrency for you
- By default, forms are a thin abstraction over fetchers
- Fetchers provide more fine grained control
  - Adding headers
  - Calling different endpoints

---

TODO: Add example code here, non-ebill and one ebill example
