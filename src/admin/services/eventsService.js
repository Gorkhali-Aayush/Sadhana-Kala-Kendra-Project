import api from './api';

const EVENTS_API = '/events';

export const getAllEvents = async (category = null) => {
    const url = category ? `${EVENTS_API}?category=${category}` : EVENTS_API;
    const response = await api.get(url, { withCredentials: true });
    return response.data;
};

export const getUpcomingEvents = async () => {
    const response = await api.get(`${EVENTS_API}?category=upcoming`, { withCredentials: true });
    return response.data;
};

export const getPastEvents = async () => {
    const response = await api.get(`${EVENTS_API}?category=past`, { withCredentials: true });
    return response.data;
};

export const createEvent = async (data) => {
    const response = await api.post(EVENTS_API, data, { withCredentials: true });
    return response.data;
};

export const updateEvent = async (id, data) => {
    const response = await api.put(`${EVENTS_API}/${id}`, data, { withCredentials: true });
    return response.data;
};

export const deleteEvent = async (id) => {
    const response = await api.delete(`${EVENTS_API}/${id}`, { withCredentials: true });
    return response.data;
};