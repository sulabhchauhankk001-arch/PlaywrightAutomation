const validUser = {
    email: 'student@example.com',
    password: 'secret123'
};

const invalidUser = {
    email: 'student@example.com',
    password: 'wrongPassword'
};

const blankEmail = {
    email: '',
    password: 'wrongPassword'
};
const blankPassword = {
    email: 'student@example.com',
    password: ''
};
const UserNotFound = {
    email: 'student@euuuuxample.com',
    password: 'secret123'
};
const bothValid={
    email: 'amanvermakk121777@gmail.com',
    password: 'bijnorwrA5%'
}

module.exports = {
    validUser,
    invalidUser,
    blankEmail,
    blankPassword,
    bothValid

};
