import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import {
  Account,
  Avatars,
  Client,
  OAuthProvider,
  Query,
  TablesDB,
} from "react-native-appwrite";

export const config = {
  platform: "com.parshsee.realestateapp", // Unique identifier for the app, used by Appwrite to identify the platform
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesTableId: process.env.EXPO_PUBLIC_APPWRITE_TABLE_GALLERIES,
  reviewsTableId: process.env.EXPO_PUBLIC_APPWRITE_TABLE_REVIEWS,
  agentsTableId: process.env.EXPO_PUBLIC_APPWRITE_TABLE_AGENTS,
  propertiesTableId: process.env.EXPO_PUBLIC_APPWRITE_TABLE_PROPERTIES,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

// Generate image avatar based on the user's first and last name with Appwrite
export const avatar = new Avatars(client);
// Allow us to create new user accounts with Appwrite
export const account = new Account(client);
// Allow us to use the Databases from Appwrite
export const databases = new TablesDB(client);

export async function login() {
  try {
    // Generate redirect URI to handle OAuth response
    const redirectUri = Linking.createURL("/");
    // Request an OAuth token from Appwrite for Google authentication
    const response = await account.createOAuth2Token({
      provider: OAuthProvider.Google,
      success: redirectUri,
    });

    if (!response) {
      throw new Error("Failed to log in");
    }

    // If we successfully created OAuth token, open web browser session for OAuth process to continue
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri,
    );

    if (browserResult.type !== "success") {
      throw new Error("Authentication failed");
    }

    // Parse newly returned url to extract the query parameters containing the OAuth token
    const url = new URL(browserResult.url);
    // Extract secret and userID
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) {
      throw new Error("Failed to login: Missing secret or userId");
    }

    // Create a new account session
    const session = await account.createSession({ userId, secret });

    if (!session) {
      throw new Error("Failed to create session");
    }

    return true;
  } catch (error) {
    console.error("Error logging in:", error);
    return false;
  }
}

export async function logout() {
  try {
    // Delete the current session to log the user out
    await account.deleteSession({ sessionId: "current" });
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    // Fetch the currently logged in user's details
    const response = await account.get();

    if (response.$id) {
      // Form a new user avatar (generate an image containing that users initials)
      const userAvatar = avatar.getInitials({
        name: response.name,
      });

      // Return the user details along with the generated avatar url
      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }

    // Fixed error where it could return undefined if response.$id is falsy
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// This will get the "Featured" properties for the featured section
export async function getLatestProperties() {
  try {
    // Get a list of properties ordered by their $createdAt timestamp, limit the list to max of 5
    const result = await databases.listRows({
      databaseId: config.databaseId!,
      tableId: config.propertiesTableId!,
      queries: [Query.orderAsc("$createdAt"), Query.limit(5)],
    });

    return result.rows;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Allows for querying, filtering, and more. Used for search
// Accepts 3 params: filter, query, limit (? = optional). Params are of type: string, string, number
export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")]; // Create the initial query with one default query

    // Append additional things to the query

    // If filter exists and is not All, add another query checking where property type equals filter
    if (filter && filter !== "All") {
      buildQuery.push(Query.equal("type", filter));
    }

    // If a search query exists, add another query checking where property name OR property address OR property type equals query
    if (query) {
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ]),
      );
    }

    // If a limit exits, add another query limiting the number of results equal to the limit
    if (limit) {
      buildQuery.push(Query.limit(limit));
    }

    // Get a list of properties filtered by the buildQuery we constructed above
    const result = await databases.listRows({
      databaseId: config.databaseId!,
      tableId: config.propertiesTableId!,
      queries: buildQuery,
    });

    return result.rows;
  } catch (error) {
    console.error(error);
    return [];
  }
}
