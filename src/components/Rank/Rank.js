import React from "react";
const Rank = ({ user, entries }) => {
  return (
    <div>
      <div className="f3 pt4">
        {user ? user.name : " ... " + "Number of enteries are"}
      </div>
      <div className="f4 pb4">{entries}</div>
    </div>
  );
};
export default Rank;
