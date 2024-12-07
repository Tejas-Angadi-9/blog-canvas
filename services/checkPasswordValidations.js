export const checkPasswordValidations = (password) => {
    const lowerCase = /[a-z]/.test(password);
    const upperCase = /[A-Z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length >= 8;

    if (!lowerCase || !upperCase || !number || !specialChar || !length)
        return false;
    return true;
}