const AccessControl = require('accesscontrol')
const ac = new AccessControl()

exports.roles =(function() {
    ac.grant('user')
    .readOwn('profile')
    .updateOwn('profile')
    .createOwn('profile')

    ac.grant('admin')
    .extend('user')
    .extend('profile')
    .updateAny('profile')
    .deleteAny('profile')
    return ac;
});