import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#ffffff"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="15" y="15" rx="4" ry="4" width="130" height="10" />
    <rect x="155" y="15" rx="3" ry="3" width="130" height="10" />
    <rect x="295" y="15" rx="3" ry="3" width="90" height="10" />
    <rect x="15" y="60" rx="3" ry="3" width="90" height="10" />
    <rect x="115" y="60" rx="3" ry="3" width="60" height="10" />
    <rect x="185" y="60" rx="3" ry="3" width="200" height="10" />
  </ContentLoader>
);

export default Loader;
