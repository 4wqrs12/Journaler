import {jwtDecode} from "jwt-decode";

function getAccessToken() {
    return localStorage.getItem("accessToken");
}

function getRefreshToken() {
    return localStorage.getItem("refreshToken");
}

function setAccessToken(token) {
    localStorage.setItem("accessToken", token);
}

function isTokenExpired(token) {
    if (!token) return true;
    try {
        const {exp} = jwtDecode(token);
        return Date.now() >= exp*1000;
    } catch {
        return true;
    }
}

async function refreshAccessToken() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token");

    const res = await fetch(`${import.meta.env.VITE_BASE_API}/api/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${refreshToken}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
    }

    const json = await res.json();
    setAccessToken(json.accessToken);
    return data.accessToken;
}

export async function apiFetch(url, options = {}) {
    let accessToken = getAccessToken();

    if (isTokenExpired(accessToken)) {
        try {
            accessToken = await refreshAccessToken();
        } catch (e) {
            setAccessToken("");
            throw e;
        }
    }

    const headers = {
        ...options.headers,
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    };

    const res = await fetch(url, {...options, headers});

    return res;
}