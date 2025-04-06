import React, { useState } from 'react';
import { Menu, Search, Bell, Upload, User, Mic } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { simpleFetch } from '@/backend/simpleFetch';
import api from '@/backend/api';
import { useDispatch } from 'react-redux';
import { addResult } from '@/store/searchSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ page , setPage] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async(e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Implement your search functionality here

    const searchResult = await simpleFetch({
      url : `${api.searchVideo}`,
      method : "POST",
      data : {
        query : searchTerm,
        limit : 5,
        page : page,
        sortBy : "createdAt",
        shortType : "desc",
      }
    })

    dispatch(addResult({
      result : searchResult.data
    }))
    console.log(searchResult.data)
    navigate("/searchResult")
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-10 shadow-md w-full  ">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <SidebarTrigger></SidebarTrigger>
          {/* Left Section - Logo and Menu */}
          <div className="flex items-center">
            <button 
              className="p-2 rounded-full hover:bg-gray-800 mr-2 text-gray-300"
              onClick={toggleMobileMenu}
            >
              {/* <Menu size={24} /> */}
            </button>
            <div className="flex items-center">
              <div className="text-red-500 font-bold text-xl">
                YourTube
              </div>
            </div>
          </div>

          {/* Middle Section - Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearchSubmit} className="flex w-full">
              <div className="flex flex-1 border border-gray-700 rounded-l-full overflow-hidden">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 outline-none bg-gray-800 text-white placeholder-gray-400"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <button 
                type="submit" 
                className="bg-gray-700 px-4 py-2 border border-l-0 border-gray-700 rounded-r-full hover:bg-gray-600"
              >
                <Search size={20} className="text-gray-300" />
              </button>
              {/* <button 
                type="button" 
                className="p-2 ml-2 bg-gray-800 rounded-full hover:bg-gray-700 text-gray-300"
              >
                <Mic size={20} />
              </button> */}
            </form>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center">
            <button className="md:hidden p-2 rounded-full hover:bg-gray-800 text-gray-300">
              <Search size={24} />
            </button>
            <button className="md:hidden p-2 rounded-full hover:bg-gray-800 text-gray-300">
              <Mic size={24} />
            </button>
            <button onClick={() => navigate("/uploadVideo")} className="hidden md:block p-2 rounded-full hover:bg-gray-800 text-gray-300">
              <Upload size={24} />
            </button>
            {/* <button className="hidden md:block p-2 rounded-full hover:bg-gray-800 text-gray-300">
              <Bell size={24} />
            </button> */}
            <button onClick={() => navigate("/profile")} className="p-2 rounded-full hover:bg-gray-800 text-gray-300">
              <User size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search (Hidden on larger screens) */}
        <div className="md:hidden py-2">
          <form onSubmit={handleSearchSubmit} className="flex w-full">
            <div className="flex flex-1 border border-gray-700 rounded-l-full overflow-hidden">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 outline-none bg-gray-800 text-white placeholder-gray-400"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <button 
              type="submit" 
              className="bg-gray-700 px-4 py-2 border border-l-0 border-gray-700 rounded-r-full hover:bg-gray-600"
            >
              <Search size={20} className="text-gray-300" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;