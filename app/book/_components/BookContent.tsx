'use client';

import { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Page, Cover } from './Page';
import Image from 'next/image';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaBootstrap,
  FaHtml5,
  FaJava,
  FaRobot,
  FaGamepad,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFlutter,
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiPandas,
  SiScikitlearn,
  SiPytorch,
  SiTensorflow,
  SiQgis,
  SiDocker,
  SiPostman,
  SiFigma,
  SiAmazonwebservices,
  SiJupyter,
  SiVercel,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
}

interface Experience {
  _id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  location?: string;
}

interface Education {
  _id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
}

interface Certificate {
  _id: string;
  title: string;
  institution: string;
  date: string;
  link?: string;
  image?: string;
}

interface BookContentProps {
  projects: Project[];
  experiences: Experience[];
  educations: Education[];
  certificates: Certificate[];
}

const skillsData = [
  {
    name: 'Data Science & AI',
    skills: [
      { name: 'Pandas, Numpy', icon: SiPandas },
      { name: 'Scikit-learn', icon: SiScikitlearn },
      { name: 'Pytorch', icon: SiPytorch },
      { name: 'Tensorflow', icon: SiTensorflow },
      { name: 'AutoGluon', icon: FaRobot },
      { name: 'GIS, Geopandas', icon: SiQgis },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'HTML/CSS/JS', icon: FaHtml5 },
      { name: 'React.js', icon: FaReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Bootstrap', icon: FaBootstrap },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js/Express', icon: FaNodeJs },
      { name: 'Python/Django', icon: FaPython },
      { name: 'Java', icon: FaJava },
      { name: 'RESTful APIs', icon: TbApi },
    ],
  },
  {
    name: 'Database',
    skills: [
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'MySQL', icon: SiMysql },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Firebase', icon: SiFirebase },
    ],
  },
  {
    name: 'Tools & DevOps',
    skills: [
      { name: 'Git/GitHub', icon: SiGit },
      { name: 'Docker', icon: SiDocker },
      { name: 'AWS', icon: SiAmazonwebservices },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Postman', icon: SiPostman },
      { name: 'Figma', icon: SiFigma },
    ],
  },
  {
    name: 'Others',
    skills: [
      { name: 'Flutter/Dart', icon: SiFlutter },
      { name: 'Pygame', icon: FaGamepad },
      { name: 'Jupyter', icon: SiJupyter },
      { name: 'VS Code', icon: VscVscode },
    ],
  },
];

export default function BookContent({
  projects,
  experiences,
  educations,
  certificates,
}: BookContentProps) {
  const bookRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper to format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  // Helper to chunk array
  const chunk = <T,>(arr: T[], size: number): T[][] => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size),
    );
  };

  const projectPages = chunk(projects, 2);
  const certificatePages = chunk(certificates, 2);

  let pageNumber = 1;

  return (
    <div className="relative z-10 h-screen w-full flex items-center justify-center overflow-hidden">
      {/* @ts-ignore - react-pageflip types */}
      <HTMLFlipBook
        key={isMobile ? 'mobile' : 'desktop'}
        width={450}
        height={600}
        size="stretch"
        minWidth={300}
        maxWidth={500}
        minHeight={400}
        maxHeight={700}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="shadow-2xl"
        ref={bookRef}
        usePortrait={isMobile}
        startPage={0}
        drawShadow={true}
        flippingTime={1000}
        useMouseEvents={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        <Cover title="PORTFOLIO" subtitle="The Journey of BigZ" />

        {/* Intro */}
        <Page number={pageNumber++}>
          <div className="prose font-serif text-sm md:text-base">
            <h2 className="font-handwriting text-3xl mb-4 text-gray-800">
              Chapter 1: The Beginning
            </h2>
            <p className="first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-[-4px]">
              It all started with a simple &quot;Hello World&quot;. But for me,
              it wasn&apos;t just text on a screen; it was a portal to a new
              dimension.
            </p>
            <p className="mt-4">
              My name is <span className="font-bold">Ezechiel Agban</span>, also
              known as <span className="font-bold text-red-800">BigZ</span> in
              the digital realm. I am a Data Scientist and Software Engineer,
              weaving logic into art.
            </p>
            <p className="mt-4">
              This book chronicles my projects, my skills, and the certificates
              I&apos;ve gathered along the way. Turn the page to explore my
              story.
            </p>
          </div>
        </Page>

        <Page number={pageNumber++}>
          <div className="h-full flex flex-col justify-center items-center text-center font-serif">
            <h3 className="text-xl font-bold mb-4 italic">
              &quot;Code is poetry written for machines.&quot;
            </h3>
            <div className="w-24 h-0.5 bg-gray-800 mb-6 mx-auto" />
            <p className="text-gray-600 text-sm">
              Here lies the collection of my works, a testament to sleepless
              nights and endless cups of coffee.
            </p>
          </div>
        </Page>

        {/* Interests */}
        <Page number={pageNumber++}>
          <div className="prose font-serif text-sm">
            <h2 className="font-handwriting text-3xl mb-4 text-gray-800">
              Interests
            </h2>
            <p className="mb-4">
              When I&apos;m not coding, you can find me exploring these worlds:
            </p>
            <ul className="list-none pl-0 space-y-2">
              {[
                "Rubik's Cube",
                'Chess',
                'Reading',
                'Drawing',
                'Manga',
                'Sleeping',
              ].map((interest) => (
                <li key={interest} className="flex items-center gap-2">
                  <span className="text-red-800">❧</span>
                  <span className="font-bold text-gray-700">{interest}</span>
                </li>
              ))}
            </ul>
          </div>
        </Page>

        {/* Education */}
        <Page number={pageNumber++}>
          <div className="prose font-serif">
            <h2 className="font-handwriting text-3xl mb-4 text-gray-800">
              Chapter 2: Education
            </h2>

            {educations.map((edu) => (
              <div key={edu._id} className="mb-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-base">{edu.institution}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="text-sm italic text-gray-700">{edu.degree}</div>
                <div className="text-xs text-gray-600">{edu.fieldOfStudy}</div>
              </div>
            ))}
          </div>
        </Page>

        <Page number={pageNumber++}>
          <div className="h-full flex items-center justify-center">
            <div className="text-center font-handwriting text-2xl text-gray-500 rotate-[-5deg] px-4">
              &quot;Jack of all trades, master of none, though oftentimes better
              than master of one.&quot;
            </div>
          </div>
        </Page>

        {/* Skills */}
        <Page number={pageNumber++}>
          <div className="prose font-serif text-sm">
            <h2 className="font-handwriting text-3xl mb-4 text-gray-800">
              Chapter 3: Skills
            </h2>
            <div className="space-y-4">
              {skillsData.slice(0, 3).map((category) => (
                <div key={category.name}>
                  <h3 className="font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200"
                      >
                        <skill.icon className="text-gray-600" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Page>

        <Page number={pageNumber++}>
          <div className="prose font-serif text-sm pt-8">
            <div className="space-y-4">
              {skillsData.slice(3).map((category) => (
                <div key={category.name}>
                  <h3 className="font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200"
                      >
                        <skill.icon className="text-gray-600" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Page>

        {/* Experience */}
        <Page number={pageNumber++}>
          <div className="prose font-serif">
            <h2 className="font-handwriting text-3xl mb-4 text-gray-800">
              Chapter 4: Experience
            </h2>
            <p className="text-sm italic mb-6">The path I&apos;ve walked...</p>

            {experiences.slice(0, 2).map((exp) => (
              <div
                key={exp._id}
                className="mb-6 border-l-2 border-gray-300 pl-4"
              >
                <h3 className="font-bold text-lg">{exp.position}</h3>
                <div className="text-sm font-bold text-gray-700">
                  {exp.company}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {formatDate(exp.startDate)} -{' '}
                  {exp.current
                    ? 'Present'
                    : exp.endDate
                    ? formatDate(exp.endDate)
                    : ''}
                </div>
                <p className="text-xs line-clamp-3">{exp.description}</p>
              </div>
            ))}
          </div>
        </Page>

        <Page number={pageNumber++}>
          <div className="prose font-serif pt-8">
            {experiences.slice(2, 5).map((exp) => (
              <div
                key={exp._id}
                className="mb-6 border-l-2 border-gray-300 pl-4"
              >
                <h3 className="font-bold text-lg">{exp.position}</h3>
                <div className="text-sm font-bold text-gray-700">
                  {exp.company}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {formatDate(exp.startDate)} -{' '}
                  {exp.current
                    ? 'Present'
                    : exp.endDate
                    ? formatDate(exp.endDate)
                    : ''}
                </div>
                <p className="text-xs line-clamp-3">{exp.description}</p>
              </div>
            ))}
            {experiences.length === 0 && (
              <div className="text-center text-gray-500 italic mt-10">
                No experience recorded yet.
              </div>
            )}
          </div>
        </Page>

        {/* Projects */}
        <Page number={pageNumber++}>
          <div className="prose font-serif">
            <h2 className="font-handwriting text-3xl mb-4 text-gray-800">
              Chapter 5: Projects
            </h2>
            <p className="text-sm mb-4">Where ideas come to life.</p>
          </div>
          <div className="h-full flex items-center justify-center">
            <div className="text-center font-handwriting text-2xl text-gray-500 rotate-[-5deg]">
              &quot;Talk is cheap. Show me the code.&quot;
            </div>
          </div>
        </Page>

        {projectPages.map((pageProjects, pageIndex) => (
          <Page key={`proj-page-${pageIndex}`} number={pageNumber++}>
            <div className="flex flex-col gap-6 pt-4">
              {pageProjects.map((project) => (
                <div key={project._id} className="mb-4">
                  <div className="border-2 border-gray-800 p-1 bg-white rotate-1 shadow-md mb-2">
                    {project.image ? (
                      <div className="relative h-32 w-full overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-32 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg font-handwriting">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] bg-gray-200 px-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Page>
        ))}

        {/* Certifications */}
        <Page number={pageNumber++}>
          <div className="prose font-serif">
            <h2 className="font-handwriting text-3xl mb-4 text-gray-800">
              Chapter 6: Certifications
            </h2>
            <p className="text-sm mb-4">Milestones of knowledge.</p>
          </div>
          <div className="h-full flex items-center justify-center">
            <div className="text-center font-handwriting text-2xl text-gray-500 rotate-[3deg]">
              &quot;Proof of work.&quot;
            </div>
          </div>
        </Page>

        {certificatePages.map((pageCerts, pageIndex) => (
          <Page key={`cert-page-${pageIndex}`} number={pageNumber++}>
            <div className="flex flex-col gap-6 pt-4">
              {pageCerts.map((cert) => (
                <div key={cert._id} className="border-b border-gray-300 pb-4">
                  {cert.image && (
                    <div className="relative h-40 w-full overflow-hidden mb-3 border border-gray-200 shadow-sm">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-bold text-base">{cert.title}</h3>
                  <div className="text-sm text-gray-700 italic">
                    {cert.institution}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(cert.date)}
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-800 underline mt-1 block"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Page>
        ))}

        {/* Contact */}
        <Page number={pageNumber++}>
          <div className="prose font-serif">
            <h2 className="font-handwriting text-3xl mb-6 text-gray-800">
              Contact
            </h2>
            <p className="mb-8">
              Ready to start a new chapter? Let&apos;s write it together.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900">Email</h3>
                <a
                  href="mailto:ezechiel9087@gmail.com"
                  className="text-blue-800 underline"
                >
                  ezechiel9087@gmail.com
                </a>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">GitHub</h3>
                <a
                  href="https://github.com/zinmori"
                  target="_blank"
                  className="text-blue-800 underline"
                >
                  github.com/zinmori
                </a>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">LinkedIn</h3>
                <a
                  href="https://linkedin.com/in/kokou-ezechiel-agban"
                  target="_blank"
                  className="text-blue-800 underline"
                >
                  linkedin.com/in/kokou-ezechiel-agban
                </a>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Location</h3>
                <p>Lomé, Togo</p>
              </div>
            </div>
          </div>
        </Page>

        <Page number={pageNumber++}>
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="font-handwriting text-4xl text-gray-800 mb-2">
                Epilogue
              </div>
              <p className="text-sm text-gray-600 italic">
                &quot;The journey continues...&quot;
              </p>
            </div>
          </div>
        </Page>

        <Cover title="THE END" subtitle="Thanks for reading" />
      </HTMLFlipBook>
    </div>
  );
}
