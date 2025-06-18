const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Travistry</h3>
            <p className="text-gray-400">
              Share your travel experiences and discover amazing destinations around the world.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Articles</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Destinations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="text-gray-400 not-italic">
              <p>123 Travel Street</p>
              <p>Adventure City, AC 12345</p>
              <p className="mt-2">Email: info@travistry.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Travistry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer