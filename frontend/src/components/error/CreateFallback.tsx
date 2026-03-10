// components/error/ErrorBoundary.tsx

// Helper function to generate fallbacks
export function createFallback(type: 'auth' | 'chat' | 'profile') {
    const config = {
      auth: {
        title: 'Authentication Error',
        message: 'Please try logging in again',
        icon: '🔐',
      },
      chat: {
        title: 'Chat Error',
        message: 'Your messages are safe',
        icon: '💬',
      },
      profile: {
        title: 'Profile Error',
        message: 'Could not load profile',
        icon: '👤',
      },
    };
  
    const { title, message, icon } = config[type];
  
    return (
      <div className="error-fallback">
        <div className="text-6xl mb-4">{icon}</div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Reload
        </button>
      </div>
    );
  }