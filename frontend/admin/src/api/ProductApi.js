import axiosInstance from "axiosApi";
import Swal from 'sweetalert2';
import "../assets/css/sweetAlertStyle.css";

const handleError = (error) => {
    const data = error?.response?.data;
    const status = error?.response?.status;

    const title =
        status === 400 ? 'Champ invalide' :
        status === 403 ? 'Permission refusée' :
        status === 404 ? 'Non trouvé' :
        'Erreur';

    const text = data?.message || data?.error || 'Une erreur est survenue';

    Swal.fire({
        icon: 'error',
        title,
        text,
        customClass: {
            container: 'custom-swal-container'
        }
    });

    throw error;
};

export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get('products/');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getProductById = async (userId) => {
    try {
        const response = await axiosInstance.get(`product/${userId}/`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteProductById = async (productId) => {
    try {
        const response = await axiosInstance.delete(`product/delete/${productId}/`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const addProduct = async (productData) => {
    try {
        const response = await axiosInstance.post(`product/create/`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Produit ajouté avec succès !',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateProductById = async (productId, productData) => {
    try {
        const response = await axiosInstance.put(`product/update/${productId}/`, productData);
        
        Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: `Produit avec l'ID ${productId} mis à jour avec succès.`,
            customClass: {
                container: 'custom-swal-container'
            }
        });
        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};