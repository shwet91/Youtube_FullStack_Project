import React from 'react';
import { Github, Twitter, Instagram, Youtube, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { section: "About", links: ["About Us", "How it works", "Careers", "Blog", "Press"] },
    { section: "Legal", links: ["Terms", "Privacy", "Copyright", "Creators", "Advertise"] },
    { section: "Support", links: ["Help Center", "Safety", "Contact", "Creator Academy", "Community"] },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-8 pb-4">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="text-red-500 font-bold text-xl mb-4">YourTube</div>
            <p className="text-gray-400 mb-4">
              Your favorite video platform clone. Watch, share, and create amazing content.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Link Sections */}
          {footerLinks.map((section) => (
            <div key={section.section} className="col-span-1">
              <h3 className="text-white font-medium mb-4">{section.section}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile View - Collapsed Categories */}
        <div className="md:hidden mb-6">
          <div className="grid grid-cols-2 gap-4">
            {footerLinks.map((section) => (
              <div key={section.section} className="col-span-1">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none text-white font-medium mb-2">
                    {section.section}
                    <span className="transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <ul className="space-y-2 pl-2">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-6 pb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-medium mb-2">Subscribe to our newsletter</h3>
              <p className="text-gray-400 text-sm">Stay updated with our latest features and releases</p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright and bottom links */}
        <div className="border-t border-gray-800 pt-6 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} YourTube. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white">FAQ</a>
              <a href="#" className="hover:text-white">Sitemap</a>
              <a href="#" className="hover:text-white">Cookies</a>
              <a href="#" className="hover:text-white">Language</a>
              <div className="flex items-center">
                <span>Made with</span>
                <Heart size={14} className="mx-1 text-red-500" />
                <span>by YourTeam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;