export const validateInputNewPas = (setPassword:Function, value:string, setErrorMesPas:Function, setErrorPas:Function) => {
    const rePassword = /(?=.*\d)(?=.*[a-zA-Z]).{6,}/;
    setPassword(value)
    if (value.trim() === '') {
        setErrorMesPas('Password Required')
        setErrorPas(true)
    } else if (!rePassword.test(value)) {
        console.log(rePassword.test(value))
        setErrorPas(true)
        setErrorMesPas('the password must contain one digit, and length must be 6 and more')

    } else {
        setErrorMesPas('')
        setErrorPas(false)
    }

}