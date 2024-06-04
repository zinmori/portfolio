import { useState } from 'react';
import Loader from '../components/Loader';
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaCheckCircle,
} from 'react-icons/fa';
import { VscError } from 'react-icons/vsc';
import ConnectBtn from '../components/ConnectBtn';
import Info from '../components/Info';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSucces] = useState('notSend');
  const [emailIsWrong, setEmailIsWrong] = useState(false);
  const [messageIsWrong, setMessageIsWrong] = useState(false);
  const [nameIsWrong, setNameIsWrong] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function validateEmail(email) {
    return email.includes('@') && email.includes('.');
  }
  function validateMessage(message) {
    return message.length > 0;
  }
  function validateName(name) {
    return name.length > 2;
  }

  function validateInputs() {
    setEmailIsWrong(!validateEmail(formData.email));
    setMessageIsWrong(!validateMessage(formData.message));
    setNameIsWrong(!validateName(formData.name));
    return (
      validateEmail(formData.email) &&
      validateMessage(formData.message) &&
      validateName(formData.name)
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSending(true);
    if (!validateInputs()) {
      setIsSending(false);
      return;
    }
    setEmailIsWrong(false);
    setMessageIsWrong(false);
    setNameIsWrong(false);
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          to_name: 'BigZ',
          from_email: formData.email,
          to_email: 'ezechielagban1@gmail.com',
          message: formData.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setFormData({ name: '', email: '', message: '' });
        setIsSucces('yes');
      })
      .catch((error) => {
        setIsSucces('no');
        console.log(error);
      })
      .finally(() => {
        setIsSending(false);
      });
  }

  return (
    <div
      id="contact"
      className="rounded-lg text-slate-950 items-center w-full flex justify-center mt-32"
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
          },
        }}
        viewport={{ once: false }}
        className="w-full m-2 md:w-4/5 bg-slate-100 rounded-lg flex flex-col items-center justify-center"
      >
        <p className="text-3xl font-bold mt-4">Conctact me</p>
        <div className="flex flex-col md:flex-row w-full items-center justify-center">
          <form className="flex flex-col w-full md:w-2/3 p-8 gap-4 my-4">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="ring-2 ring-slate-950 rounded-md px-4 py-2"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
            />
            {nameIsWrong && (
              <p className="text-red-600 font-semibold">Invalid Name</p>
            )}
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="john@gmail.com"
              className="ring-2 ring-slate-950 rounded-md px-4 py-2"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
            />
            {emailIsWrong && (
              <p className="text-red-600 font-semibold">Invalid Email</p>
            )}
            <label htmlFor="">Your Message</label>
            <textarea
              name="message"
              placeholder="Hi..."
              rows={8}
              className="ring-2 ring-slate-950 rounded-md px-4 py-2"
              id="message"
              value={formData.message}
              onChange={(e) => handleChange(e)}
            ></textarea>
            {messageIsWrong && (
              <p className="text-red-600 font-semibold">Invalid Message</p>
            )}
            <div className="flex flex-col md:flex-row items-center justify-start gap-4">
              <button
                className="bg-slate-950 rounded-md px-4 py-2 text-white md:w-44"
                onClick={handleSubmit}
              >
                {isSending ? <Loader /> : 'Send Message'}
              </button>
              {isSuccess !== 'notSend' ? (
                isSuccess === 'yes' ? (
                  <p className="text-green-500 font-semibold  flex flex-row items-center gap-1">
                    <FaCheckCircle />
                    Message sent succesfully !
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold flex flex-row items-center gap-1">
                    {' '}
                    <VscError />
                    An error occured !
                  </p>
                )
              ) : null}
            </div>
          </form>
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <div className="flex items-start justify-center flex-col gap-4 mb-14 pb-8 border-b border-slate-950">
              <Info Icon={FaPhone} value={'+228 91 35 59 86'} />
              <Info Icon={FaEnvelope} value={'ezechielagban1@gmail.com'} />
              <Info Icon={FaHome} value={'Lomé, Togo'} />
            </div>
            <p className="text-2xl font-semibold">Let&apos;s Connect</p>
            <div className="flex flex-row mt-4 text-xl gap-2 mb-4">
              <ConnectBtn Icon={FaGithub} link={'https://github.com/zinmori'} />
              <ConnectBtn
                Icon={FaWhatsapp}
                link={'https://wa.me/22891355986'}
              />
              <ConnectBtn
                Icon={FaLinkedin}
                link={'https://www.linkedin.com/in/kokou-ezechiel-agban/'}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
