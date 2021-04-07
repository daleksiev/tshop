import { storage } from '../firebase';

export const uploadImage = (file, prefix = 'products/') => storage.ref(prefix + file.name).put(file);

export const downloadImage = async (fileName, prefix = 'products/') => fileName ? storage.ref(prefix + fileName).getDownloadURL() : '';

export const deleteImage = (fileName, prefix = 'products/') => storage.ref(prefix + fileName).delete().catch(err => { });

export const saveImage = (file, prefix) => uploadImage(file, prefix)
    .then(() => downloadImage(file.name, prefix));