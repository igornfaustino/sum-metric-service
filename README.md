# sum-metric-service

Add values to a metric and list the most recent values (last hour)

## ROUTES
POST: add a new value to a metric (string key)

```
url: /metric/:key

body: { value: 10 }
```

GET: get total of the most recent values

```
url: /metric/:key
```
