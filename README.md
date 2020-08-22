# Microservices Ticketing APP

### Authentication service

Authentication service implemented independent from other. All the related user information according his status stored in JWT as payload and encrypted in JWT Creation Algorithm so all other services has a logic that encrypt JWT

This implementation has minuses and pluses

- Auth service independent from other services that great for the Microservices architecture

* Not a real-time approach, granted JWT will pass authentication even if Administrator will change related to User status settings. As services haven't communicating with Auth service in real time, the will not get information in real time.

### Skaffold

Skaffold config included
