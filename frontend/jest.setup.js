// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock window.location
delete window.location
window.location = { 
  href: '', 
  reload: jest.fn(),
  replace: jest.fn(),
  assign: jest.fn(),
}

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
}

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
  localStorageMock.getItem.mockReturnValue(null)
})
