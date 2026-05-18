import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Enquire.css";

const Enquire = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialMachinery = (query.get("machinery") || "baler").toLowerCase();
  const initialModel = query.get("model") || "";

  const [selectedMachinery, setSelectedMachinery] = useState(initialMachinery);
  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    website: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const models = {
    baler: [
      "Tyre Scrap Balers",
      "Plastic Balers",
      "Card Board Balers",
      "Metal Balers",
    ],
    shredder: [
      "Tyre Shredder",
      "Metal Shredder",
      "Plastic Shredder",
      "Paper and Cardboard Shredder",
      "E-waste"
    ],
    "secondary-shredder": [
      "Rasper",
      "Metal Shredders",
      "Plastic Shredder",
      "Paper and Cardboard Shredder",
    ],
    "other-equipment": [
      "STEEL CLEANING",
      "TUMBLE BACK FEEDER",
      "FEEDING & DISCHARGE CONVEYORS",
      "VIBRATORS",
      "CLASSIFIERS",
      "OVERBAND MAGNETIC STEEL SEPARATORS",
      "BEAD WIRE REMOVER",
      "STRIP CUTTER",
      "BLOCK CUTTER",
      "SIDE WALL REMOVER",
      "CUTTING EQUIPMENT",
      "FOLDING EQUIPMENT",
      "DUST COLLECTOR",
      "VIBRO HOPPER",
      "FIBRE SEPARATOR",
    ],
  };

  // keep initial selection in sync with available models
useEffect(() => {
  // Only auto-select the first model if the URL didn't provide one
  // OR if the provided machinery doesn't have the provided model.
  if (models[selectedMachinery]) {
    const isModelValid = models[selectedMachinery].includes(selectedModel);
    
    if (!selectedModel || !isModelValid) {
      setSelectedModel(models[selectedMachinery][0]);
    }
  }
}, [selectedMachinery]);

  const handleMachineryChange = (event) => {
    const machinery = event.target.value.toLowerCase();
    setSelectedMachinery(machinery);
    setSelectedModel(models[machinery] ? models[machinery][0] : "");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be valid (10–15 digits)";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://www.vikahecotech.com/send-email.php",
        {
          ...formData,
          machinery: selectedMachinery,
          model: selectedModel,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Email sent successfully!");
      window.location.reload();

      // (Won't usually run because of reload, but keeping it exactly
      // like your original logic)
      setFormData({
        name: "",
        company: "",
        email: "",
        website: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        message: "",
      });

      setSelectedMachinery("baler");
      setSelectedModel("Tyre Scrap Balers");
      setErrors({});
    } catch (error) {
      alert("Failed to send email: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const machineryLabelMap = {
    baler: "Baler",
    shredder: "Primary Shredder",
    "secondary-shredder": "Secondary Shredder",
    "other-equipment": "Other Equipment",
  };

  return (
    <div className="enquire-page">
      {/* HERO / SUMMARY */}
      <section className="enquire-hero">
        <div className="enquire-hero-inner">
          <div className="enquire-kicker">Talk to our team</div>
          <h1 className="enquire-title">Request a Machinery Quote</h1>
          <p className="enquire-subtitle">
            Please share your details and application. Our engineers will reach
            out within <strong>48 hours</strong> with the right solution.
          </p>

          <div className="enquire-summary">
            <div className="enquire-pill">
              <span className="enquire-pill-label">Machinery</span>
              <span className="enquire-pill-value">
                {machineryLabelMap[selectedMachinery] || "Baler"}
              </span>
            </div>
            <div className="enquire-pill">
              <span className="enquire-pill-label">Application</span>
              <span className="enquire-pill-value">
                {selectedModel || "Select an application"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FORM CARD */}
      <section className="enquire-shell">
        <div className="enquire-card mb-5">
          <header className="enquire-card-header">
            <div className="enquire-step-badge">Step 1 · Tell us about you</div>
            <h2>Contact & Machinery details</h2>
            <p>
              This helps us configure the right recycling machinery and share a
              tailored proposal.
            </p>
          </header>

          <form className="enquire-form" onSubmit={handleSubmit}>
            {/* Machinery selection row */}
            <div className="enquire-section">
              <h3 className="enquire-section-title">Equipment interest</h3>
              <div className="enquire-grid">
                <div className="enquire-field">
                  <label htmlFor="machinery">Machinery</label>
                  <select
                    id="machinery"
                    name="machinery"
                    value={selectedMachinery}
                    onChange={handleMachineryChange}
                  >
                    <option value="baler">Baler</option>
                    <option value="shredder">Primary Shredder</option>
                    <option value="secondary-shredder">Secondary Shredder</option>
                    <option value="other-equipment">Other Equipment</option>
                  </select>
                </div>

                <div className="enquire-field">
                  <label htmlFor="model">Application</label>
                  <select
                    id="model"
                    name="model"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                  >
                    {models[selectedMachinery]?.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="enquire-section">
              <h3 className="enquire-section-title">Contact details</h3>
              <div className="enquire-grid">
                <div className="enquire-field">
                  <label htmlFor="name">
                    Name <span className="enquire-required">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div className="enquire-field">
                  <label htmlFor="company">Company name</label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="enquire-grid">
                <div className="enquire-field">
                  <label htmlFor="email">
                    Email <span className="enquire-required">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="enquire-field">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="enquire-grid">
                <div className="enquire-field">
                  <label htmlFor="phone">
                    Phone <span className="enquire-required">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <p className="error">{errors.phone}</p>}
                </div>

                <div className="enquire-field">
                  <label htmlFor="address">
                    Address <span className="enquire-required">*</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && <p className="error">{errors.address}</p>}
                </div>
              </div>

              <div className="enquire-grid">
                <div className="enquire-field">
                  <label htmlFor="city">
                    City <span className="enquire-required">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  {errors.city && <p className="error">{errors.city}</p>}
                </div>

                <div className="enquire-field">
                  <label htmlFor="country">
                    Country <span className="enquire-required">*</span>
                  </label>
                  <input
                    id="country"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                  {errors.country && <p className="error">{errors.country}</p>}
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="enquire-section">
              <h3 className="enquire-section-title">Machinery details</h3>
              <div className="enquire-field">
                <label htmlFor="message">Tell us about your requirement</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="E.g. Expected input material, capacity, layout constraints, etc."
                ></textarea>
              </div>
            </div>

            {/* Submit */}
            <div className="enquire-actions">
              <button
                type="submit"
                className="enquire-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="enquire-submit-inner">
                    <span className="enquire-spinner" />
                    Sending…
                  </span>
                ) : (
                  <span className="enquire-submit-inner">
                    Submit enquiry
                    <span className="enquire-arrow">→</span>
                  </span>
                )}
              </button>
              <p className="enquire-footnote">
                By submitting this form, you agree to be contacted by Vikah
                Ecotech regarding your enquiry.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Enquire;
