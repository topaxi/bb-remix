## eBill Web

---

### Setup

- Epic Stack as a project starter
- Database ORM with Prisma
- Styling with Tailwind and shadcn/ui
- Testing with Vitest and Testing Library
- Action/Form validation with zod
- Error tracking with Sentry
- Internationalization with i18next
- OpenAPI Service Contracts for typed communication with backend APIs
- K8s/OpenShift deployment via Dockerfile and Helm

---

### The Great

- Clear and easy to understand data flow
- Form centric API simplifies a lot and keeps complex state away
- Helper functions to setup routing in unit/component tests

---

#### Server Driven View State

TODO: Add example of how we drive our dialogs

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

- Less magic and more control over the app than for example with Next.js

---

### The Bad

- Starter comes with a lot of unnecessary things
- Remix plugins and dependency management makes upgrades harder
  - Removed custom routing module
  - Explicitly overwritten several dependency versions
- More complex state management and request handling requires opt-out of Remix
  provided solutions and opt-in of additional addons like `react-query` or
  hand-written solutions.
- Remix-I18next plugin not well integrated and does not provide much benefits
- No "parallel-routes" like Next.js or Angular

---

### The Ugly

- Error handling behaves different in development build
- WAF having trouble integrating a modern stack like Remix
  - Streaming responses not supported
  - Preloading routes not possible (due to preloading via HTML link elements not supported)
  - Hacky workarounds needed for session timeout handling
