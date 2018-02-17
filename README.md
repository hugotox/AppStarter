### Next.js Example

#### TODO:

- [x] Load static css and render it server side
- [x] Animated page transitions
- [x] Redux integration
- [x] Async fetch data server & client side
- [x] Login endpoint
- [x] Logout endpoint
- [x] Verify token endpoint
- [x] LoginRequired higher order component
- [x] After verifying the token, save it to the redux store so next time we don't have to verify again.
- [x] Verify token based on user group
- [x] Show logged in username in navbar
- [x] User types
- [x] Remember me feature
- [x] Route masking feature
- [x] Django Rest example
- [x] Django graphql example (using apollo)
- [ ] Django graphql example (with authentication)
- [ ] Socket.io example
- [x] Unit tests setup
- [x] E2E tests setup
- [x] Make sure all components use propTypes
- [x] Move login logic to Django
- [ ] Client side form validation

UI Widgets
- [x] Responsive navbar
- [x] Modal window


#### Run with pm2:

```$ pm2 start npm -- start --name app-starter```

#### Run unit tests

```$ npm run test```

With coverage report

```$ npm run test -- --coverage```


#### Run E2E tests

```$ npm run nightwatch```

In headless mode:

```$ npm run nightwatch -- -e headless```
