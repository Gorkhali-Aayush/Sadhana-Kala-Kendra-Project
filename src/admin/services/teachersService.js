import api from './api';

const TEACHERS_API = '/teachers'; 

const createFormData = (data, isUpdate) => {
    const formData = new FormData();
    
    formData.append('full_name', data.full_name);
    formData.append('specialization', data.specialization || '');

    // Handle Image Upload/Deletion Logic
    if (data.profile_image_file) {
        // Case 1: New file selected
        formData.append('profile_image', data.profile_image_file);
    } else if (isUpdate && data.existing_profile_image === '') {
        // Case 2: Explicitly clearing the image on update
        formData.append('clear_image', 'true');
    }
    
    return formData;
};

// --- CRUD Operations ---

// GET all teachers (Protected: needs session cookie)
export const getAllTeachers = async () => {
    // FIX: Added { withCredentials: true }
    const response = await api.get(TEACHERS_API, { withCredentials: true }); 
    return response.data;
};

// CREATE a new teacher (Protected: needs session cookie)
export const createTeacher = async (data) => {
    const formData = createFormData(data, false);
    const response = await api.post(TEACHERS_API, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        // FIX: Added withCredentials: true
        withCredentials: true,
    });
    return response.data;
};

// UPDATE an existing teacher (Protected: needs session cookie)
export const updateTeacher = async (id, data) => {
    const formData = createFormData(data, true);
    const response = await api.put(`${TEACHERS_API}/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        // FIX: Added withCredentials: true
        withCredentials: true,
    });
    return response.data;
};

// DELETE a teacher (Protected: needs session cookie)
export const deleteTeacher = async (id) => {
    // FIX: Added { withCredentials: true }
    const response = await api.delete(`${TEACHERS_API}/${id}`, { withCredentials: true }); 
    return response.data;
};