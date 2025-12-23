import api from './api';

const ARTIST_API = '/artists';

export const getAllArtists = async () => {
    const response = await api.get(ARTIST_API);
    return response.data;
};

export const getArtistById = async (id) => {
    const response = await api.get(`${ARTIST_API}/${id}`);
    return response.data;
};

export const createArtist = async (artistData) => {
    const response = await api.post(ARTIST_API, artistData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const updateArtist = async (id, artistData) => {
    const response = await api.put(`${ARTIST_API}/${id}`, artistData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const deleteArtist = async (id) => {
    const response = await api.delete(`${ARTIST_API}/${id}`);
    return response.data;
};