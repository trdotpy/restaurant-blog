import React, { useState, useEffect } from 'react'
import { Client } from '../api/Client'
import { Link, useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'

export default function BlogPost() {
  const [blogpost, setBlogpost] = useState([])
  const { slug } = useParams()

  useEffect(() => {
    Client.fetch(
      `*[slug.current == "${slug}"] {
        title,
        slug,
        body,
        publishedAt,
        mainImage {
          asset -> {
            _id,
            url
          },
          alt,
        },
        "name": author -> name,
      }`
    )
      .then((data) => {
        setBlogpost(data[0])
      })
      .catch(console.error)
  }, [slug])

  useEffect(() => {
    document.title = `Reading | ${blogpost.title}`
  }, [blogpost.title])

  return (
    <>
      <div className="mx-auto bg-[#070707] p-5 text-[#F3F3F3] sm:p-10 md:p-16">
        <div className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded">
          {blogpost.mainImage && (
            <img
              src={blogpost.mainImage.asset.url}
              alt={blogpost.mainImage.alt}
              className="h-60 w-full dark:bg-gray-500 sm:h-96"
            />
          )}
          <div className="m-4 mx-auto -mt-12 space-y-6 bg-[#070707] p-6 pb-12 shadow-xl sm:mx-24 sm:px-10 lg:max-w-4xl lg:rounded-md">
            <div className="space-y-2">
              <Link to="/" className="inline-block sm:text-3xl">
                <p className="text-5xl font-bold">{blogpost.title}</p>
              </Link>

              <Link href="/" className=" text-gray-400 hover:underline">
                <p className="text-sm">{blogpost.name}</p>
              </Link>
            </div>

            <div className="text-gray-100">
              <PortableText value={blogpost.body} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
