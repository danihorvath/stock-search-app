import React from "react";

const GlobalAlert: React.FC = () => {
  return (
    <div className="bg-yellow-400 p-3">
      <p className="text-yellow-900">
        We are currently using a free Polygon API key, which has a maximum limit
        of 5 requests per minute. If you see a 429 error, please wait a minute.
      </p>
    </div>
  );
};

export default GlobalAlert;
