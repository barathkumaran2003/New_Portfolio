import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "https://img.icons8.com/3d-fluency/375/java-coffee-cup-logo.png", language: "JAVA" },
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "reactjs.svg", language: "React.JS" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "https://img.icons8.com/nolan/512/express-js.png", language: "Express.JS" },
  { icon: "https://img.icons8.com/fluency/240/mysql-logo.png", language: "My SQL" },
  { icon: "mongodb.svg", language: "MongoDB" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "git.svg", language: "GIT" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectCollection = collection(db, "projects");
      const certificateCollection = collection(db, "certificates");

      const [projectSnapshot, certificateSnapshot] = await Promise.all([
        getDocs(projectCollection),
        getDocs(certificateCollection),
      ]);

      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const certificateData = certificateSnapshot.docs.map((doc) => doc.data());

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {/* {displayedProjects.map((project, index) => ( */}
                  <div
                    // key={project.id || index}
                    data-aos={"fade-up" && "fade-up-right"}
                    data-aos-duration={"1000" && "1200" }
                  >
                    <div className="group relative w-full">
            
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          
              <div className="relative p-5 z-10">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="/Point_expert_1.png"
                    alt="aa"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="mt-4 space-y-3" >
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent" style={{marginTop:"28px"}}>
                  Point Expert
                  </h3>
                  
                  <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
                  Developed the frontend of Point.Expert, a user-friendly flight booking platform that simplifies the process of searching and reserving flights.
                  </p>
                  
                  <div className="pt-4 flex items-center justify-between">
                      <a
                      href="https://pointexpert.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        <span className="text-sm font-medium">Live Demo</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                  
                      <Link
                        to="/PointExpert"
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      >
                        <span className="text-sm font-medium">Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                  </div>
                </div>
                
                <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
              </div>
              
            </div>
          </div>
          
                    
                    
                  </div>
                  <div
                    // key={project.id || index}
                    // data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    // data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    data-aos={"fade-up"}
                    data-aos-duration={"1000" && "1200" }
                  >
                    <div className="group relative w-full">
            
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          
              <div className="relative p-5 z-10">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="/photal.png"
                    alt="aa"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="mt-4 space-y-3">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Crown Template                  </h3>
                  
                  <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
                  Crown is a web template that I created targeting the restaurant and food industry which anyone can use to present their business online.                  </p>
                  
                  <div className="pt-4 flex items-center justify-between">
                      <a
                      href="https://github.com/barathkumaran2003/Restaurent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        <span className="text-sm font-medium">Live Demo</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                  
                      <Link
                        to="/Hotelcasestudy"
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      >
                        <span className="text-sm font-medium">Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                  </div>
                </div>
                
                <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
              </div>
              
            </div>
          </div>
          
                    
                    
                  </div>

                  <div
                    // key={project.id || index}
                    // data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    // data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    data-aos={"fade-up" && "fade-up-left"}
                    data-aos-duration={"1000" && "1200" }
                  >
                    <div className="group relative w-full">
            
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          
              <div className="relative p-5 z-10">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="/pmotor.png"
                    alt="aa"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="mt-4 space-y-3">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Wilsonport                 </h3>
                  
                  <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
                  Wilsonport is a multiservice logistics and transport company and I created their website from scratch using the frontend tools I know.                  </p>
                  
                  <div className="pt-4 flex items-center justify-between">
                      <a
                      href="https://barathkumaran2003.github.io/AVT/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        <span className="text-sm font-medium">Live Demo</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                  
                      <Link
                        to="/Motorcasestudy"
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      >
                        <span className="text-sm font-medium">Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                  </div>
                </div>
                
                <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
              </div>
              
            </div>
          </div>
          
                    
                    
                  </div>

                  <div
                    // key={project.id || index}
                    // data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    // data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    data-aos={"fade-up" && "fade-up-right"}
                    data-aos-duration={"1000" && "1200" }
                  >
                    <div className="group relative w-full">
            
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          
              <div className="relative p-5 z-10">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="/port.png"
                    alt="aa"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="mt-4 space-y-3">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Portfolio            </h3>
                  
                  <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
                  Dopefolio is a successful Open-Source project that I created which have been featured on some of the biggest tech sites like CSS-Tricks, Hostinger, etc & used by thousands of developers globally                 </p> 
                  <div className="pt-4 flex items-center justify-between">
                      <a
                      href="https://new-portfolio-9foz.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        <span className="text-sm font-medium">Live Demo</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                  
                      <Link
                        to="/PointExpert"
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      >
                        <span className="text-sm font-medium">Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                  </div>
                </div>
                
                <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
              </div>
              
            </div>
          </div>
          
                    
                    
                  </div>


                  
                  <div
                    // key={project.id || index}
                    // data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    // data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    data-aos={"fade-up"}
                    data-aos-duration={"1000" && "1200" }
                  >
                    <div className="group relative w-full">
            
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          
              <div className="relative p-5 z-10">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="/proposal.png"
                    alt="aa"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="mt-4 space-y-3">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                 Proposal              </h3>
                  
                  <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
                  Proposal is a beautifully crafted React-based website designed to express love and emotions in a creative and engaging way. Whether it's for a special occasion or a heartfelt digital proposal, this project delivers a stunning, interactive experience.                  </p>                  
                  <div className="pt-4 flex items-center justify-between">
                      <a
                      href="https://barathkumaran2003.github.io/Proposal/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        <span className="text-sm font-medium">Live Demo</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                  
                      <Link
                        to="/Proposal"
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      >
                        <span className="text-sm font-medium">Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                  </div>
                </div>
                
                <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
              </div>
              
            </div>
          </div>
          
                    
                    
                  </div>



                  
                  <div
                    // key={project.id || index}
                    // data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    // data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    data-aos={"fade-up" && "fade-up-left"}
                    data-aos-duration={"1000" && "1200" }
                  >
                    <div className="group relative w-full">
            
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          
              <div className="relative p-5 z-10">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="/calculator.png"
                    alt="aa"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="mt-4 space-y-3">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Calculator                </h3>
                  
                  <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
                  Calculator is a simple web-based application built using HTML, CSS, and JavaScript that performs basic arithmetic operations like addition, subtraction, multiplication, and division. It features a clean user interface, responsive design, and real-time calculation updates as users input values. The project demonstrates practical use of DOM manipulation and event handling in JavaScript.   </p>

                  
                  <div className="pt-4 flex items-center justify-between">
                      <a
                      href="https://barathkumaran2003.github.io/Calculator/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        <span className="text-sm font-medium">Live Demo</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                  
                      <Link
                        to="/Calculator"
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      >
                        <span className="text-sm font-medium">Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                  </div>
                </div>
                
                <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
              </div>
              
            </div>
          </div>
          
                    
                    
                  </div>
                {/* ))} */}
              </div>
              
            </div>
            
            
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}