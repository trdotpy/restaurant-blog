import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { Client } from '../api/Client'
import { format } from 'date-fns'
import Navbar from '../components/Navbar'

export default function Homepage() {
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
        setStories(data.slice(0, 6))
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    document.title = 'TABLE - Restaurant Blog'
  }, [])

  return (
    <>
      <Navbar />
      {!stories ? (
        <h2>LOADING</h2>
      ) : (
        <>
          {stories[0] && (
            <section className="mx-auto my-12 max-w-7xl px-5">
              <article className="relative">
                {stories[0].mainImage && (
                  <img
                    src={stories[0].mainImage.asset.url}
                    alt={stories[0].mainImage.alt}
                    className="h-96 w-full rounded-lg object-cover"
                  />
                )}

                <div className="absolute bottom-8 left-8">
                  <div>
                    <Link to={`/blog/${stories[0].slug.current}`}>
                      <h1 className="mb-6 text-4xl font-semibold capitalize tracking-wide text-white text-shadow-xl hover:underline lg:text-5xl">
                        {stories[0].title}
                      </h1>
                    </Link>
                  </div>

                  <p className="mb-8 font-semibold text-white text-shadow-xl md:w-1/2">
                    {`${stories[0].body[0].children[0].text.substring(
                      0,
                      200
                    )}...`}
                  </p>
                  <Link
                    to={`/blog/${stories[0].slug.current}`}
                    className="text-md rounded bg-[#A51C30] py-2 px-8 text-white shadow transition-all duration-300 hover:opacity-90"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            </section>
          )}
        </>
      )}
      <div className="mb-8 space-y-2 text-center">
        <h2 className="py-2 text-3xl font-semibold uppercase leading-4 text-[#f3f3f3]">
          Latest Posts
        </h2>
      </div>

      {/* Cards */}
      <section className="mx-auto mb-10 grid max-w-7xl grid-cols-1 gap-8 px-5 md:grid-cols-2 lg:grid-cols-3 ">
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
              <Link to={`/blog/${story.slug.current}`} key={story.slug.current}>
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

      <div className="mx-auto mb-20 flex max-w-7xl items-end justify-center px-5">
        <Link
          to="/blog"
          className="rounded bg-[#A51C30] py-2 px-8 tracking-wide text-[#E8E9EB] transition-all duration-100 hover:opacity-75"
        >
          Read More
        </Link>
      </div>

      <Footer />
    </>
  )
}
