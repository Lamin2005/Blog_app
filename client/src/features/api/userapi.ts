import { apiSlice } from "./ApiSlice";

interface UserState {
  email: string;
  password: string;
}

interface RegisterCredentials extends UserState {
  name: string;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials: RegisterCredentials) => ({
        url: "/api/users/register",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),

    login: builder.mutation({
      query: (credentials: UserState) => ({
        url: "/api/users/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/api/users/logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    profile: builder.query({
      query: () => ({
        url: "/api/users/profile",
        method: "GET",
        credentials: "include",
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/api/users/profile",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useProfileQuery,
  useUpdateProfileMutation,
} = userApi;
