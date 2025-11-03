const API_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

async function request(url, options = {}) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        credentials: 'include', // send cookies/session
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const errorData = await response
            .json()
            .catch(() => ({ error: 'An unknown error occurred' }));
        throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`
        );
    }

    return response.json();
}

export function getTodos() {
    return request('/todos');
}

export function addTodo(title) {
    return request('/todos', {
        method: 'POST',
        body: JSON.stringify({ title }),
    });
}

export function updateTodo(id, data) {
    return request(`/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export function deleteTodo(id) {
    return request(`/todos/${id}`, { method: 'DELETE' });
}