import React from 'react'

const Footer = () => {
  return (
     <footer className="footer h-[10vh] footer-center  justify-center text-center bg-white border text-base-content items-center p-4">
          <aside className="h-[100%]">
              <p>Copyright © {new Date().getFullYear()} - All right reserved by InFile pvt limited</p>
          </aside>
      </footer>
  )
}

export default Footer
