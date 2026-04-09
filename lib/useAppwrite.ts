import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

// Createa a custom hook for managing API calls with state and error handling
// Code provided by JavaScript Mastery: https://www.youtube.com/watch?v=CzJQEstIiEI&list=LL&index=2 - Integrate Authentication

/* Notes
T, P are typescript that allow us to not immediately define the type of a property, rather assign it once we pass something into the function
*/

interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
}

interface UseAppwriteReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams?: P) => Promise<void>;
}

export const useAppwrite = <T, P extends Record<string, string | number>>({
  fn, // The async function to fetch data
  params = {} as P, // Accepts different parameters for different API calls, defaulting to an empty object
  skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  // Define state variables for data, loading, and error
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  // fetchData function
  const fetchData = useCallback(
    async (fetchParams: P) => {
      setLoading(true);
      setError(null);

      // Tries to fetch the corresponding data with the right parameters
      try {
        const result = await fn(fetchParams);
        // Sets it to the state
        setData(result);
      } catch (err: unknown) {
        // Sets the errors
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        // Sets the loading to false once the fetch is complete, regardless of success or failure
        setLoading(false);
      }
    },
    [fn],
  );

  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);

  const refetch = async (newParams?: P) => await fetchData(newParams ?? params);

  return { data, loading, error, refetch };
};
