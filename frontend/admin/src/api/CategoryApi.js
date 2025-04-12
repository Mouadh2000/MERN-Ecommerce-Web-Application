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

export const getAllCategories = async () => {
    try {
        const response = await axiosInstance.get('categories/');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getCategoryById = async (userId) => {
    try {
        const response = await axiosInstance.get(`category/${userId}/`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteCategoryById = async (categoryId) => {
    try {
        const response = await axiosInstance.delete(`category/delete/${categoryId}/`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const addCategory = async (categoryData) => {
    try {
        const response = await axiosInstance.post(`category/create/`, categoryData);
        
        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Catégorie ajoutée avec succès !',
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

export const updateCategoryById = async (categoryId, categoryData) => {
    try {
        const response = await axiosInstance.put(`category/update/${categoryId}/`, categoryData);
        
        Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: `Catégorie avec l'ID ${categoryId} mise à jour avec succès.`,
            customClass: {
                container: 'custom-swal-container'
            }
        });
        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};