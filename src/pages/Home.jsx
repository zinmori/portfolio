import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Loader from '../components/Loader';
import Sky from '../models/Sky';
import { OrbitControls } from '@react-three/drei';
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  return (
    <section id="home" className="w-full h-screen relative">
      <div>
        <img
          src="https://avatars.githubusercontent.com/u/52946467?v=4"
          alt="My Image"
          className="w-60 h-60 lg:w-96 lg:h-96 rounded-full object-cover absolute top-[40%] right-0 left-0 lg:left-auto lg:top-36 lg:right-36 mx-auto"
        />
      </div>
      <div>
        <h1 className="text-white mb-4 text-4xl lg:w-1/2 md:text-6xl font-extrabold absolute top-28 lg:top-52 bg-transparent right-0 left-0 p-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Hello, I'm{' '}
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
      </div>
      <div className="flex justify-center space-x-4 absolute bottom-10 left-0 right-0 lg:bottom-40 lg:left-4 lg:right-auto">
        <button className="bg-gradient-to-br from-purple-500 to-blue-500 hover:to-black text-white font-bold py-4 px-4 rounded-full">
          <a href="#contact">Contact Me</a>
        </button>
        <button className="bg-transparent ring-2 text-white hover:bg-blue-900 px-4 py-2 font-bold rounded-full">
          Download CV
        </button>
      </div>
      <Canvas className="w-full h-full -z-10 fixed top-0">
        <Suspense fallback={<Loader />}>
          <OrbitControls enableZoom={false} />
          <Sky />
        </Suspense>
      </Canvas>
    </section>
  );
}
