import React from "react";

function Intent({ data }) {
  return (
    <div>
      <div className="intent">{data.displayName}</div>
      <hr />
    </div>
  );
}

export default Intent;
