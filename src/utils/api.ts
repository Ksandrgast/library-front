const API_URL = process.env.REACT_APP_BACKEND_URL; // Фолбэк на localhost

export const fetchFromAPI = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Ошибка API: ${response.statusText}`);
    }

    return response.json();
};