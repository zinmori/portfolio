import Certificate from '../components/Certificate';
import dataImg from '../assets/images/data.png';
import flutterImg from '../assets/images/fluttercertificate.jpg';
import reactImg from '../assets/images/react.png';
import nodeImg from '../assets/images/node.png';
import mlImg from '../assets/images/ml.png';
import advmlImg from '../assets/images/advml.png';

const certificatesData = [
  {
    image: dataImg,
    title: 'Associate Data Scientist',
    institution: 'DataCamp',
    date: 'September 2023',
    link: 'https://www.datacamp.com/certificate/DSA0019605927685',
  },
  {
    image: mlImg,
    title: 'Supervised Machine Learning',
    institution: 'Coursera',
    date: 'April 2024',
    link: 'https://coursera.org/verify/SF24JFHH5H5Q',
  },
  {
    image: advmlImg,
    title: 'Advanded Learning Algorithms',
    institution: 'Coursera',
    date: 'May 2024',
    link: 'https://coursera.org/verify/PNK3EEPQSR4S',
  },
  {
    image: flutterImg,
    title: 'Flutter et Dart',
    institution: 'Udemy',
    date: 'October 2023',
    link: 'https://www.udemy.com/certificate/UC-18077573-e617-42d6-8b7a-8f2d8d70a0cf/',
  },
  {
    image: reactImg,
    title: 'React JS',
    institution: 'OpenClassrooms',
    date: 'September 2023',
    link: 'https://openclassrooms.com/fr/course-certificates/8609343030',
  },
  {
    image: nodeImg,
    title: 'Node JS/Express',
    institution: 'OpenClassrooms',
    date: 'October 2023',
    link: 'https://openclassrooms.com/fr/course-certificates/4249712619',
  },
];

const Certifications = () => {
  return (
    <div
      id="certifications"
      className="flex flex-col bg-slate-950  text-white items-center justify-center pt-8"
    >
      <h1 className="text-2xl font-extrabold py-4 my-41">My Certifications</h1>
      <div className="bg-slate-900 rounded-lg w-[90%] p-4 flex flex-col gap-4">
        {certificatesData.map((certificate) => (
          <Certificate
            key={certificate.title}
            image={certificate.image}
            title={certificate.title}
            institution={certificate.institution}
            date={certificate.date}
            link={certificate.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Certifications;
