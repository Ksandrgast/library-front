import Cookies from "js-cookie";
const API_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchFromAPI = async (endpoint: string, options: RequestInit = {}) => {
    const token = Cookies.get("token"); // Получаем токен из cookies

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}), // Добавляем токен, если он есть
            ...options.headers,
        },
    });

    // Проверяем наличие тела ответа (некоторые API возвращают пустой body)
    const isJson = response.headers.get("Content-Type")?.includes("application/json");
    let data = null;

    if (isJson) {
        try {
            data = await response.json();
        } catch (error) {
            console.warn("Ошибка парсинга JSON", error);
        }
    }

    // Обрабатываем ошибки HTTP-статусов
    if (!response.ok) {
        const error = new Error(data?.message || `Ошибка API: ${response.statusText}`);
        (error as any).status = response.status; // Добавляем статус ошибки
        throw error;
    }

    return data;
};
