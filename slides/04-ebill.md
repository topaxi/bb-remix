# eBill Web

---

#### eBill Web

![eBill Web Screenshot](/assets/ebill-web-dashboard.png)

---

### Setup

- **Epic Stack** as a project starter
- Database ORM with **Prisma**
- Styling with **Tailwind** and **shadcn/ui**
- Testing with **Vitest** and **Testing Library**
- Action/Form validation with **zod**
- Error tracking with **Sentry**
- Internationalization with **i18next**
- **OpenAPI** Service Contracts for typed communication with backend APIs
- K8s/**OpenShift** deployment via Dockerfile and **Helm**

---

### The Great

- Clear and easy to understand data flow
- Form centric API simplifies a lot and keeps complex state away
- Schemas validation with zod and discriminants define possible UI states
- Helper functions to setup routing in unit/component tests

---

#### Server Driven View State

For our more complex workflows and dialogs we use a server driven view state.

---

#### Server Driven View State

- Server can drive view using enums or state machines
  - Return JSON with a view and status field
- Amazing to drive wizard like workflows

---

#### Server Driven View State

```json [1-2|3|4-6]
{ view: 'form', status: 'success'}
{ view: 'form', status: 'validation', errors: [...] }
{ view: 'progress', status: 'success', data: [...] }
{ view: 'confirmation', status: 'pending' }
{ view: 'confirmation', status: 'success' }
{ view: 'confirmation', status: 'error' }
```

---

#### Server Driven View State

```typescript [29-44|30-31|35|36-42|1-5|6-21|17-21|22-23|24-25]
export async function action({ request, context }) {
  const { api } = context
  const requestData = await request.formData()

  switch (requestData.view) {
    case 'form':
      const response = await handleFormRequest(requestData)

      if (!response.valid) {
        return {
          view: 'form',
          status: 'validation',
          errors: response.data,
        }
      }

      return json({
        view: 'progress',
        status: 'pending',
        data: response.data,
      } as const)
    case 'progress':
      return json({ view: 'confirmation', status: 'success' })
    default:
      throw new Response('Invalid view', { status: 400 })
  }
}

export function DialogView() {
  const { data } = useActionData<typeof action>()
  const view = data?.view ?? 'form';

  return (
    <Form method="post">
      <input type="hidden" name="view" value={view} />
      {view == 'form' &&
        <DialogForm actionData={data} />}
      {view == 'progress' &&
        <DialogFormProgress actionData={data} />}
      {view == 'confirmation' &&
        <DialogConfirmation actionData={data} />}
    </Form>
  )
}
```

---

#### Routed Test Example

```typescript [1|4-5|8-23|14-21|25-28]
import { createRemixStub } from '@remix-run/testing'
import { render } from '@testing-library/react'
import { test } from 'vitest'
import App, { loader as rootLoader } from '#app/root'
import MyPage, { loader, action } from '#app/routes/my-page'

test('render app with routes', async () => {
  const App = createRemixStub([
    {
      id: 'root',
      path: '/',
      Component: App,
      loader: rootLoader,
      children: [
        {
          path: '/my-page',
          Component: MyPage,
          loader,
          action,
        },
      ],
    }
  ])

  render(<App />)

  expect(await screen.findByText('MyPage Title'))
    .toBeVisible()
})
```

---

### The Good

- Simple uncontrolled forms get you far
- Less magic and more control over the app than for example with Next.js
- Easy to opt-out of Remix provided features and do your own thing

---

### The Bad

- Starter came with a lot of unnecessary things
- Remix plugins and dependency management makes upgrades harder
  - Removed custom routing module
    - Recommendation: Use configuration based or the default directory
      structure
  - Explicitly overwritten several dependency versions

---

### The Bad

- More complex state management and request handling requires opt-out of Remix
  provided solutions and opt-in of additional addons like `react-query` or
  hand-written solutions.
- Remix-I18next plugin not well integrated and does not provide much benefits
  - Causing hydration errors out of the box
  - Mostly handrolled solution for now
- No "parallel-routes" like Next.js or Angular

---

### The Ugly

- Error handling behaves different in development build
  - Workaround by (almost) always responding with 2xx status
- WAF having trouble integrating a modern stack like Remix
  - Streaming responses not supported (no Remix `defer`)
  - Preloading routes not possible (due to preloading via HTML link elements not supported)
  - Hacky workarounds needed for session timeout handling
