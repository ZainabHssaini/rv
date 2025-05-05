import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, User, ArrowLeft } from 'lucide-react'; // Import ArrowLeft
import { useToast } from "@/hooks/use-toast"; // Import the useToast hook
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase"; // adapte le chemin si besoin

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); // Hook for navigation
  const { toast } = useToast(); // Initialize the toast function

  const onSubmit = async (data: any) => {
    try {
      // 1. Authentifier l'utilisateur via Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
  
      // 2. Récupérer les données utilisateur dans Firestore
      const docRef = doc(db, "patients", user.uid);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        throw new Error("User data not found in Firestore.");
      }
  
      const userData = docSnap.data();
  
      // 3. Stocker les données utilisateur localement
      localStorage.setItem("user", JSON.stringify(userData));
  
      // 4. Rediriger vers la page d'accueil
      navigate("/");
  
      // 5. Optionnel : message de succès
      toast({
        title: "Welcome back!",
        description: `Hello ${userData.firstname}`,
      });
  
    } catch (error: any) {
      console.error("Error during sign-in:", error);
      let message = error.message.toString().split("(")[1].split(")")[0]; // Extract error message
      console.error("Error during sign-up:", message); // Log the error message
      if(message == "auth/invalid-credential") { // Check if email is already in use
        toast({
          title: "Username or password incorrect",
          description: "Please check your credentials and try again.",
        });
      }
      else {   // Show error toast
      toast({
        title: "Error",
        description:"Something went wrong. Please try again.",
      });
    }
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