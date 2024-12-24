import React from 'react';


const Footer = () => {
//   

  return (
    <footer className="bg-[#3d1689]  text-white py-6 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
          {/* Footer Navigation Links */}
          <div className="space-y-2 md:space-x-6 md:space-y-0">
          <h1 className='text-3xl font-extrabold text-center tracking-wide py-6 flex'>
  Made by Web Team of Team Innoreva with ❤️
  {/* <img alt="Vector" src="/heart.svg" className="p-2 w-9 h-6" /> */}
</h1>

           <div><h3 className="text-3xl font-bold mb-4">
  Contact Us
</h3>

            <address className="grid gap-y-1">
 <a href="mailto:teaminnoreva@nitjsr.ac.in" className="flex "><img alt="Vector" src="/email.svg" className="pr-4"/> <p>teaminnoreva@nitjsr.ac.in</p></a>
  <a href="tel:+91 96709 66612" className="flex"><img alt="Vector" src="/phone.svg" className="pr-4" />+91 9670966612</a>
</address>
        </div>
           
          </div>

          {/* Logo Section */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <img
              src="jm.png"
              alt="Logo"
              className="h-8 w-8 filter invert brightness-0"
            />
            <img
              src="jmn.png"
              alt="Logo Text"
              className="h-6 w-auto filter invert brightness-0"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 border-t border-gray-600 pt-4 text-sm text-center">
          © {new Date().getFullYear()} Team Innoreva. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
