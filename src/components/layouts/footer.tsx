import { FaBook, FaGithub, FaTwitter, FaYoutube, FaDiscord, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
    return (
      <footer className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 py-12 text-white mt-auto relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FaBook className="text-2xl text-yellow-300" />
                <h3 className="text-lg font-semibold">About</h3>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">
                This interactive mathematics textbook is designed to help Class 6 students
                learn and understand mathematical concepts in an engaging way.
              </p>
              <div className="flex space-x-4 pt-4">
                <a href="#" className="text-white/90 hover:text-yellow-300 transition-colors">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="text-white/90 hover:text-yellow-300 transition-colors">
                  <FaGithub className="text-xl" />
                </a>
                <a href="#" className="text-white/90 hover:text-yellow-300 transition-colors">
                  <FaYoutube className="text-xl" />
                </a>
                <a href="#" className="text-white/90 hover:text-yellow-300 transition-colors">
                  <FaDiscord className="text-xl" />
                </a>
              </div>
            </div>
  
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/chapters" className="flex items-center gap-2 hover:translate-x-2 transition-transform">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-300"></span>
                    All Chapters
                  </a>
                </li>
                <li>
                  <a href="/practice" className="flex items-center gap-2 hover:translate-x-2 transition-transform">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-300"></span>
                    Practice Questions
                  </a>
                </li>
                <li>
                  <a href="/resources" className="flex items-center gap-2 hover:translate-x-2 transition-transform">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-300"></span>
                    Additional Resources
                  </a>
                </li>
                <li>
                  <a href="/help" className="flex items-center gap-2 hover:translate-x-2 transition-transform">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-300"></span>
                    Help & Support
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <FaEnvelope className="text-yellow-300" />
                  <span>support@mathsbook.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaPhone className="text-yellow-300" />
                  <span>+1 234 567 890</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-yellow-300" />
                  <span>123 Education Street</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/90">
            <p>© {new Date().getFullYear()} Class 6 Mathematics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
}