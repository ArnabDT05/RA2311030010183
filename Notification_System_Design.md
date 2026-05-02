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