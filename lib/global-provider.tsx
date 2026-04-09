import { createContext, ReactNode, useContext } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

// Define the shape of the user object
interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

// Define the shape of the global context, which includes the user's login status, user details, loading state, and a refetch function for updating the user data
interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>; // Callback function to refetch user data, accepting optional parameters for flexibility in different API calls
}

// Create a context with the type of GlobalContextType or undefined, initializing it with undefined
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create a global provider component that will wrap the app and provide the global context to all child components
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Use the custom useAppwrite hook to fetch the current user's data and manage loading and error states
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  // Use double !! to turn truthy/falsy values (like null or undefined objects) into a boolean
  const isLoggedIn = !!user; // Determine if the user is logged in based on the presence of user data
  // !null => true, !true => false,
  // !{name: "John"} => false, !!{name: "John"} => true

  console.log(JSON.stringify(user, null, 2));

  // Goal of this component isn't to render any data, but to wrap the screens with the GlobalContext provider and pass down the necessary values (isLoggedIn, user, loading, refetch) to the entire app.
  // This allows any component in the app to access these values without needing to pass them down through props.
  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};

export default GlobalProvider;
