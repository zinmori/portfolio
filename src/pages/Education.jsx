import { motion } from 'framer-motion';

const Education = () => {
  return (
    <div
      id="education"
      className="flex flex-col w-full  text-white items-center justify-center"
    >
      <h1 className="text-3xl md:text-4xl font-extralight py-4 my-8">
        My Education
      </h1>
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
        className="flex flex-col w-[90%] rounded-lg justify-center gap-6 p-6 bg-slate-900"
      >
        <div className=" rounded-lg shadow-lg p-6 w-full">
          <h2 className="text-2xl font-bold mb-2">
            Bachelor in Software Engineering
          </h2>
          <p className="font-semibold">
            Ecole Polytechnique de Lomé - Universite de Lomé
          </p>
          <p className="mb-4">2021 - 2024</p>
        </div>
        <div className="rounded-lg shadow-lg p-6 w-full">
          <h2 className="text-2xl font-bold mb-2">Scientific Baccalaureate</h2>
          <p className="font-semibold">Lycée Scientifique de Lomé</p>
          <p className="mb-4">2018 - 2021</p>
          <p>Specialty: Mathematics and Physics</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Education;
