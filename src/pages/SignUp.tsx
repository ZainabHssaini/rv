import { useForm } from 'react-hook-form';
import { ArrowRight, User, ArrowLeft } from 'lucide-react'; // Import ArrowLeft
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast"; // Import the useToast hook
import { useState } from 'react';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user, setUser] = useState(null); 
  const navigate = useNavigate(); // Hook for navigation
  const { toast } = useToast(); // Initialize the toast function

  const onSubmit = async (data) => {
    data.id = 0;
    let fullname: string[] = data.fullName.split(' ');
    data.firstname = fullname[0];
    data.lastname = fullname.slice(1).join(' ');
    console.log('Data submitted:', data);
    try {
      const response = await fetch('http://localhost:8082/patients/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast({
          title: "Email deja existant",
          description: "Try again...",
        });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('User created:', responseData);

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(responseData));

      // Redirect to the home page
      navigate('/');
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <div className="min-h-screen bg-reviva-beige/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
        {/* Bouton de retour en haut à gauche */}
        <Link
          to="/"
          className="absolute top-4 left-4 text-reviva-charcoal hover:text-reviva-teal transition-colors"
        >
          <ArrowLeft size={24} /> {/* Icône de retour */}
        </Link>

        {/* Décors d'arrière-plan */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-reviva-teal/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-reviva-mint/15 rounded-full blur-2xl"></div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-reviva-charcoal mb-2">Create Account</h1>
          <p className="text-reviva-charcoal/70">Sign up to get started with your new account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-reviva-charcoal mb-2">
              Full name
            </label>
            <input
              {...register('fullName', { required: 'Full name is required' })}
              type="text"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.fullName ? 'border-red-500' : 'border-gray-200'
              } focus:border-reviva-teal focus:ring-2 focus:ring-reviva-teal/30`}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-reviva-charcoal mb-2">
              Email address
            </label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              type="email"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              } focus:border-reviva-teal focus:ring-2 focus:ring-reviva-teal/30`}
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-reviva-charcoal mb-2">
              Password
            </label>
            <input
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              type="password"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              } focus:border-reviva-teal focus:ring-2 focus:ring-reviva-teal/30`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-reviva-teal text-white py-3 px-6 rounded-lg font-semibold
                     hover:bg-reviva-deep-teal transition-colors duration-200
                     flex items-center justify-center gap-2"
          >
            <User size={18} />
            Create Account
          </button>

          <p className="text-center text-sm text-reviva-charcoal/70 mt-4">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="text-reviva-teal font-medium hover:text-reviva-deep-teal"
            >
              Sign in
            </Link>
          </p>
        </form>

        <div className="mt-6 text-center text-sm text-reviva-charcoal/60">
          By signing up, you agree to our{' '}
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

export default SignUp;