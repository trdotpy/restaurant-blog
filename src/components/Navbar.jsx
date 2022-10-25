import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Client } from '../api/Client'

export default function Navbar() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    Client.fetch(
      `*[_type == "category"] {
        title,
      } | order(publishedAt desc)`
    )
      .then((data) => {
        setCategories(data)
      })
      .catch(console.error)
  }, [])

  return (
    <>
      <nav className="h-14 border-b border-[#f3f3f3] bg-[#070707]">
        <div className="max-w-screen mx-auto flex h-16 items-center justify-between sm:px-6 lg:px-8">
          <div className="flex flex-1 cursor-pointer items-center justify-end space-x-4">
            <div className="flex flex-1 items-center justify-between">
              <nav className="lg:font-lg hidden lg:flex lg:gap-4 lg:text-xs lg:uppercase lg:tracking-wide lg:text-white">
                <Link to="/">
                  <p className="block h-16 font-semibold leading-[4rem] hover:text-[#DF2935]">
                    Home
                  </p>
                </Link>

                <Link to="/about">
                  <p className="block h-16 font-semibold leading-[4rem] hover:text-[#DF2935]">
                    About
                  </p>
                </Link>

                <Link to="/contact">
                  <p className="block h-16 font-semibold leading-[4rem] hover:text-[#DF2935]">
                    Contact
                  </p>
                </Link>
              </nav>

              {/* Logo */}
              <div className="flex items-center">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/drij60fru/image/upload/v1666236915/logo-white_pkxysm.png"
                    alt="tableLogo"
                    height={50}
                    width={50}
                  />
                </Link>
              </div>

              <div className="ml-8 flex items-center">
                <div className="flex items-center border-gray-100">
                  <span className="hidden sm:block">
                    <Link
                      to="/create"
                      className="p-6 text-white hover:text-[#DF2935]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>
                  </span>

                  <span className="hidden sm:block">
                    <Link
                      to="/account"
                      className="block p-6 text-white hover:text-[#DF2935]"
                    >
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </Link>
                  </span>

                  <span className="hidden sm:block">
                    <Link
                      to="/login"
                      className="p-6 text-white hover:text-[#DF2935]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                        />
                      </svg>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Categories */}
      <header className="border-b bg-[#070707] p-2">
        <div className="container mx-auto flex h-4 justify-center md:space-x-8">
          <div className="flex text-sm text-white">
            <span className="flex gap-6">
              {categories.map((category) => (
                <span className="cursor-pointer hover:text-[#A51C30]">
                  {category.title}
                </span>
              ))}
            </span>
          </div>
        </div>
      </header>
    </>
  )
}
