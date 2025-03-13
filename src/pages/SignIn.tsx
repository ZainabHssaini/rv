import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, User, ArrowLeft } from 'lucide-react'; // Import ArrowLeft
import { useToast } from "@/hooks/use-toast"; // Import the useToast hook

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); // Hook for navigation
  const { toast } = useToast(); // Initialize the toast function

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8082/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send form data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json(); // Receive the response from the backend
      console.log('Authentication successful:', result);

      if (result.id != null) { // Assuming the backend returns { success: true, user: { firstname, lastname } }
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(result));

        // Redirect to the home page
        navigate('/');
      } else {
        // Trigger toast notification for incorrect credentials
        toast({
          title: "Email or Password incorrect",
          description: "Try again...",
        });
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      toast({
        title: "Email or Password incorrect",
        description: "Try again...",
      });
    }
  };

  return (
    <div className="min-h-screen bg-reviva-beige/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 relative">
        {/* Bouton de retour en haut à gauche */}
        <Link
          to="/"
          className="absolute top-4 left-4 text-reviva-charcoal hover:text-reviva-teal transition-colors"
        >
          <ArrowLeft size={24} /> {/* Icône de retour */}
        </Link>

        {/* Décors d'arrière-plan */}
        {/* Background decoration */}
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-reviva-mint/30 rounded-full blur-xl animate-pulse-gentle"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-reviva-teal/20 rounded-full blur-xl animate-pulse-gentle"></div>

        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-reviva-purple">Welcome Back</h1>
          <p className="text-reviva-charcoal/80">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-reviva-charcoal mb-2">
              Email address
            </label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:border-reviva-teal focus:ring-2 focus:ring-reviva-teal/30`}
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-reviva-charcoal">Password</label>
              <button
                type="button"
                onClick={() => alert('Forgot password feature coming soon!')}
                className="text-sm text-reviva-teal hover:text-reviva-deep-teal font-medium"
              >
                Forgot password?
              </button>
            </div>
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:border-reviva-teal focus:ring-2 focus:ring-reviva-teal/30`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-reviva-teal text-white py-3 px-6 rounded-lg font-medium
                     hover:bg-reviva-deep-teal transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-reviva-teal focus:ring-offset-2"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-reviva-charcoal/80">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-reviva-teal font-medium hover:text-reviva-deep-teal"
            >
              Sign up
            </Link>
          </p>
        </form>

        <div className="mt-8 text-center text-sm text-reviva-charcoal/60">
          By signing in, you agree to our{' '}
          <a href="#" className="underline hover:text-reviva-teal">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-reviva-teal">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;