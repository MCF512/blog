export function request(url, method, data) {
    return fetch(`http://localhost:4001${url}`, {
        withCredentials: true,
	    baseURL: 'http://127.0.0.1:3000',
	    headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
	    credentials: 'include',
        method: method || "GET",
        body: data ? JSON.stringify(data) : undefined,
    })
    .then(async res => {
        const data = await res.json()
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return data;
    })
    .catch(error => {
        console.error('Fetch error:', error);
        throw error;
    });
}