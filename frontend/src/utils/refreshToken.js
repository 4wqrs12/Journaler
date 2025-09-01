export async function refresh() {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/api/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }
        const json = await res.json();
        localStorage.setItem("accessToken", json.data.accessToken);
    } catch (e) {
        console.error(`Error: ${e}`);
    }
}