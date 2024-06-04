import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import profilImg from '../assets/images/profil.png';
import ConnectBtn from '../components/ConnectBtn';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export default function Home() {
  return (
    <section id="home" className="w-full h-screen">
      <motion.div
        initial={{ scale: '80%' }}
        animate={{ scale: '100%' }}
        transition={{ duration: 1.5 }}
        className="w-full h-full flex flex-col items-center justify-center"
      >
        <div className="w-full flex flex-col sm:flex-row mt-16 pt-10 justify-between items-center">
          <h1 className="text-white mb-4 text-4xl w-full sm:w-1/2 md:text-5xl lg:text-6xl font-extrabold bg-transparent p-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              Hello, I&apos;m{' '}
            </span>{' '}
            <br></br>
            <TypeAnimation
              sequence={[
                'Ezechiel',
                1000,
                'Web Developer',
                1000,
                'Mobile Developer',
                1000,
                'Data Science enthousiast',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <img
            src={profilImg}
            alt="My Image"
            className="w-60 h-60 lg:w-80 lg:h-80 sm:mr-16 rounded-full border-4 border-purple-950 shadow-xl object-cover"
          />
        </div>
        <div className="flex flex-row mt-4 items-center justify-center gap-4">
          <button className="bg-gradient-to-br from-purple-500 to-blue-500 hover:to-black text-white font-bold py-4 px-4 rounded-full">
            <a href="#contact">Contact Me</a>
          </button>
          <a
            target="_blank"
            href="https://drive.google.com/file/d/1vpHiDSIufdvEL-3cH_sRHJNosIKYTOjJ/view?usp=sharing"
            className="bg-transparent ring-2 text-white hover:bg-blue-900 px-4 py-4 font-bold rounded-full"
          >
            Download CV
          </a>
        </div>
        <div className="flex flex-row mt-4 text-4xl text-blue-900 gap-4 mb-4 items-center justify-center">
          <ConnectBtn Icon={FaGithub} link={'https://github.com/zinmori'} />
          <ConnectBtn Icon={FaWhatsapp} link={'https://wa.me/22891355986'} />
          <ConnectBtn
            Icon={FaLinkedin}
            link={'https://www.linkedin.com/in/kokou-ezechiel-agban/'}
          />
        </div>
      </motion.div>
    </section>
  );
}
