import Link from 'next/link';
import { 
  FaHome, 
  FaBook, 
  FaPencilAlt, 
  FaQuestionCircle,
  FaCalculator,
  FaChalkboardTeacher,
  FaPuzzlePiece,
  FaTrophy
} from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
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

  return (
    <aside 
      className={`
        fixed md:static inset-y-0 left-0 
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-white shadow-lg z-40 pt-16 md:pt-0
      `}
    >
      <nav className="h-full overflow-y-auto">
        <ul className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Chapter Quick Links */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-3 px-4">Quick Access</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/chapters/numbers"
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
              >
                Numbers
              </Link>
            </li>
            <li>
              <Link
                href="/chapters/algebra"
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
              >
                Basic Algebra
              </Link>
            </li>
            <li>
              <Link
                href="/chapters/geometry"
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
              >
                Geometry
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}