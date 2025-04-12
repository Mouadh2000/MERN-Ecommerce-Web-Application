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

export const getAllPaymentMethods = async () => {
    try {
        const response = await axiosInstance.get('payment-methods/');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getPaymentMethodById = async (paymentId) => {
    try {
        const response = await axiosInstance.get(`payment-method/${paymentId}/`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deletePaymentMethodById = async (paymentId) => {
    try {
        const response = await axiosInstance.delete(`payment-method/delete/${paymentId}/`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const addPaymentMethod = async (paymentData) => {
    try {
        const response = await axiosInstance.post(`payment-method/create/`, paymentData);
        
        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Mode de paiement ajouté avec succès !',
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

export const updatePaymentMethodById = async (paymentId, paymentData) => {
    try {
        const response = await axiosInstance.put(`payment-method/update/${paymentId}/`, paymentData);
        
        Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: `Mode de paiement avec l'ID ${paymentId} mis à jour avec succès.`,
            customClass: {
                container: 'custom-swal-container'
            }
        });
        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};