import { FaGooglePlay, FaHeart } from 'react-icons/fa'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 py-8 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2 text-gray-800">
              OneRoot<span className="text-primary">.</span><span className="text-green-500">farm</span>
            </h3>
            <p className="text-sm text-gray-600 max-w-md">
              Connecting farmers with quality filter products at competitive prices
            </p>
          </div>
          
          <a 
            href="https://play.google.com/store/apps/details?id=com.adityasinghop.OneRoot&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-black text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <FaGooglePlay className="mr-2 text-lg" />
            <div>
              <div className="text-xs opacity-80">GET IT ON</div>
              <div>Google Play</div>
            </div>
          </a>
        </div>
        
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; {currentYear} OneRoot.farm - All rights reserved
          </p>
          <p className="text-xs text-gray-500 mt-2 flex items-center justify-center">
            Made with <FaHeart className="text-red-500 mx-1" size={10} /> for Indian farmers
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer