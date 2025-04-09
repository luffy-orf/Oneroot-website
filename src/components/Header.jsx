import { Link } from 'react-router-dom'
import { FaGooglePlay, FaLeaf } from 'react-icons/fa'

function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm backdrop-blur-md bg-white/90">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="mr-2 bg-gradient-to-br from-primary to-green-500 text-white h-9 w-9 rounded-lg flex items-center justify-center shadow-sm">
            <FaLeaf className="text-lg" />
          </div>
          <h1 className="text-xl font-bold">
            OneRoot<span className="text-primary">.</span><span className="text-green-500">farm</span>
          </h1>
        </Link>
        
        <a 
          href="https://play.google.com/store/apps/details?id=com.adityasinghop.OneRoot&hl=en_IN"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-black text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors duration-200 shadow-sm hover:shadow-md active:scale-95 transform transition-transform"
        >
          <FaGooglePlay className="mr-2" />
          <span>Download App</span>
        </a>
      </div>
    </header>
  )
}

export default Header