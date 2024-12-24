import React from 'react';
import { auth, googleProvider } from '../../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      onLogin(user);
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  // Animation variants
  // const containerVariants = {
  //   hidden: { opacity: 0, scale: 0.9, y: 50 },
  //   visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  // };

  // const buttonVariants = {
  //   hover: { scale: 1.1, boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.3)' },
  //   tap: { scale: 0.95 },
  // };

  return (
    // <motion.div
    //   initial="hidden"
    //   animate="visible"
    //   variants={containerVariants}
    //   style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    // >
    //   <motion.h2 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}>
    //     Welcome! Please log in to continue
    //   </motion.h2>
    //   <table style={{ borderCollapse: 'collapse', marginTop: '20px' }}>
    //     <tbody>
    //       <tr>
    //         <td style={{ padding: '10px', textAlign: 'right' }}><strong>Login Option:</strong></td>
    //         <td style={{ padding: '10px' }}>
    //           <motion.button
    //             onClick={handleGoogleLogin}
    //             variants={buttonVariants}
    //             whileHover="hover"
    //             whileTap="tap"
    //             style={{
    //               padding: '10px 20px',
    //               fontSize: '16px',
    //               borderRadius: '5px',
    //               cursor: 'pointer',
    //             }}
    //           >
    //             Login with Google
    //           </motion.button>
    //         </td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </motion.div>
    <div class="font-[sans-serif]">
      <div class="min-h-screen flex fle-col items-center justify-center py-6 px-4 dark:bg-black">
        <div class="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div class="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto bg-white dark:bg-gray-800">
          <form className="space-y-8 dark:bg-gray-800">
            <div class="mb-8">
              <h3 class="text-[#3d1689] text-3xl font-extrabold dark:text-white">Welcome!</h3>
            </div>

            <div>
              <label class="text-gray-800 text-[15px] mb-2 block dark:text-white">Email</label>
              <div class="relative flex items-center">
                <input name="email" type="text" required class="w-full text-sm text-gray-800 bg-gray-200 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600 dark:bg-gray-900 dark:text-white" placeholder="Enter email" />
              </div>
            </div>

            <div class="mt-4">
              <label class="text-gray-800 text-[15px] mb-2 block dark:text-white">Password</label>
              <div class="relative flex items-center">
                <input name="password" type="password" required class="w-full text-sm text-gray-800 bg-gray-200 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600 dark:bg-gray-900 dark:text-white" placeholder="Enter password" />
              </div>
            </div>

            <div class="mt-8">
              <button type="button" class="w-full py-3 px-6 text-sm tracking-wide rounded-md text-white bg-[#3d1689] focus:outline-none">
                Sign in
              </button>
            </div>

            <div class="my-4 flex items-center gap-4">
              <hr class="w-full border-gray-300" />
              <p class="text-sm text-gray-800 text-center">or</p>
              <hr class="w-full border-gray-300" />
            </div>

            <button type="button" class="w-full flex items-center justify-center gap-4 py-3 px-6 text-sm tracking-wide text-gray-800 border border-gray-300 rounded-md bg-gray-50 hover:bg-[#f4f4fb] focus:outline-none" onClick={handleGoogleLogin}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" class="inline" viewBox="0 0 512 512">
                <path fill="#fbbd00"
                  d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                  data-original="#fbbd00" />
                <path fill="#0f9d58"
                  d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                  data-original="#0f9d58" />
                <path fill="#31aa52"
                  d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                  data-original="#31aa52" />
                <path fill="#3c79e6"
                  d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                  data-original="#3c79e6" />
                <path fill="#cf2d48"
                  d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                  data-original="#cf2d48" />
                <path fill="#eb4132"
                  d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                  data-original="#eb4132" />
              </svg>
              Continue with google
            </button>
          </form>
          </div>
          <div class="lg:h-[360px] md:h-[260px] max-md:mt-8">
            <img src="Jolt Market.png" class="w-full h-full max-md:w-4/5 mx-auto block object-contain" alt="logo_2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
