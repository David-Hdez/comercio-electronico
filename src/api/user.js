export async function registerApi(data) {
    try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json()

        return result
    } catch (error) {
        console.error(error)

        return null;
    }
}

export async function loginApi(data) {
    try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json()

        return result
    } catch (error) {
        console.error(error)

        return null;
    }
}
