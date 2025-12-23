import api from './api';

const COURSES_API = '/courses';

const createFormData = (data, isUpdate) => {
    const formData = new FormData();
    const mainTeacherName = data.teacher_name || '';

    formData.append('title', data.title);
    formData.append('description', data.description || '');
    formData.append('level', data.level || '');
    formData.append('teacher_name', mainTeacherName);

    const processedSchedules = (data.schedules || []).map(schedule => {
        let classDayValue = '';
        if (schedule.class_day_from && schedule.class_day_to) {
            classDayValue = `${schedule.class_day_from} to ${schedule.class_day_to}`;
        } else if (schedule.class_day_from) {
            classDayValue = schedule.class_day_from;
        } else if (schedule.class_day) {
            classDayValue = schedule.class_day;
        }

        const scheduleTeacherName = schedule.teacher_name || mainTeacherName;

        return {
            class_day: classDayValue,
            start_time: schedule.start_time,
            end_time: schedule.end_time,
            schedule_id: schedule.schedule_id,
            teacher_name: scheduleTeacherName
        };
    });

    formData.append('schedules', JSON.stringify(processedSchedules));

    if (data.course_image_file) {
        formData.append('image', data.course_image_file);
    } else if (isUpdate && data.existing_image_url === '') {
        formData.append('clear_image', 'true');
    }

    return formData;
};

export const getAllCourses = async () => {
    const response = await api.get(COURSES_API, { withCredentials: true });
    return response.data;
};

export const createCourse = async (data) => {
    const formData = createFormData(data, false);
    const response = await api.post(COURSES_API, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
    });
    return response.data;
};

export const updateCourse = async (id, data) => {
    const formData = createFormData(data, true);
    const response = await api.put(`${COURSES_API}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
    });
    return response.data;
};

export const deleteCourse = async (id) => {
    const response = await api.delete(`${COURSES_API}/${id}`, { withCredentials: true });
    return response.data;
};