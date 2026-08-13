import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseAPISlice = createApi({
  reducerPath: "courseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URI,
    credentials: "include",
  }),
  tagTypes: ["Ratings", "Students"],
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (formData) => ({
        url: "/admin/courses",
        method: "POST",
        body: formData,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/admin/courses/${id}`,
        method: "DELETE",
      }),
    }),
    getCourse: builder.mutation({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/enrollment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Students"],
    }),
    getTotalStudents: builder.mutation({
      query: () => ({
        url: "/enrollment/total-students",
        method: "GET",
      }),
    }),
    getEnrollmentStatus: builder.query({
      query: (courseID) => ({
        url: `/enrollment/status/${courseID}`,
        method: "GET",
      }),
      providesTags: ["Students"],
    }),
    addRating: builder.mutation({
      query: (data) => ({
        url: "/rating",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Ratings", "Students"],
    }),
    getAllRatings: builder.query({
      query: (courseID) => `/rating/${courseID}`,
      providesTags: ["Ratings"],
    }),
    getSingleStudent: builder.query({
      query: ({ id }) => ({
        url: `/enrollment/total/${id}`,
        method: "GET",
      }),
      providesTags: ["Students"],
    }),
  }),
});

export const {
  useGetSingleStudentQuery,
  useAddCourseMutation,
  useDeleteCourseMutation,
  useGetCourseMutation,
  useAddStudentMutation,
  useGetTotalStudentsMutation,
  useGetEnrollmentStatusQuery,
  useAddRatingMutation,
  useGetAllRatingsQuery,
} = courseAPISlice;
