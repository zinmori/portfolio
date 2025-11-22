'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaPaperPlane,
  FaUser,
  FaComments,
} from 'react-icons/fa';
import { VscError } from 'react-icons/vsc';
import ConnectBtn from '../components/ConnectBtn';

export default function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState('notSend');
  const [emailIsWrong, setEmailIsWrong] = useState(false);
  const [messageIsWrong, setMessageIsWrong] = useState(false);
  const [nameIsWrong, setNameIsWrong] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [ref, inView] = useInView({
    // threshold: 0.1,
    triggerOnce: true,
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset error states when user starts typing
    if (e.target.name === 'email') setEmailIsWrong(false);
    if (e.target.name === 'message') setMessageIsWrong(false);
    if (e.target.name === 'name') setNameIsWrong(false);
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
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          to_name: 'Ezechiel',
          from_email: formData.email,
          to_email: 'ezechielagban1@gmail.com',
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setFormData({ name: '', email: '', message: '' });
        setIsSuccess('yes');
        setTimeout(() => setIsSuccess('notSend'), 5000);
      })
      .catch((error) => {
        setIsSuccess('no');
        console.log(error);
        setTimeout(() => setIsSuccess('notSend'), 5000);
      })
      .finally(() => {
        setIsSending(false);
      });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const contactInfo = [
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+228 91 35 59 86',
      href: 'tel:+22891355986',
      color: '#22c55e',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'ezechielagban1@gmail.com',
      href: 'mailto:ezechielagban1@gmail.com',
      color: '#16a34a',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Lomé, Togo',
      href: 'https://maps.google.com/?q=Lome,Togo',
      color: '#4ade80',
    },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-dark/20"></div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="section-container relative z-10"
      >
        {/* Section header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
            variants={itemVariants}
          >
            Let&apos;s Create <span className="text-gradient">Together</span>
          </motion.h2>

          <motion.p
            className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s
            discuss how we can bring your ideas to life.
          </motion.p>

        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.div
              className="glass-effect rounded-2xl p-8 border border-white/10"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center space-x-3">
                <FaPaperPlane className="text-primary-400" />
                <span>Send me a message</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  className="space-y-2"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label
                    htmlFor="name"
                    className="text-white font-medium flex items-center space-x-2"
                  >
                    <FaUser className="text-primary-400 text-sm" />
                    <span>Full Name</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full bg-dark-700/50 border ${
                        nameIsWrong ? 'border-red-500' : 'border-white/20'
                      } rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300`}
                    />
                    {nameIsWrong && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute right-3 top-3"
                      >
                        <VscError className="text-red-500" />
                      </motion.div>
                    )}
                  </div>
                  {nameIsWrong && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm font-medium"
                    >
                      Please enter a valid name (min 3 characters)
                    </motion.p>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                  className="space-y-2"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label
                    htmlFor="email"
                    className="text-white font-medium flex items-center space-x-2"
                  >
                    <FaEnvelope className="text-primary-400 text-sm" />
                    <span>Email Address</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full bg-dark-700/50 border ${
                        emailIsWrong ? 'border-red-500' : 'border-white/20'
                      } rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300`}
                    />
                    {emailIsWrong && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute right-3 top-3"
                      >
                        <VscError className="text-red-500" />
                      </motion.div>
                    )}
                  </div>
                  {emailIsWrong && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm font-medium"
                    >
                      Please enter a valid email address
                    </motion.p>
                  )}
                </motion.div>

                {/* Message Field */}
                <motion.div
                  className="space-y-2"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label
                    htmlFor="message"
                    className="text-white font-medium flex items-center space-x-2"
                  >
                    <FaComments className="text-primary-400 text-sm" />
                    <span>Message</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={6}
                      className={`w-full bg-dark-700/50 border ${
                        messageIsWrong ? 'border-red-500' : 'border-white/20'
                      } rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300 resize-none`}
                    />
                    {messageIsWrong && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute right-3 top-3"
                      >
                        <VscError className="text-red-500" />
                      </motion.div>
                    )}
                  </div>
                  {messageIsWrong && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm font-medium"
                    >
                      Please enter a message
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSending}
                  className="w-full btn-primary relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSending ? 1 : 1.02 }}
                  whileTap={{ scale: isSending ? 1 : 0.98 }}
                >
                  <motion.div
                    className="flex items-center justify-center space-x-2"
                    animate={isSending ? { x: [0, 5, 0] } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: isSending ? Infinity : 0,
                    }}
                  >
                    {isSending ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.div>
                </motion.button>

                {/* Success/Error Messages */}
                {isSuccess !== 'notSend' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center space-x-2 p-4 rounded-xl ${
                      isSuccess === 'yes'
                        ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                        : 'bg-red-500/20 border border-red-500/30 text-red-400'
                    }`}
                  >
                    {isSuccess === 'yes' ? (
                      <>
                        <FaCheckCircle />
                        <span className="font-medium">
                          Message sent successfully! I&apos;ll get back to you
                          soon.
                        </span>
                      </>
                    ) : (
                      <>
                        <VscError />
                        <span className="font-medium">
                          An error occurred. Please try again later.
                        </span>
                      </>
                    )}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    info.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="block group"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="glass-effect rounded-xl p-6 border border-white/10 card-hover">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="p-3 rounded-full"
                        style={{ backgroundColor: `${info.color}20` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <info.icon
                          className="text-xl"
                          style={{ color: info.color }}
                        />
                      </motion.div>
                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">
                          {info.label}
                        </p>
                        <p className="text-white font-semibold group-hover:text-primary-400 transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              className="glass-effect rounded-xl p-6 border border-white/10"
              variants={itemVariants}
            >
              <h3 className="text-xl font-display font-bold text-white mb-6">
                Connect with me
              </h3>
              <div className="flex space-x-4">
                <ConnectBtn
                  Icon={FaGithub}
                  link={'https://github.com/zinmori'}
                />
                <ConnectBtn
                  Icon={FaLinkedin}
                  link={'https://www.linkedin.com/in/kokou-ezechiel-agban/'}
                />
                <ConnectBtn
                  Icon={FaWhatsapp}
                  link={'https://wa.me/22891355986'}
                />
              </div>
              <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                Follow my journey and connect with me on social media. I love
                sharing insights about technology and development.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
