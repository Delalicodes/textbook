// Footer.tsx
import Link from 'next/link';
import { 
  FaBook, FaGithub, FaTwitter, FaDiscord,
  FaEnvelope, FaArrowRight
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaBook className="text-2xl text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Class 6 Maths</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Interactive mathematics learning platform designed for Class 6 students.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              {['Chapters', 'Practice', 'Resources', 'Help'].map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-gray-600 hover:text-purple-600 flex items-center group"
                  >
                    <FaArrowRight className="mr-2 h-3 w-3 transition-transform duration-200 
                                           group-hover:translate-x-1" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
            <div className="space-y-2">
              <a 
                href="mailto:support@mathsbook.com"
                className="text-sm text-gray-600 hover:text-purple-600 flex items-center group"
              >
                <FaEnvelope className="mr-2 h-4 w-4" />
                support@mathsbook.com
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: FaTwitter, href: '#' },
                { icon: FaGithub, href: '#' },
                { icon: FaDiscord, href: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center
                           text-gray-600 hover:bg-purple-100 hover:text-purple-600
                           transition-all duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Class 6 Mathematics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}