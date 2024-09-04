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
    name?:string,
    email : string,
    password : string,
    confirm_password? : string,
}

export type {
    NoteForm,
    LoginForm,
    SignupForm
}