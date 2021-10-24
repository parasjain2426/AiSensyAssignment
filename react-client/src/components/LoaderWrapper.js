import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function LoaderWrapper({ loading, children, styles }) {
  return loading ? (
    <div style={styles}>
      <Loader type="ThreeDots" color="#ff7300" height={50} width={50} />
    </div>
  ) : (
    <>{children}</>
  );
}

export default LoaderWrapper;
