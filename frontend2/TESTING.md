# Testing Guide - Login Function

## 📁 Project Structure

```
frontend/
├── jest.config.js          # Jest configuration
├── jest.setup.js           # Test setup (mocks, globals)
├── src/
│   ├── services/
│   │   ├── auth.ts
│   │   └── __tests__/
│   │       └── auth.test.ts      # ✅ Created
│   │
│   └── stores/
│       ├── authStore.tsx
│       └── __tests__/
│           └── authStore.test.ts  # ✅ Created
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install -D \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jest \
  jest-environment-jsdom \
  @types/jest \
  axios-mock-adapter
```

### 2. Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

---

## 📝 Test Files Explained

### Test 1: `auth.test.ts` - Service Layer Tests

**What it tests:**
- ✅ Successful login with valid credentials
- ✅ Failed login with invalid credentials
- ✅ Network errors
- ✅ Server errors (500)
- ✅ Logout endpoint
- ✅ Get current user

**Key concepts:**
- Uses `axios-mock-adapter` to mock API calls
- Tests the raw service layer (no state management)
- Focuses on HTTP request/response

**Example test:**
```typescript
it('should login successfully with valid credentials', async () => {
  // Arrange - Setup mock data
  const credentials = { username: 'test', password: '123' };
  const mockResponse = { user: {...}, token: 'abc' };
  mock.onPost('/api/auth/login/').reply(200, mockResponse);

  // Act - Call the function
  const result = await authService.login(credentials);

  // Assert - Verify results
  expect(result).toEqual(mockResponse);
});
```

---

### Test 2: `authStore.test.ts` - Store Layer Tests

**What it tests:**
- ✅ Initial state is correct
- ✅ Loading state during login
- ✅ State updates on successful login
- ✅ Error handling
- ✅ Logout clears state
- ✅ Clear error function

**Key concepts:**
- Uses `@testing-library/react` to test Zustand hooks
- Mocks `authService` (already tested separately)
- Focuses on state management logic

**Example test:**
```typescript
it('should update state on successful login', async () => {
  // Arrange
  const { result } = renderHook(() => useAuthStore());
  mockAuthService.login.mockResolvedValue({
    user: { id: '1', username: 'test', email: 'test@test.com' },
    token: 'token'
  });

  // Act
  await act(async () => {
    await result.current.login({ username: 'test', password: '123' });
  });

  // Assert
  expect(result.current.user).toBeDefined();
  expect(result.current.isAuthenticated).toBe(true);
});
```

---

## 🎯 Testing Strategy

### Layer-by-Layer Testing

```
1. Service Layer (auth.test.ts)
   ├─ Test HTTP calls
   ├─ Mock axios responses
   └─ Verify data transformation

2. Store Layer (authStore.test.ts)
   ├─ Test state management
   ├─ Mock service calls
   └─ Verify state updates

3. Component Layer (LoginForm.test.tsx)
   ├─ Test user interactions
   ├─ Mock store hooks
   └─ Verify UI updates
```

---

## 🧪 Common Testing Patterns

### Pattern 1: Arrange-Act-Assert (AAA)

```typescript
it('should do something', async () => {
  // Arrange - Setup test data and mocks
  const input = { /* test data */ };
  mock.onPost('/endpoint').reply(200, { /* response */ });

  // Act - Execute the function
  const result = await functionUnderTest(input);

  // Assert - Verify expectations
  expect(result).toBe(expected);
});
```

### Pattern 2: Testing Async Functions

```typescript
it('should handle async operations', async () => {
  // Use async/await
  await act(async () => {
    await result.current.asyncFunction();
  });

  // Or use promises
  await expect(asyncFunction()).resolves.toBe(value);
  await expect(asyncFunction()).rejects.toThrow();
});
```

### Pattern 3: Testing State Changes

```typescript
it('should update state', () => {
  const { result } = renderHook(() => useStore());

  // Before
  expect(result.current.value).toBe(initialValue);

  // Act
  act(() => {
    result.current.setValue(newValue);
  });

  // After
  expect(result.current.value).toBe(newValue);
});
```

---

## 🐛 Debugging Tests

### Show console logs during tests:
```bash
npm test -- --verbose
```

### Run specific test file:
```bash
npm test auth.test.ts
```

### Run specific test case:
```bash
npm test -- -t "should login successfully"
```

### Debug with breakpoints:
```typescript
it('should test something', () => {
  debugger; // Add breakpoint
  // ... test code
});
```

Then run:
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

---

## 📊 Coverage Reports

After running `npm run test:coverage`, you'll see:

```
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   85.23 |    78.54 |   91.23 |   85.45 |
 services/auth.ts   |   100   |    100   |   100   |   100   |
 stores/authStore   |   95.23 |    87.5  |   100   |   95.67 |
--------------------|---------|----------|---------|---------|
```

**Coverage goals:**
- ✅ Statements: > 80%
- ✅ Branches: > 75%
- ✅ Functions: > 80%
- ✅ Lines: > 80%

---

## 🎓 Best Practices

### ✅ DO:
- Write tests for critical business logic (login, checkout, etc.)
- Mock external dependencies (API calls, services)
- Test error cases, not just happy paths
- Keep tests focused (one concept per test)
- Use descriptive test names

### ❌ DON'T:
- Test implementation details
- Make tests depend on each other
- Use real API calls in tests
- Test third-party libraries
- Write tests for trivial getters/setters

---

## 🔧 Troubleshooting

### "Cannot find module '@/...'"
**Solution:** Check `jest.config.js` has correct `moduleNameMapper`:
```javascript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1',
}
```

### "localStorage is not defined"
**Solution:** Add to `jest.setup.js`:
```javascript
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
```

### "window is not defined"
**Solution:** Ensure `testEnvironment: 'jsdom'` in `jest.config.js`

### Tests pass but coverage is 0%
**Solution:** Add to `jest.config.js`:
```javascript
collectCoverageFrom: [
  'src/**/*.{js,jsx,ts,tsx}',
  '!src/**/*.d.ts',
]
```

---

## 📚 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Zustand Testing Guide](https://docs.pmnd.rs/zustand/guides/testing)

---

## ✅ Next Steps

1. ✅ **Service tests created** - `auth.test.ts`
2. ✅ **Store tests created** - `authStore.test.ts`
3. ⏭️ **Create component tests** - `LoginForm.test.tsx`
4. ⏭️ **Add integration tests** - Full login flow
5. ⏭️ **Setup CI/CD** - Run tests automatically

Run `npm test` to see your tests in action! 🚀
