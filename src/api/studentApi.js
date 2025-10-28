// src/api/studentApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./apiUrl.js";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: ({ page = 1, limit = 6 } = {}) => `/?page=${page}&limit=${limit}`,
      providesTags: ["Student"],
    }),
    getStudentById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Student"],
    }),
    addStudent: builder.mutation({
      query: (student) => ({
        url: "/",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Student"],
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...student }) => ({
        url: `/${id}`,
        method: "PUT",
        body: student,
      }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
