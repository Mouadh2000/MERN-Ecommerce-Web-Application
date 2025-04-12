import axiosInstance from "axiosApi";
import Swal from 'sweetalert2';
import "../assets/css/sweetAlertStyle.css";

export const getAllClients = async () => {
    try {
        const response = await axiosInstance.get('clients/');
        return response.data;
    } catch (error) {
        return false;
    }
};

export const getClientCount = async () => {
    try {
        const response = await axiosInstance.get('client/count');
        return response.data;
    } catch (error) {
        return false;
    }
};

export const deleteClientById = async (clientId) => {
    try {
        const response = await axiosInstance.delete(`client/delete/${clientId}/`);
        Swal.fire({
            icon: 'success',
            title: 'Supprimé !',
            text: 'Le client a été supprimé avec succès.',
            customClass: {
                container: 'custom-swal-container'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            Swal.fire({
                icon: 'error',
                title: 'Permission refusée',
                text: error.response?.data?.message || 'Vous n\'avez pas la permission de supprimer ce client.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: error.response?.data?.message || 'Une erreur est survenue lors de la suppression du client.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        throw error;
    }
};

export const disableClientById = async (clientId) => {
    try {
        const response = await axiosInstance.put(`client/disable/${clientId}/`);
        Swal.fire({
            icon: 'success',
            title: 'Désactivé !',
            text: 'Le client a été désactivé avec succès.',
            customClass: {
                container: 'custom-swal-container'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            Swal.fire({
                icon: 'error',
                title: 'Permission refusée',
                text: error.response?.data?.message || 'Vous n\'avez pas la permission de désactiver ce client.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: error.response?.data?.message || 'Une erreur est survenue lors de la désactivation du client.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        throw error;
    }
};

export const enableClientById = async (clientId) => {
    try {
        const response = await axiosInstance.put(`client/enable/${clientId}/`);
        Swal.fire({
            icon: 'success',
            title: 'Activé !',
            text: 'Le client a été activé avec succès.',
            customClass: {
                container: 'custom-swal-container'
            }
        });
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: error.response?.data?.message || 'Une erreur est survenue lors de l\'activation du client.',
            customClass: {
                container: 'custom-swal-container'
            }
        });
        throw error;
    }
};
