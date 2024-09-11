# Agenda

- Introduction
- What is Remix?
- How did it fare in eBill in the past 6 months?
- Questions

## Introduction

- ...
- Please ask questions right away or at the end of the presentation :)

## What is Remix?

### Main Concepts

- Routes
- Data-Flow with Loaders, Actions and Forms

### Routes

- Convention based directory structure by default
- Only one level deep, with potential subfolder for route only code
- Routes can also be configured explicitly in code

#### Route

- A route is a combination of
  - A loader (optional)
  - An action (optional)
  - A component (optional)

#### Examples

TODO: Add file based routing example
TODO: Add code example of explicit routes

### Data-Flow

TODO: Add diagram like here: https://remix.run/docs/en/main/discussion/data-flow

#### Loaders and Actions

- TypeScript support
- Single place to interact with services or databases
- Clear separation between GET and POST (TODO: reword this)

TODO: Add example code here, non-ebill and one ebill example

#### Forms and Fetchers

- Handles concurrency for you
- By default, forms are a thin abstraction over fetchers
- Fetchers provide more fine grained control
  - Adding headers
  - Calling different endpoints

TODO: Add example code here, non-ebill and one ebill example

## How is this different from Next.js?

- SPA Mode
- (No) Static Site Generation
- Much easier self-hosting
- Smaller API footprint
- Just a vite plugin
- Common patterns supported out of the box
  - Navigation Blocker
  - Fetching data, handling concurrency
- Open Roadmap and public "sprint plannings" on YT

## eBill Web

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

### The Great

- Clear and easy to understand data flow
- Form centric API simplifies a lot and keeps complex state away
- Helper functions to setup routing in unit/component tests

#### Routed Test Example

TODO: Add example code here

### The Good

- Less magic and more control over the app than for example with Next.js

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

### The Ugly

- WAF having trouble integrating a modern stack like Remix
  - Streaming responses not supported
  - Preloading routes not possible (due to preloading via HTML link elements not supported)
  - Hacky workarounds needed for session timeout handling

## Conclusion

- Remix is a great framework and I'm looking forward to see what the future brings
- Given the low complexity of the project, I'm not sure I'd pick a complex
  frontend framework

## Questions?

## Thank You!

- Ä guetä :)
