import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Eye, EyeOff, LogIn, Lock, Mail, Bug } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/hooks/UseAuth";
import { useTheme } from "@/components/theme-provider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const { theme } = useTheme();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await loginUser(email, password);
      toast.success("Welcome back!", {
        description: "You have been successfully logged in.",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-center p-4 lg:px-40">
      {theme === "dark" && (
        <div className="fixed inset-0 bg-[url('/bgimage3.jpg')] bg-cover bg-center bg-no-repeat opacity-20 z-0 pointer-events-none" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-gradienthero1 to-gradienthero2 mix-blend-multiply z-0" />

      <div className="w-full md:w-1/2 mb-8 md:mb-0 px-4 text-center md:text-left relative z-10">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex  flex-col items-center space-y-5 ">
            <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-gradient-to-r from-gradient1 to-gradient2 ">
              <Bug className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gradient1 to-gradient2 bg-clip-text text-transparent">
              IssueTracker
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md text-lg ">
            Welcome to IssueTracker — your one-stop platform for managing tasks,
            tracking progress, and staying productive. Sign in to get started!
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 max-w-md">
        <Card className="bg-gradientcard1 backdrop-blur border border-gradient1/50 shadow-glass relative z-10">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-gradient1 to-gradient2">
              <LogIn className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gradient1 to-gradient2 bg-clip-text text-transparent">
              Sign In
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="enter@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-input/50 border-border/50 focus:border-primary/50 transition-all duration-200"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-input/50 border-border/50 focus:border-primary/50 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-gradient1 to-gradient2 hover:opacity-90 transition-all duration-200 text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-gradient1 hover:underline font-medium transition-colors duration-200"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
