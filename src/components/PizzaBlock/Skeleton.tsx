import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC<{}> = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="137" cy="143" r="125" /> 
    <rect x="9" y="284" rx="10" ry="10" width="260" height="24" /> 
    <rect x="-1" y="324" rx="10" ry="10" width="280" height="83" /> 
    <rect x="4" y="430" rx="10" ry="10" width="95" height="30" /> 
    <rect x="129" y="426" rx="24" ry="24" width="150" height="40" />
  </ContentLoader>
);

export default Skeleton;
