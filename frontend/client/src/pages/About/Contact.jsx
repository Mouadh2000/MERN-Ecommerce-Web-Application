import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import ScrollToTop from "../ScrollToTop";
import { createComplaint } from "../../Api/ComplaintApi";

const Contact = () => {
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    message: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoaderStatus(false);
    }, 1500);
  }, []);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createComplaint(formData);
      if (res.success) {
        setSubmitSuccess("Réclamation envoyée avec succès !");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          title: "",
          message: "",
        });
      }
    } catch (err) {
      setSubmitSuccess("Échec de l'envoi de la réclamation.");
    }
  };

  return (
    <div>
      {loaderStatus ? (
        <div className="loader-container">
          <MagnifyingGlass
            visible={true}
            height="100"
            width="100"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClassName="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#0aad0a"
          />
        </div>
      ) : (
        <>
          <ScrollToTop />
          <section className="my-lg-14 my-8">
            <div className="container">
              <div className="row">
                <div className="offset-lg-2 col-lg-8 col-12">
                  <div className="mb-8">
                    <h1 className="h3">Envoyez une réclamation</h1>
                  </div>

                  {submitSuccess && (
                    <div className="alert alert-info">{submitSuccess}</div>
                  )}

                  <form className="row" onSubmit={handleSubmit}>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Prénom<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="Entrez votre prénom"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Nom<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Entrez votre nom"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-12 mb-3">
                      <label className="form-label">Titre</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Votre titre"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Email<span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Entrez votre email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-12 mb-3">
                      <label className="form-label">Message</label>
                      <textarea
                        name="message"
                        rows={3}
                        className="form-control"
                        placeholder="Votre message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <button type="submit" className="btn btn-primary">
                        Envoyer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Contact;
