import React from 'react';
import './usersaves.css';
import PlusSvg from '../../assets/usersave-plus.svg'; // Importing SVG as a React component
import OptionsImage from '../../assets/options.png'; // Importing image

function UserSaves() {

    const maxNameLength = 10;
  
    return (
        <div className = "parent-all">
            <div className="usersave-parent-title">
                <h1 className="usersave-title">User Saves</h1>
            </div>
            <table>
                <tr>
                    <th colspan = "2" >Mario Bros 3</th>
                </tr>
                <tr>
                    <td className = "name" >Peter</td>
                    <td className = "option">Griffin</td>
                </tr>
                <tr>
                    <td>Lois</td>
                    <td>Griffin</td>
                </tr>
            </table>
        </div>
    );
}

export default UserSaves;