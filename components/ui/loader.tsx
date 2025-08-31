"use client";

import React from "react";

export function Loader() {
  return (
    <div className="loader-wrapper" aria-label="Loading" role="status">
      {/* Letters removed per request; only the orb remains */}
      <div className="loader" />
    </div>
  );
}

export default Loader;


