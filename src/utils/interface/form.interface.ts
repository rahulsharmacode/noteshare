interface NoteForm {
    title : string,
    aurthor : string,
    description : string,
}

interface LoginForm {
    email : string,
    password : string,
}

interface SignupForm {
    email : string,
    password : string,
    confirm_password : string,
}

export type {
    NoteForm,
    LoginForm,
    SignupForm
}