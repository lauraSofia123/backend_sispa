const BASE_URL = 'http://localhost:8000/api';

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      ...options
    });

    return await response.json();
  } catch (error) {
    console.error('Error en fetch:', error);
    return { success: false };
  }
};
