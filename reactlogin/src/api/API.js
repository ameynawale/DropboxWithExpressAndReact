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


export const doSignUp = (payload) =>
    fetch(`${api}/users/doSignUp`, {
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

export const getImages = () =>
    fetch(`${api}/files/`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const uploadFile = (payload) =>
    fetch(`${api}/files/upload`, {
        method: 'POST',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });
