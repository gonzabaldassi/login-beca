exports.getUserInfo = (user) => {
    return {
        id: user.id,
        username: user.username,
        name: user.name
    }
}