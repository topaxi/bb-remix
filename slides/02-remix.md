## What is Remix?

---

### What is Remix?

- Remix is a modern React framework
- Focused on web standards

---

### Main Concepts

- Routes
- Data-Flow with Loaders, Actions and Forms

---

### Routes

- Convention based directory structure by default
  - Only one level deep, with potential subfolder for route only code
- Routes can also be configured explicitly in code
- Nested routes are supported and load in parallel
  - No spinners ;)

---

#### Route

- A route is a combination of
  - A loader (optional)
  - An action (optional)
  - A component (optional)

---

### Route File Structure Example

TODO: Add example of route file structure and their paths

---

#### Loader Example

```typescript [1-3|5-9]
export function loader({ request, params, context }) {
  return json({ status: "success", data: [] } as const)
}

export default function RouteComponent() {
  const { status, data } = useLoaderData<typeof loader>()

  return <div>{status}: {data.length}</div>
}
```

---

#### Action Example

```typescript [1-13|15-29]
export function action({ request, params, context }) {
  let requestBody = await request.json()
  let validation = FormSchema.safeParse(requestBody)

  if (!validation.valid) {
    return json({
      status: "error",
      issues: validation.error.issues
    } as const)
  }

  return json({ status: "success" } as const)
}

export default function RouteComponent() {
  const actionData = useActionData<typeof action>()

  return (
    <Form method="post">
      {actionData?.status === 'success'
        && <p className="text-green">Success!</p>}
      <input name="username" />
      {actionData?.status === 'error' &&
        <p className="text-red empty:hidden">
          {actionData.issues.username}
        </p>}
    </Form>
  )
}
```

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

```

```
