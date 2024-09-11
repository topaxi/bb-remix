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

#### Routed Test Example

TODO: Add example code here

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

- WAF having trouble integrating a modern stack like Remix
  - Streaming responses not supported
  - Preloading routes not possible (due to preloading via HTML link elements not supported)
  - Hacky workarounds needed for session timeout handling
