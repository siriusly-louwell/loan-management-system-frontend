import React from "react";
import { Link } from "react-router-dom";
import BttnwithIcon from "../buttons/BttnwithIcon";
import Plus from "../../assets/icons/Plus";

export default function BasicTabs({ids, state, setId}) {
    function unitCheck(id) {
        return id === state ? "bg-white rounded-lg font-bold shadow text-rose-500" : "";
    }

    return (
        <ul className="overflow-x-hidden sm:px-10 flex w-full text-center space-x-5 text-gray-500 bg-gray-100 rounded-lg space-x-4 mb-3">
            {ids.map((id, i) => (
                <li>
                    <button type="button" onClick={() => setId(id)} className={"flex justify-center p-4 " + unitCheck(id)}>Unit {i + 1}</button>
                </li>
            ))}
            {/* <li>
                <a href="#page1" className="flex justify-center p-4">Pilot Training</a>
            </li>
            <li>
                <a href="#page2" className="flex justify-center bg-white rounded-lg shadow text-rose-500 p-4">Titan maintenance</a>
            </li> */}
            <BttnwithIcon text="Add more units" click={() => document.getElementById('add_units').style.display = "block"}>
                <Plus />
            </BttnwithIcon>
        </ul>
    );
}