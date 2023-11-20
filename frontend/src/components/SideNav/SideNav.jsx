import React from "react";
import './SideNav.css'

function SideNav() {
  return (
  <div>
    <nav class="sidenav">
      <a>
        <img src='/src/assets/list.svg'></img>
        Game Library
      </a>
      <a>
        <img src='/src/assets/save.svg'></img>
        User Saves
      </a>
      <a>
        <img src='/src/assets/plus.svg'></img>
        Add ?
      </a>
      <a>
        <img src='/src/assets/sun.svg'></img>
        Light Mode
      </a>
      <a class='bottom'>
        <img src='/src/assets/reload.svg'></img>
        Reload
      </a>
    </nav>
  </div>
  );
};
export default SideNav;