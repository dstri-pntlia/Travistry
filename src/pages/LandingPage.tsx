import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

const LandingPage = () => {
  const { token } = useSelector((state: RootState) => state.auth)

  // Sample data for destinations
  const popularDestinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      rating: 4.9,
      reviews: 1243
    },
    {
      id: 2,
      name: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3",
      rating: 4.8,
      reviews: 892
    },
    {
      id: 3,
      name: "South Korea, Seoul",
      image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989",
      rating: 4.7,
      reviews: 765
    },
    {
      id: 4,
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1431274172761-fca41d930114",
      rating: 4.6,
      reviews: 2104
    }
  ]

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Travel Blogger",
      content: "This platform completely changed how I plan my trips. The community recommendations are spot on!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Frequent Traveler",
      content: "Found hidden gems I would never have discovered otherwise. Worth every penny!",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Adventure Seeker",
      content: "The itinerary planning feature saved me hours of research. Highly recommended!",
      rating: 4
    }
  ]

  return (
    <div className="min-h-screen w-full bg-white">
      {/* 1. Hero Section */}
      <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="relative z-10 text-center max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-6 leading-tight">
            Discover <span className="text-indigo-600">Amazing</span> Travel Destinations
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Share your travel experiences and discover new places with our community of passionate travelers.
          </p>

          {!token ? (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:shadow-lg md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 rounded-md text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 transition-all duration-300 md:py-4 md:text-lg md:px-10"
              >
                Login
              </Link>
            </div>
          ) : (
            <Link
              to="/home"
              className="inline-block px-8 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:shadow-lg md:py-4 md:text-lg md:px-10"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* 2. Value Proposition (Features) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Travistry?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Curated Destinations</h3>
              <p className="text-gray-600">
                Hand-picked locations verified by our community of expert travelers and locals.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Smart Itineraries</h3>
              <p className="text-gray-600">
                AI-powered trip planning that adapts to your preferences and budget.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Travel Community</h3>
              <p className="text-gray-600">
                Connect with like-minded travelers and get real-time recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Popular Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <div key={destination.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{destination.name}</h3>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(destination.rating) ? 'fill-current' : 'stroke-current'}`} viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{destination.rating} ({destination.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/destinations" className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Testimonial Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Travelers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-blue-800 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-300 fill-current' : 'text-gray-400 stroke-current'}`} viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="italic mb-4">"{testimonial.content}"</p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-blue-200 text-sm">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">
                Tell us your travel preferences and interests to personalize your experience.
              </p>
            </div>
            <div className="flex-1 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Explore Destinations</h3>
              <p className="text-gray-600">
                Browse through thousands of destinations with real traveler reviews.
              </p>
            </div>
            <div className="flex-1 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Plan & Book</h3>
              <p className="text-gray-600">
                Create your perfect itinerary and book activities all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of over 100,000 travelers discovering the world together
          </p>
          {!token ? (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3 rounded-lg bg-white text-blue-600 hover:bg-gray-100 font-semibold transition-all duration-300 hover:shadow-lg md:py-4 md:text-lg md:px-10"
              >
                Sign Up Free
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 rounded-lg border-2 border-white text-white hover:bg-blue-700 font-semibold transition-all duration-300 md:py-4 md:text-lg md:px-10"
              >
                Learn More
              </Link>
            </div>
          ) : (
            <Link
              to="/destinations"
              className="inline-block px-8 py-3 rounded-lg bg-white text-blue-600 hover:bg-gray-100 font-semibold transition-all duration-300 hover:shadow-lg md:py-4 md:text-lg md:px-10"
            >
              Browse Destinations
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default LandingPage