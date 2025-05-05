import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./index.css";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import Navbar from "./components/Navbar";
import AnimatedBackground from "./components/Background";
import { AnimatePresence } from "framer-motion";
import Hotelcasestudy from "./components/Hotelcasestudy";
import Motorcasestudy from "./components/Motorcasestudy";
import Proposalcasestudy from "./components/Poroposalcasestudy";
import { Calculate } from "@mui/icons-material";
import Calculator from "./components/Calculator";

// Layout for all normal pages
const PageLayout = ({ children }) => (
  <>
    <Navbar />
    <AnimatedBackground />
    {children}
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            EkiZR™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <Routes>
          <Route
            path="/"
            element={
              <PageLayout>
                <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <ContactPage />
          {/* <footer>
            <center>
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
              <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                © 2025{" "}
                <a href="https://flowbite.com/" className="hover:underline">
                  EkiZR™
                </a>
                . All Rights Reserved.
              </span>
            </center>
          </footer> */}
              </PageLayout>
            }
          />
          <Route
            path="/PointExpert"
            element={
              <PageLayout>
                <ProjectDetails/>
              </PageLayout>
            }
          />
           <Route
            path="/Hotelcasestudy"
            element={
              <PageLayout>
               <Hotelcasestudy/>
              </PageLayout>
            }
          />
          <Route
            path="/Motorcasestudy"
            element={
              <PageLayout>
                <Motorcasestudy />
              </PageLayout>
            }
          />
          <Route
            path="/Proposal"
            element={
              <PageLayout>
                <Proposalcasestudy />
              </PageLayout>
            }
          />
           <Route
            path="/Calculator"
            element={
              <PageLayout>
               <Calculator />
              </PageLayout>
            }
          />
          {/*<Route
            path="/project/:id"
            element={
              <>
                <ProjectDetails />
                <footer>
                  <center>
                    <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
                    <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                      © 2025{" "}
                      <a href="https://flowbite.com/" className="hover:underline">
                        EkiZR™
                      </a>
                      . All Rights Reserved.
                    </span>
                  </center>
                </footer>
              </>
            }
          /> */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
