const errorHandler = (err, req, res, next) => {
    console.error({
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl
    });

    if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
    }

    if (err.code === 11000) {
        return res.status(400).json({ message: "Duplicate field value" });
    }

    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message || "Internal server error"
    });
};

module.exports = errorHandler;
