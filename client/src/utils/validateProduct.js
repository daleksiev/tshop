const validateProduct = ({
    title,
    brand,
    price,
    category,
}) => {
    if (!title.length) {
        return { ok: false, message: 'Title is required!' }
    }

    if (!brand.length) {
        return { ok: false, message: 'Brand is required!' }
    }

    if (!price.toString().length) {
        return { ok: false, message: 'Price is required!' }
    }

    if (!category) {
        return { ok: false, message: 'Category is required!' }
    }

    if (price <= 0) {
        return { ok: false, message: 'The price should be positive number!' }
    }

    return { ok: true, message: '' };
}

export default validateProduct;