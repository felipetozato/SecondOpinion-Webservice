function handleHTTPError(err, res) {
    res.setHeader('Content-Type', 'application/json')
    switch (err.code) {
        case 401:
            return res.status(401).json(prepareJsonErrorBody(err.status, err.message))
        default:
            return res.status(err.code).json(prepareJsonErrorBody(err.status, err.message))
    }
}

function prepareJsonErrorBody(status, jsonMessage) {
    return {
        "status" : status,
        "message": JSON.stringify(jsonMessage)
    }
}

export const  asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(err => {
                console.log(err)
                if (err.code > 0) {
                    handleHTTPError(err, res)
                } else {
                    next(err)
                }
            });
    };