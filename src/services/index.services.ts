const baseUrl = import.meta.env.VITE_PROD === "TRUE" ? import.meta.env.VITE_API_LIVE : import.meta.env.VITE_API_TEST;

const endpoints = {
    "note" : "note",
    "me" : "user",
    "user" : {
        "login" : "user/login",
        "note" : "user/note",
    }
};
export  {baseUrl,endpoints};
