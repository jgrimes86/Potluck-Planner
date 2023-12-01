import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";

import AddNewFamilyMember from "./AddNewFamilyMember";
import AllFamilyMembers from "./AllFamilyMembers";
import Navbar from "./Navbar";

function AddFamily() {
    const [allFamily, setAllFamily] = useState([]);
    const { event, setIsLoggedIn, setUser, invitedFamily, setInvitedFamily } = useOutletContext();
    const { id } = useParams();

    useEffect(() => {
        fetch('/family_members')
        .then(r => {
            if (r.ok) {
                r.json().then(data => setAllFamily(data))
            }
        })
    }, [])


    // create new foods table row to link event and family_member
    function addToJoinTable(familyMember) {
        fetch('/foods', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                family_member_id: familyMember.id,
                event_id: id
            })
        });
    }

    const familyList = invitedFamily.map(fm => (
        <li key={fm.id}>
            {`${fm.first_name} ${fm.last_name}`}
        </li>
    ));

    return (
        <div>
            <Navbar event={event} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
            <h1 className = "eventdisplaytextfm">{event ? event.name : ""}</h1>
            <h1 className = "addfamilytagline">Add Family Members to Your Event!</h1>
            <h3 className = "invitedfamtagline">Family Members That Have Been Invited:</h3>
            <ul>
                {familyList}
            </ul>

            <AddNewFamilyMember addToJoinTable={addToJoinTable} allFamily={allFamily} setAllFamily={setAllFamily} />

            <AllFamilyMembers addToJoinTable={addToJoinTable} allFamily={allFamily} setAllFamily={setAllFamily} />
        </div>
    );
}

export default AddFamily;
