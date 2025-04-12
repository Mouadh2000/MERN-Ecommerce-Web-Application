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

export const getAllComplaints = async () => {
    try {
        const response = await axiosInstance.get('complaints/');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};