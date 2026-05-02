## Stage 1

### Problem
Users lose track of important notifications due to high volume.
A Priority Inbox is needed that surfaces the top 'n' most important unread notifications.

### Approach
Each notification is assigned a priority score based on two factors:
1. **Type Weight** — Placement (3) > Result (2) > Event (1)
2. **Recency** — Newer notifications score higher using: `1 / (ageInSeconds + 1)`

### Formula
score = typeWeight + (1 / (ageInSeconds + 1))

### Algorithm
1. Fetch all notifications from the API
2. For each notification, compute its score
3. Sort notifications by score in descending order
4. Return top N (default: 10)

### Efficiency for Incoming Notifications
To maintain the top 10 efficiently as new notifications arrive,
a Min-Heap of size N can be used. Each new notification is scored
and compared against the minimum in the heap. If higher, it replaces
the minimum. This gives O(log N) insertion vs O(N log N) full sort.

## Stage 2

### Frontend Dashboard
A modern, responsive React (Next.js + Turbopack) web interface designed to render both All Notifications and the computed Priority Inbox.

### Approach
1. **Material UI (MUI)**: Implemented using modern MUI conventions. Replaced legacy top-level system props with the `sx={{...}}` prop for strict compatibility.
2. **State Management**: Uses a custom React hook `useNotifications` to fetch and parse external notifications. Read states are persisted to track user interactions.
3. **Priority Integration**: Integrates the sorting algorithm from Stage 1 into the `priority.tsx` route to dynamically render the top 10 most critical alerts.

## Stage 3

### Telemetry & Logging Middleware
A reusable local dependency (`logging_middleware`) to intercept, format, and dispatch operational metrics and errors to an external telemetry dashboard.

### Approach
1. **Centralized Logging**: Provides a singular `Log()` function that requires a `stack`, `level`, and `package`.
2. **JWT Authentication**: Secured via an active JSON Web Token (`LOG_TOKEN`). The middleware elegantly handles environments, falling back to `NEXT_PUBLIC_LOG_TOKEN` so that Next.js client-side bundles can transparently inject the credentials.
3. **Module Resolution Strategy**: Structured as a local npm package with compiled TypeScript `dist/index.js` outputs to seamlessly integrate with Next.js Turbopack without `transpilePackages` overhead or module resolution failures.