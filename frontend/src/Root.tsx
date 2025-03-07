import { useEffect } from "react";
import { useAuthStore } from "./store/auth";
import App from "./App";
import { LuLoader } from "react-icons/lu";

const Root = () => {
    const { checkAuth, loading } = useAuthStore();

    // Check if user is authenticated on app load or when checkAuth is called.
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                <LuLoader className="animate-spin" size={70} />
            </div>
        )
    }

  return (
    <App />
  )
}

export default Root