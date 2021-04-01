const validateProduct = ({
    title,
    brand,
    price,
    imageUrl,
    category,
}) => {
    const imageUrlPattern = /^https?:\/\/(.*)/;

    if (!title.length) {
        return { ok: false, message: 'Title is required!' }
    }

    if (!brand.length) {
        return { ok: false, message: 'Brand is required!' }
    }

    if (!price.toString().length) {
        return { ok: false, message: 'Price is required!' }
    }

    if (!imageUrl.length) {
        return { ok: false, message: 'Image Url is required!' }
    }

    if (!category) {
        return { ok: false, message: 'Category is required!' }
    }

    if (price <= 0) {
        return { ok: false, message: 'The price should be positive number!' }
    }

    if (!imageUrlPattern.test(imageUrl)) {
        return { ok: false, message: `${imageUrl} is not a valid url address!` }
    }

    return { ok: true, message: '' };
}

export default validateProduct;