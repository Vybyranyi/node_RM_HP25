export const checkAuth = (req, res, next) => {
    const isAuth = req.headers.authorization === "secret-token";

    if(isAuth) {
        next()
    } else {
        res.status(401).send("Користувач не авторизований")
    }
}