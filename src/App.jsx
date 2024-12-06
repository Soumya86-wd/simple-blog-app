import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";

import { Footer, Header } from "./components";
import { authService } from "./appwrite";
import { login, logout } from "./store";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        console.log("User Data: ", userData);

        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <div className="w-full block">
        <Footer />
      </div>
    </div>
  ) : (
    // display a loading spinner if currently in loading state
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default App;
