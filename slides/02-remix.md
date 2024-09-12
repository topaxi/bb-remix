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

#### Route File Structure Example

Flat Routes is the default

```txt [1|2|3|4-6]
app/root.tsx
app/routes/_index.tsx
app/routes/about.tsx
app/routes/blog.tsx
app/routes/blog._index.tsx
app/routes/blog.$slug.tsx
```

---

#### Route File Structure Example

Optionally, one can treat a route as a module folder, with a mandatory `route.tsx` file.

```txt [3-5]
app/routes/blog.tsx
app/routes/blog._index.tsx
app/routes/blog.$slug/route.tsx
app/routes/blog.$slug/components/...
app/routes/blog.$slug/utils/...
```

Further nesting for routes is **not** possible though.

---

#### Route Configuration in Code Example

```typescript [1-19|7-16]
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    remix({
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "app/home/route.tsx", { index: true });
          route("about", "app/about/route.tsx");
          route("blog", "app/blog/route.tsx", () => {
            route("", "app/blog/index/route.tsx", { index: true });
            route(":slug", "app/blog/post/route.tsx");
          });
        });
      },
    }),
  ],
});
```

---

#### What is a Route anyway?

- is an URL path
- and a combination with at least one of
  - A loader (optional)
  - An action (optional)
  - A component (optional)

---

### Data-Flow

![Remix Data-Flow](/assets/remix-dataflow.png)

---

#### Loaders and Actions

- TypeScript support
- Defined place to interact with services or databases
- Clear separation between presentation and interaction

---

#### Forms and Fetchers

- Handles concurrency for you
- By default, forms are a thin abstraction over fetchers
- Fetchers provide more fine grained control
  - Adding headers
  - Calling different endpoints

---

#### Loader Example

```typescript [1-3|5-9]
export async function loader({ request, params, context }) {
  return json({ status: "success", data: [] } as const)
}

export default function RouteComponent() {
  const { status, data } = useLoaderData<typeof loader>()

  return <div>{status}: {data.length}</div>
}
```

---

#### Action Example

```typescript [3-15|17-31]
import { Form, useActionData } from '@remix-run/react'

export async function action({ request, params, context }) {
  let requestBody = await request.formData()
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
  const data = useActionData<typeof action>()

  return (
    <Form method="post">
      {data?.status == 'success'
        && <p className="text-green">Success!</p>}
      <input name="username" />
      {data?.status == 'error' &&
        <p className="text-red empty:hidden">
          {data.issues.username}
        </p>}
    </Form>
  )
}
```

---

#### Fetcher Example

```typescript [4-9|5|6|7|8|9|12-27|14,18|16|22-24]
export async function action(...) { ... }

export function MyForm() {
  const {
    Form,
    data,
    state, // 'idle' | 'loading' | 'submitting'
    load, // triggers 'loading'
    submit, // triggers 'submitting'
  } = useFetcher<typeof action>()

  return (
    <Form method="post">
      {state == 'idle' && data?.status == 'success'
        && <p className="text-green">Success!</p>}
      <fieldset disabled={state != 'idle'}>
        <input name="username" />
        {state == 'idle' && data?.status == 'error' &&
          <p className="text-red empty:hidden">
            {data.issues.username}
          </p>}
        <Button type="submit">
          {state == 'submitting' ? 'Saving…' : 'Save'}
        </Button>
      </fieldset>
    </Form>
  )
}
```
