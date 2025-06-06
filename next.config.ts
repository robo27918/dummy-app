import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {protocol:'https', hostname:'i.natgeofe.com'},
      {protocol:'https', hostname:'upload.wikimedia.org'},
      {protocol:'https', hostname:'lh3.googleusercontent.com'}

    ]
    
  },
};

export default nextConfig;
