import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

const EmailForm = () => {
  useEffect(() => {
    emailjs.init("feS7INkip4hBz_2zm"); // Initialize EmailJS
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("All fields are required!", { position: "top-center" });
      return;
    }

    toast.success("Sending email...", { position: "top-center" });

    const serviceId = "service_c2h8v2h";
    const templateId = "template_dcq67kb";
    const publicKey = "feS7INkip4hBz_2zm";

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "RockClient",
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        toast.success("Email sent successfully!", { position: "top-center" });
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Email send error:", error);
        toast.error("Failed to send email. Check console for details.", {
          position: "top-center",
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#181818] p-6">
      <div className="form-container">
        <h2 className="form-title">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <textarea
            cols="30"
            rows="5"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="submit-button">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
