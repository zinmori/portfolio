import img from '../assets/images/hero.jpg';

export default function About() {
  return (
    <div
      id="about"
      className="flex flex-col md:flex-row items-center space-x-4 bg-slate-950 pt-8 px-4 gap-10 shadow-md text-white"
    >
      <img
        src={img}
        alt="hero"
        className="w-full md:w-1/2 h-4/5 object-cover rounded-lg"
      />
      <div>
        <h1 className="text-2xl font-bold py-4">About Me</h1>
        <p className="text-justify pr-4">
          Hi, I&apos;m Ezechiel Kokou AGBAN, a junior software developer and
          data science enthusiast. I&apos;m committed to continuous learning,
          exploring the latest technologies to expand my skills. With experience
          in web and mobile development, I&apos;m eager to contribute to
          innovative projects and grow as a developer. Driven by curiosity and a
          passion for problem-solving, I&apos;m excited to take on new
          challenges and make meaningful contributions to the tech industry.
        </p>
      </div>
    </div>
  );
}
