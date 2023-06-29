import React from "react";

function SideBar(props) {
  return (
    <div className="sidebarContent">
      <img className="srkimg" src={props.src} />
      <h1>Shah Ruck Khan</h1>
      <button>View Profile</button>
      <p>
        <b>SRK AI Chat Bot: </b>
        <br></br>
        Connect with King Khan's wit, charm, and insights as this AI chat bot
        brings Shah Rukh Khan's world to your fingertips. Engage and experience
        the magic firsthand.
      </p>
    </div>
  );
}

export default SideBar;
