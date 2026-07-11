import { Eye, Loader2 } from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useEffect, useState, type ChangeEvent } from "react";
import { loginUser, verifySession } from "../app/features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

const Login = () => {
  // local states
  const [loginForm, setLoginForm] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({});
  //
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading , user , isInitialized} = useAuth()
  const toast = useToast()


      useEffect(() => {
        dispatch(verifySession());
      }, [dispatch]);


      useEffect(() => {
        if (user && isInitialized) {
           navigate('/')
        }
  }, [user, navigate]);

  // -------- handlers --------- //
  // handle change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [id]: value }));
  };

  // validate errors
  const validateForm = () => {
    const newErrors: any = {};
    // Email Validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginForm.email))
      newErrors.email = "Please enter a valid email address";

    // Password Validation
    if (loginForm.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    // Returns true if the errors object is empty
    return Object.keys(newErrors).length === 0;
  };

  // handleLogin
  const handleLogin = async () => {
    if (validateForm()) {
      try {
        await dispatch(loginUser(loginForm)).unwrap();
        toast.success("Login successfull");
        navigate("/");
      } catch (err : any) {
        console.log(err);
        toast.error(err || "Unknow error check console for more");
      }
    }
  };
  return (
    <section className="flex justify-center items-center bg-gray-200/30 min-h-screen p-4">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-xl py-4 px-6 border border-gray-300 space-y-4">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-center">Welcome Back</h3>
          <p className="text-gray-600 text-center">
            login to access admin dashboard
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="email" className="block font-semibold">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="exemple@ourouimed.dev"
              onChange={handleChange}
              value={loginForm.email}
            />
            {errors.email && <p className="text-red-500 text-[10px]">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block font-semibold">
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="**********"
              postIcon={Eye}
              onChange={handleChange}
              value={loginForm.password}
            />
            {errors.password && <p className="text-red-500 text-[10px]">{errors.password}</p>}
          </div>

          <Button fullWidth onClick={handleLogin} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin"/> : "Login"}
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Login;
