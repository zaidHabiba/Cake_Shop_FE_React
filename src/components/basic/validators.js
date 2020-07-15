/**
 * @return {boolean}
 */
export function ValidateEmail(mail) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

export function ValidatePhone(phone) {
    return phone.match(/^\d{8,13}$/);
}