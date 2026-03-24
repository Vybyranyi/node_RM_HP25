export const addTimestamp = (req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
}