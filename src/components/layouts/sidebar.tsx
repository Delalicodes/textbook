// Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHome, FaBook, FaPencilAlt, FaQuestionCircle,
  FaCalculator, FaChalkboardTeacher, FaPuzzlePiece, FaTrophy
} from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const menuItems = [
  { icon: FaHome, label: 'Home', href: '/' },
  { icon: FaBook, label: 'Chapters', href: '/chapters' },
  { icon: FaPencilAlt, label: 'Practice', href: '/practice' },
  { icon: FaCalculator, label: 'Calculator', href: '/calculator' },
  { icon: FaChalkboardTeacher, label: 'Tutorials', href: '/tutorials' },
  { icon: FaPuzzlePiece, label: 'Games', href: '/games' },
  { icon: FaTrophy, label: 'Progress', href: '/progress' },
  { icon: FaQuestionCircle, label: 'Help', href: '/help' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed top-0 left-0 h-screen
        w-64 bg-white/80 backdrop-blur-md
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-all duration-300 ease-in-out
        border-r border-gray-100 shadow-lg z-40
        flex flex-col
      `}>
        {/* Add a top padding to account for header height */}
        <div className="h-16"></div>
        
        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
          <ul className="p-4 space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-xl
                      transition-all duration-200 group
                      ${isActive 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'hover:bg-gray-50 text-gray-700 hover:text-purple-600'
                      }
                    `}
                  >
                    <Icon className={`text-lg transition-transform group-hover:scale-110 ${isActive ? 'text-purple-600' : ''}`} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Quick Access */}
          <div className="p-4 mt-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-3 px-2">Quick Access</h3>
              <ul className="space-y-1">
                {['Numbers', 'Basic Algebra', 'Geometry'].map((topic, index) => (
                  <li key={index}>
                    <Link
                      href={`/chapters/${topic.toLowerCase().replace(' ', '-')}`}
                      className="block px-3 py-2 text-sm text-gray-600 hover:bg-white 
                               hover:text-purple-600 rounded-lg transition-all duration-200"
                    >
                      {topic}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}