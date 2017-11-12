const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/users/doLogin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
export const doSignup = (payload) =>
    fetch(`${api}/users/doSignup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const editProfile = (payload) =>
    fetch(`${api}/users/editprofile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const doShare = (payload) =>
    fetch(`${api}/users/doShare`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        //credentials: 'include',
        //mode: 'cors',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const createGroup = (payload) =>
    fetch(`${api}/users/createGroup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        //credentials: 'include',
        //mode: 'cors',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const createFolder = (payload) =>
    fetch(`${api}/users/createFolder`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        //credentials: 'include',
        //mode: 'cors',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });



 export const getImages = () =>
    fetch(`${api}/files/`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const GetFiles = (payload) =>
    fetch(`${api}/users/files`,{
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const uploadFile = (payload) =>
    fetch(`${api}/files/upload`, {
        method: 'POST',
        body: payload
    }).then(res => res.json())
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const downloadFile = (payload) =>
    fetch(`${api}/files/download`, {
        method: 'GET',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const doStar = (payload) =>
    fetch(`${api}/users/doStar`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doGetStar = (payload) =>
    fetch(`${api}/users/doGetStar`,{
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const doDelStar = (payload) =>
    fetch(`${api}/users/doDelStar`,{
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });