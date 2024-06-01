import { useState } from 'react';
import { motion } from 'framer-motion';
import Tab from '../components/Tab';

import Project from '../components/Project';
import gplayImg from '../assets/images/gplay.png';
import co2Img from '../assets/images/co2Afr.png';
import creditCardImg from '../assets/images/creditCard.jpg';
import spsImg from '../assets/images/sps.png';
import foodImg from '../assets/images/food.png';
import termImg from '../assets/images/term.png';
import mealsImg from '../assets/images/Meals.png';
import spsmob from '../assets/images/spsmob.png';
import muzikImg from '../assets/images/muzik.png';

const projectsData = [
  {
    imgUrl: gplayImg,
    title: 'Analysis of the Android Market on Play Store',
    projectCodeLink:
      'https://app.datacamp.com/workspace/w/e7057801-47eb-4ca8-b549-916dd6740ae3/edit',
    tag: ['All', 'Data'],
  },
  {
    imgUrl: co2Img,
    title: 'Analysis of the CO2 Emission in Africa',
    projectCodeLink:
      'https://app.datacamp.com/workspace/w/3fa278e9-7c61-4134-a1c9-c3604a9b87f0/edit',
    tag: ['All', 'Data'],
  },
  {
    imgUrl: creditCardImg,
    title: 'Predicting Credit Card Approvals',
    projectCodeLink:
      'https://app.datacamp.com/workspace/w/d42d9ccb-b97d-4fcb-a802-556f23ab3959/edit',
    tag: ['All', 'Data'],
  },
  {
    imgUrl: spsImg,
    title: 'Blood bank management web application',
    projectLink: 'https://sps-z.vercel.app',
    projectCodeLink: 'https://github.com/zinmori/sps_web',
    tag: ['All', 'Web'],
  },
  {
    imgUrl: foodImg,
    title: 'Food delivery web application',
    projectLink: 'https://zfood-beige.vercel.app/',
    projectCodeLink: 'https://github.com/zinmori/zfood',
    tag: ['All', 'Web'],
  },
  {
    imgUrl: termImg,
    title: 'A terminal based portfolio',
    projectLink: 'https://bigz.vercel.app',
    projectCodeLink: 'https://github.com/zinmori/terminal-portfolio',
    tag: ['All', 'Web'],
  },
  {
    imgUrl: mealsImg,
    title: 'Meal discovery mobile application',
    projectCodeLink: 'https://github.com/zinmori/meals',
    tag: ['All', 'Mobile'],
  },
  {
    imgUrl: spsmob,
    title: 'Blood donation mobile application',
    projectCodeLink: 'https://github.com/zinmori/sps_mobile',
    tag: ['All', 'Mobile'],
  },
  {
    imgUrl: muzikImg,
    title: 'A music player mobile application',
    projectCodeLink: 'https://github.com/zinmori/muzic',
    tag: ['All', 'Mobile'],
  },
];

export default function Projects() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  function filterProjects(tag) {
    setSelectedTab(tag);
    setFilteredProjects(
      projectsData.filter((project) => project.tag.includes(tag)),
    );
  }

  return (
    <div
      id="projects"
      className="flex flex-col bg-slate-950 text-white items-center justify-center"
    >
      <h1 className="text-3xl md:text-4xl font-extralight py-4 my-8">
        My Projects
      </h1>
      <div className="flex flex-wrap gap-2 justify-center items-center w-[95%] p-4 rounded-lg">
        <Tab
          caption="All"
          onSelect={() => filterProjects('All')}
          isSelected={selectedTab === 'All'}
        />
        <Tab
          caption="Data Science"
          onSelect={() => filterProjects('Data')}
          isSelected={selectedTab === 'Data'}
        />
        <Tab
          caption="Web"
          onSelect={() => filterProjects('Web')}
          isSelected={selectedTab === 'Web'}
        />
        <Tab
          caption="Mobile"
          onSelect={() => filterProjects('Mobile')}
          isSelected={selectedTab === 'Mobile'}
        />
      </div>
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
        className="flex flex-wrap justify-between items-center w-[95%] p-4 rounded-lg"
      >
        {filteredProjects.map((project) => (
          <Project
            key={project.title}
            imageUrl={project.imgUrl}
            title={project.title}
            projectLink={project.projectLink}
            projectCodeLink={project.projectCodeLink}
          />
        ))}
      </motion.div>
    </div>
  );
}
