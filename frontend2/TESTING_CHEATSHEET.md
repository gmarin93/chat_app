# 🧪 Testing Cheat Sheet

## Installation Commands

```bash
# Install all test dependencies
npm install -D \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jest \
  jest-environment-jsdom \
  @types/jest \
  axios-mock-adapter
```

## Run Tests

```bash
npm test                  # Run all tests once
npm run test:watch        # Watch mode (re-run on changes)
npm run test:coverage     # Generate coverage report
npm test auth.test.ts     # Run specific file
npm test -- -t "login"    # Run tests matching "login"
```

## Common Test Patterns

### Test Structure
```typescript
describe('Feature', () => {
  beforeEach(() => {
    // Setup before each test
  });

  it('should do something', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Mocking API Calls
```typescript
import MockAdapter from 'axios-mock-adapter';
import apiClient from './api';

const mock = new MockAdapter(apiClient);

// Success
mock.onPost('/api/login/').reply(200, { data: {...} });

// Error
mock.onPost('/api/login/').reply(401, { message: 'Error' });

// Network error
mock.onPost('/api/login/').networkError();
```

### Testing Zustand Stores
```typescript
import { renderHook, act } from '@testing-library/react';
import { useStore } from './store';

const { result } = renderHook(() => useStore());

// Sync action
act(() => {
  result.current.increment();
});

// Async action
await act(async () => {
  await result.current.fetchData();
});

// Assert
expect(result.current.count).toBe(1);
```

### Testing React Components
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

test('submits form', async () => {
  render(<LoginForm />);
  
  // Find elements
  const input = screen.getByLabelText('Username');
  const button = screen.getByRole('button', { name: /login/i });
  
  // Interact
  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.click(button);
  
  // Assert
  await waitFor(() => {
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
```

## Assertions

```typescript
// Equality
expect(value).toBe(expected);           // Strict equality (===)
expect(value).toEqual(expected);        // Deep equality (objects/arrays)

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThanOrEqual(5);

// Strings
expect(string).toMatch(/pattern/);
expect(string).toContain('substring');

// Arrays
expect(array).toContain(item);
expect(array).toHaveLength(3);

// Objects
expect(object).toHaveProperty('key');
expect(object).toMatchObject({ key: value });

// Functions
expect(fn).toHaveBeenCalled();
expect(fn).toHaveBeenCalledTimes(2);
expect(fn).toHaveBeenCalledWith(arg1, arg2);

// Promises
await expect(promise).resolves.toBe(value);
await expect(promise).rejects.toThrow();

// DOM (with jest-dom)
expect(element).toBeInTheDocument();
expect(element).toHaveTextContent('text');
expect(element).toBeDisabled();
expect(input).toHaveValue('value');
```

## Mock Functions

```typescript
// Create mock
const mockFn = jest.fn();

// Mock implementation
mockFn.mockImplementation((x) => x * 2);

// Mock return value
mockFn.mockReturnValue(42);
mockFn.mockReturnValueOnce(1).mockReturnValueOnce(2);

// Mock resolved/rejected promise
mockFn.mockResolvedValue(data);
mockFn.mockRejectedValue(error);

// Check calls
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith(arg);
expect(mockFn).toHaveBeenCalledTimes(3);

// Get call arguments
mockFn.mock.calls[0][0]; // First argument of first call
```

## Coverage Goals

✅ **Statements:** > 80%  
✅ **Branches:** > 75%  
✅ **Functions:** > 80%  
✅ **Lines:** > 80%

## Quick Fixes

### "Cannot find module '@/...'"
```javascript
// jest.config.js
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1',
}
```

### "localStorage is not defined"
```javascript
// jest.setup.js
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
```

### "window is not defined"
```javascript
// jest.config.js
testEnvironment: 'jest-environment-jsdom',
```

## What to Test

✅ **Critical business logic** (login, checkout, payment)  
✅ **Complex calculations** (pricing, discounts)  
✅ **Error handling** (API failures, validation)  
✅ **Edge cases** (empty arrays, null values)  
✅ **User interactions** (clicks, form submissions)

❌ **Implementation details** (internal state)  
❌ **Third-party libraries** (already tested)  
❌ **Simple getters/setters**  
❌ **UI styling** (use visual regression tests)

## Test Naming

```typescript
// ❌ Bad
it('test1', () => {});

// ✅ Good - Describes behavior
it('should update user state on successful login', () => {});
it('should show error message when credentials are invalid', () => {});
it('should disable submit button while loading', () => {});
```

## Resources

- [Jest Docs](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Jest Cheat Sheet](https://github.com/sapegin/jest-cheat-sheet)
