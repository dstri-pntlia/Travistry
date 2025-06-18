import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import type { RootState } from '../store/store'

// Import gambar (pastikan file-file ini ada di direktori assets)
import travelHero from '../assets/travel-hero.avif'
import angkorWat from '../assets/angkor-wat.avif'
import thailandBeach from '../assets/thailand-beach.avif'
import switzerland from '../assets/switzerland.avif'

const HomePage = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  // Data dummy untuk destinasi populer
  const popularDestinations = [
    {
      id: 1,
      title: "Exploring the Temples of Angkor Wat",
      subtitle: "15 articles",
      image: angkorWat
    },
    {
      id: 2,
      title: "Hidden Beaches in Thailand",
      subtitle: "23 articles",
      image: thailandBeach
    },
    {
      id: 3,
      title: "Winter Adventures in Switzerland",
      subtitle: "12 articles",
      image: switzerland
    }
  ]

  // Data dummy untuk aktivitas terkini
  const recentActivities = [
    {
      id: 1,
      action: "You published a new article about Bali",
      time: "2 days ago"
    },
    {
      id: 2,
      action: "You liked an article about Japan",
      time: "5 days ago"
    },
    {
      id: 3,
      action: "You commented on an article about Paris",
      time: "1 week ago"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 pt-16">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center rounded-lg overflow-hidden mb-8 h-96 "
           style={{ backgroundImage: `url(${travelHero})` }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 p-8 md:p-12 lg:p-16 text-white h-full flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Welcome back, {user?.name}!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl mb-6 max-w-2xl"
          >
            Discover amazing travel destinations or share your own adventures with the world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/articles"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Browse Articles
            </Link>
            <Link
              to="/articles/new"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
            >
              Create New Article
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Travel Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700/50 p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Your Travel Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">12</p>
            <p className="text-gray-600 dark:text-gray-300">Articles</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">8</p>
            <p className="text-gray-600 dark:text-gray-300">Countries</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">156</p>
            <p className="text-gray-600 dark:text-gray-300">Likes</p>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">42</p>
            <p className="text-gray-600 dark:text-gray-300">Comments</p>
          </div>
        </div>
      </motion.div>

      {/* Popular Destinations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularDestinations.map((destination) => (
            <motion.div
              key={destination.id}
              whileHover={{ y: -5 }}
            >
              <Link
                to={`/articles/${destination.id}`}
                className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-64 block"
              >
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold group-hover:underline">{destination.title}</h3>
                  <p className="text-sm">{destination.subtitle}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activities and Inspirational Quote */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700/50 p-6 lg:col-span-2"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="border-b dark:border-gray-700 pb-4">
                <p className="text-gray-600 dark:text-gray-300">{activity.action}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="bg-gradient-to-r from-blue-500 to-teal-600 rounded-lg p-8 text-white flex items-center"
        >
          <blockquote>
            <p className="text-xl italic mb-4">
              "Traveling - it leaves you speechless, then turns you into a storyteller."
            </p>
            <footer className="text-blue-100">- Ibn Battuta</footer>
          </blockquote>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Ready to share your next adventure?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Join our community of travel enthusiasts and inspire others with your stories.
        </p>
        <Link
          to="/articles/new"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Start Writing Now
        </Link>
      </motion.div>
    </div>
  )
}

export default HomePage