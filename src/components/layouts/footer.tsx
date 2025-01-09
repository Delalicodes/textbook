// Footer.tsx
import Link from 'next/link';
import { 
  FaBook, FaGamepad, FaRocket, FaStar,
  FaDiscord, FaYoutube, FaInstagram,
  FaHeart, FaPuzzlePiece, FaTrophy
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 pt-12 pb-6 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 left-1/4 w-12 h-12 bg-purple-200 rounded-full animate-bounce" 
             style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute top-12 right-1/3 w-8 h-8 bg-pink-200 rounded-full animate-bounce" 
             style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-8 left-1/3 w-10 h-10 bg-indigo-200 rounded-full animate-bounce" 
             style={{ animationDelay: '0.8s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Fun Stuff Section */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow-md transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                  <FaRocket className="text-2xl text-white animate-pulse" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 
                             bg-clip-text text-transparent">Math Adventure</h3>
              </div>
              <p className="mt-2 text-gray-600">
                Making math awesome! 🚀✨🎮
              </p>
            </div>
          </div>

          {/* Cool Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaPuzzlePiece className="text-purple-500" />
              Cool Stuff
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Games', icon: FaGamepad, color: 'from-green-400 to-emerald-500' },
                { label: 'Rewards', icon: FaTrophy, color: 'from-yellow-400 to-orange-500' },
                { label: 'Practice', icon: FaStar, color: 'from-purple-400 to-pink-500' }
              ].map((item, index) => (
                <Link
                  key={index}
                  href={`/${item.label.toLowerCase()}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full
                           shadow-sm hover:shadow-md transition-all duration-300
                           hover:-translate-y-1 group"
                >
                  <div className={`bg-gradient-to-r ${item.color} p-1.5 rounded-full`}>
                    <item.icon className="text-sm text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Social Fun */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Join the Fun!</h3>
            <div className="flex gap-3">
              {[
                { icon: FaDiscord, color: 'from-indigo-500 to-blue-500', label: 'Discord' },
                { icon: FaYoutube, color: 'from-red-500 to-pink-500', label: 'YouTube' },
                { icon: FaInstagram, color: 'from-purple-500 to-pink-500', label: 'Instagram' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  className="group relative"
                >
                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-r ${social.color}
                                p-3 transform hover:-translate-y-2 transition-all duration-300
                                hover:shadow-lg`}>
                    <social.icon className="text-white w-full h-full" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Stay Updated!</h3>
            <div className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <input 
                type="email" 
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none
                         focus:border-purple-400 transition-colors duration-300"
              />
              <button className="mt-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 
                               text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity
                               duration-300 font-medium">
                Join the Adventure!
              </button>
            </div>
          </div>
        </div>

        {/* Fun Footer */}
        <div className="mt-12 pt-8 border-t border-purple-100">
          <p className="text-center flex items-center justify-center gap-2 text-gray-600">
            Made with <FaHeart className="text-pink-500 animate-bounce" /> for awesome kids!
            <span className="hidden md:inline">•</span>
            <span>© {new Date().getFullYear()} Math Adventure</span>
          </p>
        </div>
      </div>
    </footer>
  );
}