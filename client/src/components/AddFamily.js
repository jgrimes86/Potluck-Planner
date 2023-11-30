
import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";

import FamilyListItem from "./FamilyListItem";
import AddFamilyForm from "./AddFamilyForm";
import AllFamilyMembers from "./AllFamilyMembers";
import Navbar from "./Navbar";

function AddFamily() {
    const [invitedFamily, setInvitedFamily] = useState([])
    const { event, setIsLoggedIn, setUser } = useOutletContext()
    const { id } = useParams()

    // NEED TO HAVE A PROP FOR THE EVENT THAT CAN BE USED TO CREATE foods TABLE ROW

    useEffect(() => {
        fetch('http://localhost:5555/family_members/'+id)
        .then(r => {
            if (r.ok) {
                r.json().then(data => setInvitedFamily(data))
            }
        })
    }, [])


    // create new foods table row to link event and family_member
    function addToJoinTable(familyMember) {
        fetch('http://localhost:5555/foods', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                family_member_id: familyMember.id,
                event_id: id
            })
        })
    }


    function deleteFamilyMember(memberId) {
        fetch('http://localhost:5555/family_members/'+memberId, {
            method: 'DELETE'
        })
        .then(r => {
            if (r.ok) {
                setInvitedFamily(invitedFamily.filter(fm => {if (fm.id !== memberId) return fm}))
            }
        })
    }

    const familyList = invitedFamily.map(fm => {
        return <FamilyListItem key={fm.id} familyMember={fm} deleteFamilyMember={deleteFamilyMember} />
    })


    return (
        <div>
            <Navbar event={event} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
            <h1>Add Family Members</h1>

            <ul>
                {familyList}
            </ul>

            <AddFamilyForm invitedFamily={invitedFamily} setInvitedFamily={setInvitedFamily} addToJoinTable={addToJoinTable} />

            <AllFamilyMembers addToJoinTable={addToJoinTable} invitedFamily={invitedFamily} setInvitedFamily={setInvitedFamily} />

        </div>
    )

}

export default AddFamily