/* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   BaseQueryApi,
//   BaseQueryFn,
//   createApi,
//   DefinitionType,
//   FetchArgs,
//   fetchBaseQuery,
// } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";
// import { logOut, setUser } from "../features/Auth/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:3000/api",
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState)?.auth?.token;

//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });
// // create refresh token
// const baseQueryWithRefreshToken: BaseQueryFn<
//   FetchArgs,
//   BaseQueryApi,
//   DefinitionType
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// > = async (args, api, extraOptions): Promise<any> => {
//   let result = await baseQuery(args, api, extraOptions);

//   // if (result?.error?.status === 401) {
//   //   // toast.error(result.error.data.message, { position: "top-center" });
//   //   console.log("sending refresh token");
//   // }

//   if (result?.error?.status === 401) {
//     //* Send refresh token
//     const res = await fetch("http://localhost:3000/api/auth/refresh-token", {
//       method: "POST",
//       credentials: "include",
//     });
//     const data = await res.json();
//     if (data?.data?.accessToken) {
//       const user = (api.getState() as RootState).auth.user;
//       api.dispatch(
//         setUser({
//           user,
//           token: data.data.accessToken,
//         })
//       );
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }
//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: baseQueryWithRefreshToken,
//   tagTypes: ["user", "booking", "car"],
//   endpoints: () => ({}),
// });

import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/Auth/authSlice";

// Base query configuration with the API base URL
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api", // Ensure this is your correct base URL
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token; // Access the token from state

    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Set the Authorization header
    }
    return headers;
  },
});

// Create a custom base query with refresh token logic
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Attempt to refresh the token
    const res = await fetch("http://localhost:3000/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const user = (api.getState() as RootState).auth.user;
    const data = await res.json(); // Parse the JSON response
    if (data?.data?.accessToken && user !== null) {
      // Get the current user
      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken, // Update the token in the state
        })
      );
      result = await baseQuery(args, api, extraOptions); // Retry the original request
    } else {
      api.dispatch(logOut()); // Log out if no access token is received
    }
  }

  return result;
};

// Create the base API instance with tag types
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["user", "booking", "car"], // Define your tag types
  endpoints: () => ({}),
});
