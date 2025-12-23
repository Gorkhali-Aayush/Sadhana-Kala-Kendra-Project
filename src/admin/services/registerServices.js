import api from "./api";

const RegisterService = {
    // --- Student CRUD Operations (Protected - Admin access) ---
    getAllStudents: async () => {
        const response = await api.get("/register/students", { withCredentials: true });
        return response.data;
    },

    getStudentById: async (id) => {
        const response = await api.get(`/register/students/${id}`, { withCredentials: true });
        return response.data;
    },

    createStudent: async (studentData) => {
        const response = await api.post("/register/students", studentData, { withCredentials: true });
        return response.data;
    },

    updateStudent: async (id, studentData) => {
        const response = await api.put(`/register/students/${id}`, studentData, { withCredentials: true });
        return response.data;
    },

    deleteStudent: async (id) => {
        const response = await api.delete(`/register/students/${id}`, { withCredentials: true });
        return response.data;
    },

    // --- Public Registration (Unprotected - No explicit credentials needed) ---
    // UPDATED: Now expects data to include course_id
    createPublicRegistration: async (data) => {
        // data should include: { full_name, email, phone, address, age, occupation, photo, course_id }
        const response = await api.post("/register", data);
        return response.data;
    },

    // --- Admin Registration Management (Protected) ---
    getAllRegistrations: async () => {
        const response = await api.get(`/register/registration`, { withCredentials: true });
        return response.data;
    },

    getRegistrationById: async (id) => {
        const response = await api.get(`/register/registration/${id}`, { withCredentials: true });
        return response.data;
    },

    // UPDATED: Now accepts both student_id and course_id
    createRegistration: async (student_id, course_id) => {
        const response = await api.post("/register/registration", { student_id, course_id }, { withCredentials: true });
        return response.data;
    },

    // UPDATED: registrationData can now include course_id
    updateRegistration: async (id, registrationData) => {
        // registrationData can include: { student_id, course_id }
        const response = await api.put(`/register/registration/${id}`, registrationData, { withCredentials: true });
        return response.data;
    },

    updateRegistrationStatus: async (id, status) => {
        const response = await api.patch(`/register/registration/${id}/status`, { status }, { withCredentials: true });
        return response.data;
    },

    deleteRegistration: async (id) => {
        const response = await api.delete(`/register/registration/${id}`, { withCredentials: true });
        return response.data;
    },
};

export default RegisterService;