import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";

import { HarryBroom } from "../models";
import useAlert from "../hooks/useAlert";
import { Alert, Loader } from "../components";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [emailjsReady, setEmailjsReady] = useState(false);

  // Verify EmailJS initialization
  useEffect(() => {
    if (
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID &&
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ) {
      setEmailjsReady(true);
      console.log("EmailJS environment variables loaded successfully");
    } else {
      console.error("Missing EmailJS environment variables");
      showAlert({
        show: true,
        text: "Email service configuration error",
        type: "danger",
      });
    }
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!emailjsReady) {
      showAlert({
        show: true,
        text: "Email service not initialized",
        type: "danger",
      });
      return;
    }

    setLoading(true);
    setCurrentAnimation("hit");

    try {
      console.log("Attempting to send email with data:", {
        serviceId: import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        publicKey: import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
        formData: {
          from_name: form.name,
          to_name: "Srinidhi Chitti",
          from_email: form.email,
          to_email: "srinidhichittiwork@gmail.com",
          message: form.message,
        }
      });

      const response = await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Srinidhi Chitti",
          from_email: form.email,
          to_email: "srinidhichittiwork@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      console.log("EmailJS response:", response);

      showAlert({
        show: true,
        text: "Thank you for your message 😃",
        type: "success",
      });

      // Reset form
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email sending failed:", error);
      
      let errorMessage = "Failed to send message. Please try again later.";
      if (error.text) {
        errorMessage += ` (${error.text})`;
      }

      showAlert({
        show: true,
        text: errorMessage,
        type: "danger",
      });
    } finally {
      setLoading(false);
      setCurrentAnimation("idle");
      
      // Hide alert after 5 seconds
      setTimeout(() => {
        hideAlert();
      }, 5000);
    }
  };

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      {alert.show && <Alert {...alert} />}

      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in Touch</h1>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='w-full flex flex-col gap-7 mt-14'
        >
          <label className='text-black-500 font-semibold'>
            Name
            <input
              type='text'
              name='name'
              className='input'
              placeholder='Srinidhi'
              required
              minLength={2}
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Email
            <input
              type='email'
              name='email'
              className='input'
              placeholder='name@gmail.com'
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Your Message
            <textarea
              name='message'
              rows='4'
              className='textarea'
              placeholder='Write your thoughts here...'
              required
              minLength={10}
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <button
            type='submit'
            disabled={loading || !emailjsReady}
            className='btn'
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <OrbitControls enableZoom={false} />

          <Suspense fallback={<Loader />}>
            <HarryBroom
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[4, 4, 4]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;