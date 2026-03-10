// function RegisterForm() {
//     // ✅ All form state is LOCAL (doesn't need to be shared)
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
    
//     // ✅ But registration action is GLOBAL
//     const register = useAuthStore(state => state.register);
    
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setIsSubmitting(true);
      
//       try {
//         await register({ username, email, password });  // Global action
//         // After success, user data is in authStore (global)
//         router.push('/chat');
//       } catch (err) {
//         setErrors(err.response.data);  // Local errors
//       } finally {
//         setIsSubmitting(false);
//       }
//     };
    
//     return (
//       <form onSubmit={handleSubmit}>
//         <input 
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         {errors.username && <span>{errors.username}</span>}
        
//         <input 
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
        
//         <input 
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
        
//         <button disabled={isSubmitting}>Register</button>
//       </form>
//     );
//   }