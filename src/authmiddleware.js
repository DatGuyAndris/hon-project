import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const checkAuth = (WrappedComponent) => {
  const RequireAuth = (props) => {
    const router = useRouter();

    const isLoggedIn = useState();
    useEffect(() => {
      // Check if user is logged in

      if (!isLoggedIn) {
        router.push("/login"); // Redirect to login page if not logged in
      }
    }, []);

    // If user is logged in, render the wrapped component
    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };

  return RequireAuth;
};

export default checkAuth;
