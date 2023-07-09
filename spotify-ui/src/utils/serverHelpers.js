import {backendUrl} from './config'

export const makeUnauthenticatedPOSTRequest = async (router, body) => {
    const response = await fetch (backendUrl+router, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    const formattedResponse = await response.json();
    return formattedResponse;

}

export const makeUnauthenticatedPOSTRequest2 = async (router, body) => {
    const token = getToken()
    const response = await fetch (backendUrl+router, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body),
    })
    const formattedResponse = await response.json();
    return formattedResponse;

}

export const makeUnauthenticatedGetMySongRequest = async (router) => {
    const token = getToken()
    const response = await fetch (backendUrl+router, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    const formattedResponse = await response.json();
    return formattedResponse;

}

export const makeUnauthenticatedGetAllPlaylists = async (router) => {
    const token = getToken()
    const response = await fetch (backendUrl+router, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    const formattedResponse = await response.json();
    return formattedResponse;

}

const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};
