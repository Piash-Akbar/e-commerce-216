// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['images.unsplash.com','ix-www.imgix.net',"drive.google.com","firebasestorage.googleapis.com","imgur.com"],
//     },
//   };
  
//   export default nextConfig;



  /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      }
    ],
  },
};

export default nextConfig;

  