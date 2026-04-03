# Next.js Internals Lab (App Router)

Production-grade learning project for experienced backend engineers who want to deeply understand how Next.js works internally.

## Why This Project Exists

Most tutorials show what to write. This project explains why the runtime behaves that way:

- Rendering internals (SSR, SSG, ISR, CSR, Streaming)
- Server Components vs Client Components boundaries
- Cache layers and invalidation behavior
- Route handlers and middleware lifecycle
- Advanced routing (dynamic, parallel, intercepting)
- Real WebSocket workaround architecture
- Auth, uploads, iframe integration, and observability

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Run standard Next.js development server:

```bash
npm run dev
```

3. Run with custom WebSocket server (recommended for realtime demo):

```bash
npm run dev:ws
```

4. Open:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

Or with custom WebSocket server:

```bash
npm run build
npm run start:ws
```

## Auth Credentials (Demo)

- username: `backend`
- password: `nextjs`

## Text Diagram: Request Lifecycle

```text
Browser
	-> HTTP Request
		-> Middleware (Edge Runtime)
			-> App Router Match
				-> Server Component Tree Render (RSC payload)
					-> HTML stream + Flight data
						-> Browser receives HTML
							-> Hydration of Client Components
								-> Interactive UI
```

## Text Diagram: Rendering Pipeline

```text
Route Request
	-> Determine static/dynamic mode
	-> Resolve data dependencies (fetch cache strategy)
	-> Render Server Components to RSC payload
	-> Merge Client Component references
	-> Stream HTML + RSC chunks (if Suspense boundaries)
	-> Browser hydrates client islands
```

## Text Diagram: Server/Client Boundary

```text
Server Component (Node/Edge runtime)
	- can access secrets, DB, filesystem
	- can await directly in component body
	- cannot use browser hooks/events

Client Component (Browser)
	- can use useState/useEffect/events
	- cannot access server-only modules/secrets
	- receives serialized props from server
```

## Notes for Backend Engineers (Spring/Express Perspective)

- Route handlers are closest to controller endpoints.
- Middleware is like pre-controller filters/interceptors.
- Server Components are server-side view composition with serialized output.
- `fetch` caching is framework-level and not equivalent to browser HTTP cache.
- WebSockets are not first-class in App Router handlers; run them separately.
