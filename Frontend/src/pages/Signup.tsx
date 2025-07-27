import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bug, Eye, EyeOff, UserPlus, Lock, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/lib/hooks/UseAuth";
import { useTheme } from "@/components/theme-provider";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const { theme } = useTheme();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await registerUser(formData.name, formData.email, formData.password);
      toast.success("Registered Successfully!", {
        description: "Your account has been created successfully.",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-center p-4 lg:px-40">
      {theme === "dark" && (
        <div className="fixed inset-0 bg-[url('/bgimage3.jpg')] bg-cover bg-center bg-no-repeat opacity-20 z-0 pointer-events-none" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-gradienthero1 to-gradienthero2 mix-blend-multiply z-0" />

      <div className="w-full md:w-1/2 mb-8 md:mb-0 px-4 text-center md:text-left relative z-10">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex flex-col items-center space-y-5">
            <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-gradient-to-r from-gradient1 to-gradient2">
              <Bug className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gradient1 to-gradient2 bg-clip-text text-transparent">
              IssueTracker
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md md:text-lg text-sm">
            Welcome to IssueTracker — your one-stop platform for managing tasks,
            tracking progress, and staying productive. Sign in to get started!
          </p>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full md:w-1/2 relative z-10 max-w-md">
        <Card className="bg-gradientcard1 backdrop-blur shadow-glass border border-gradient1/50">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-gradient1 to-gradient2">
              <UserPlus className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gradient1 to-gradient2 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "email", "password", "confirmPassword"].map((field) => (
                <div key={field} className="space-y-2">
                  <Label
                    htmlFor={field}
                    className="text-sm font-medium capitalize"
                  >
                    {field === "confirmPassword" ? "Confirm Password" : field}
                  </Label>
                  <div className="relative">
                    {field === "email" && (
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    )}
                    {field === "name" && (
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    )}
                    {(field === "password" || field === "confirmPassword") && (
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    )}
                    <Input
                      id={field}
                      type={
                        field.includes("password")
                          ? field === "password"
                            ? showPassword
                              ? "text"
                              : "password"
                            : showConfirmPassword
                            ? "text"
                            : "password"
                          : field === "email"
                          ? "email"
                          : "text"
                      }
                      placeholder={
                        field === "email"
                          ? "enter@example.com"
                          : field.includes("password")
                          ? field === "password"
                            ? "Create a password"
                            : "Confirm your password"
                          : "Enter your full name"
                      }
                      value={formData[field as keyof typeof formData]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="pl-10 pr-10 bg-input/50 border-border/50 focus:border-primary/50 transition-all duration-200"
                      disabled={isLoading}
                    />
                    {(field === "password" || field === "confirmPassword") && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() =>
                          field === "password"
                            ? setShowPassword(!showPassword)
                            : setShowConfirmPassword(!showConfirmPassword)
                        }
                        disabled={isLoading}
                      >
                        {(
                          field === "password"
                            ? showPassword
                            : showConfirmPassword
                        ) ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    )}
                  </div>
                  {errors[field] && (
                    <p className="text-xs text-destructive">{errors[field]}</p>
                  )}
                </div>
              ))}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-gradient1 to-gradient2 hover:opacity-90 transition-all duration-200 text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-gradient1 hover:underline font-medium transition-colors duration-200"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
