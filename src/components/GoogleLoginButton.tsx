"use client";

import React from "react";

const GoogleLoginButton = () => {
  const googleAuthUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL;

  if (!googleAuthUrl) {
    console.error("Google authentication URL is not defined.");
  }

  return (
    <a
      href={googleAuthUrl || "#"}
      className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex justify-center items-center"
      aria-label="Login with Google"
    >
      Login with Google
    </a>
  );
};

export default GoogleLoginButton;

// import Link from "next/link";

// const GoogleLoginButton = () => {
//   const googleauth = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL;
//   console.log("GA ", googleauth);
//   return (
//     <Link
//       href={googleauth ? googleauth : "#"}
//       className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex justify-center items-center"
//     >
//       Login with Google
//     </Link>
//   );
// };

// export default GoogleLoginButton;
