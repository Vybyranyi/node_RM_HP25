export const logger = (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] Отримано запит: ${req.method} ${req.url}`);
    
    next();
}