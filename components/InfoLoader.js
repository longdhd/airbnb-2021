import React from "react";
import ContentLoader from "react-content-loader";

const InfoLoader = (props) => (
  <ContentLoader viewBox="0 0 1300 500" height={400} width={1040} {...props}>
    <rect x="20" y="15" rx="20" ry="20" width="400" height="240" />
    <rect x="501" y="17" rx="10" ry="10" width="420" height="33" />
    <rect x="501" y="71" rx="10" ry="10" width="315" height="33" />
    <rect x="501" y="125" rx="10" ry="10" width="233" height="20" />
    <rect x="501" y="216" rx="5" ry="5" width="195" height="13" />
    <rect x="501" y="251" rx="5" ry="5" width="195" height="13" />
  </ContentLoader>
);
export default InfoLoader;
