module.exports = (err, req, res, next) => {
    if (err.errors) {
        let message = '';

        for (const key in err.errors) {
            message = err.errors[key].properties.message;
            break;
        }

        return res.status(400).json({ ok: false, message });
    }

    if (err.message) {
        return res.status(400).json({ ok: false, message: err.message });
    }

    return res.status(500).json({ ok: false, message: 'Something went wrong! Please, try again!' });
}
