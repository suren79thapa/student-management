import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { subjects } from "../data/subject";

const studentSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  course: Yup.string()
    .oneOf(subjects, "Select a valid subject")
    .required("Course is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .positive("Age must be positive")
    .integer("Age must be an integer")
    .required("Age is required"),
});

export default function StudentForm({ initialValues, onSubmit, onCancel }) {
  return (
    <div className="p-5 bg-white rounded-lg shadow max-w-md w-full">
      <h2 className="text-xl font-bold mb-5">
        {initialValues ? "Edit Student" : "Add Student"}
      </h2>

      <Formik
        initialValues={{
          name: initialValues?.name || "",
          email: initialValues?.email || "",
          course: initialValues?.course || "",
          age: initialValues?.age || "",
        }}
        validationSchema={studentSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          toast.success(initialValues ? "Student Updated!" : "Student Added!");
          resetForm();
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          touched,
          errors,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Course</label>
              <select
                name="course"
                value={values.course}
                onChange={(e) => setFieldValue("course", e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a course</option>
                {subjects.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
              {touched.course && errors.course && (
                <p className="text-red-500 text-sm">{errors.course}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={values.age}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {touched.age && errors.age && (
                <p className="text-red-500 text-sm">{errors.age}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {initialValues ? "Update" : "Add"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
