import { useState } from 'react';
import Loader from '../components/Loader';
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaHome,
} from 'react-icons/fa';
import ConnectBtn from '../components/ConnectBtn';
import Info from '../components/Info';
import { motion } from 'framer-motion';

export default function Contact() {
  const [isSending, setIsSending] = useState(false);

  function handleSubmit(e) {
    setIsSending(true);
    e.preventDefault();
    setTimeout(() => {
      setIsSending(false);
    }, 2000);
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
        className="w-full m-2 md:w-4/5 bg-white rounded-lg flex flex-col items-center justify-center"
      >
        <p className="text-3xl font-bold mt-4">Conctact me</p>
        <div className="flex flex-col md:flex-row w-full items-center justify-center">
          <form className="flex flex-col w-full md:w-2/3 p-8 gap-4 my-4">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="ring-2 ring-slate-950 rounded-md px-4 py-2"
              name=""
              id=""
            />
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="ring-2 ring-slate-950 rounded-md px-4 py-2"
              name=""
              id=""
            />
            <label htmlFor="">Your Message</label>
            <textarea
              name=""
              rows={8}
              className="ring-2 ring-slate-950 rounded-md px-4 py-2"
              id=""
            ></textarea>
            <button
              className="bg-slate-950 rounded-md px-4 py-2 text-white md:w-44"
              onClick={handleSubmit}
            >
              {isSending ? <Loader /> : 'Send Message'}
            </button>
          </form>
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <div className="flex items-start justify-center flex-col gap-4 mb-14 pb-8 border-b border-slate-950">
              <Info Icon={FaPhone} value={'+228 91 35 59 86'} />
              <Info Icon={FaEnvelope} value={'ezechielagban1@gmail.com'} />
              <Info Icon={FaHome} value={'Lomé, Togo'} />
            </div>
            <p className="text-2xl font-semibold">Let&apos;s Connect</p>
            <div className="flex flex-row mt-4 text-xl gap-2 mb-4">
              <ConnectBtn Icon={FaGithub} link={'https://google.com'} />
              <ConnectBtn Icon={FaWhatsapp} link={'https://google.com'} />
              <ConnectBtn Icon={FaLinkedin} link={'https://google.com'} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
