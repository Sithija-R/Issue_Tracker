import { useAuthStore } from "@/store/Authstore";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { toast } from "sonner";

export const useAuth = () => {
  const auth = useAuthStore();

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/user/register`, {
        name,
        email,
        password,
      });
      const { token, user } = res.data;
      auth.login(user, token);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Registration failed";

      console.error("Registration error:", errorMessage);

      toast.error("Registration failed", {
        description: errorMessage,
      });
      throw err.response?.data?.error || "Registration failed";
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/user/login`, {
        email,
        password,
      });
      const { token, user } = res.data;
      auth.login( user, token);
    } catch (err: any) {
      const errorMessage =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      "Registration failed";

    console.error("Registration error:", errorMessage);

    toast.error("Registration failed", {
      description: errorMessage,
    });
      throw err.response?.data?.error || "Login failed";
    }
  };

  return {
    registerUser,
    loginUser,
  };
};
