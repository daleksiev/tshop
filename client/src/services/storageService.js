import { storage } from '../firebase';
const products = 'products/';

export const uploadImage = (file) => storage.ref(products + file.name).put(file);

export const downloadImage = async (fileName) => fileName ? storage.ref(products + fileName).getDownloadURL() : '';

export const deleteImage = (fileName) => storage.ref(products + fileName).delete();

export const saveImage = (file) => uploadImage(file)
    .then(() => downloadImage(file.name));