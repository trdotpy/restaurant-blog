import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Client } from '../api/Client'
import { format } from 'date-fns'
import Navbar from '../components/Navbar'

export default function Blog() {
  const [stories, setStories] = useState([])

  useEffect(() => {
    // GROQ Query
    Client.fetch(
      `*[_type == "post"] {
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
      } | order(publishedAt desc)`
    )
      .then((data) => {
        setStories(data)
      })
      .catch(console.error)
  }, [])

  return (
    <>
      <Navbar />
      <div className="p-10">
        <section className="mx-auto mb-10 grid max-w-7xl grid-cols-1 gap-8 px-5 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article className="overflow-hidden border border-[#101010] shadow-xl">
              {story.mainImage && (
                <img
                  src={story.mainImage.asset.url}
                  alt={story.mainImage.alt}
                  loading="lazy"
                  className="w-full object-cover md:h-64"
                />
              )}

              <div className="p-4">
                <p className="text-sm font-semibold text-gray-400">
                  {story.name} &middot;{' '}
                  {format(new Date(story.publishedAt), 'dd MMM')}
                </p>
                <Link
                  to={`/blog/${story.slug.current}`}
                  key={story.slug.current}
                >
                  <h2 className="my-2 text-xl font-bold leading-tight tracking-tight text-white hover:underline">
                    {story.title}
                  </h2>
                </Link>
                <p className="text-sm leading-relaxed text-white">
                  {`${story.body[0].children[0].text.substring(0, 200)}...`}
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </>
  )
}
