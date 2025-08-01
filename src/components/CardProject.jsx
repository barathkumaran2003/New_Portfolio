import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = () => {
  

  return (
    <>
    <div className="group relative w-full">
            
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          
              <div className="relative p-5 z-10">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="/Point expert 1.png"
                    alt="aa"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="mt-4 space-y-3">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
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
          
    </>
    
  );
};

export default CardProject;