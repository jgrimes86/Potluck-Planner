
import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";

function AllFamilyMembers({addToJoinTable, setAllFamily, allFamily}) {
    // const [allFamily, setAllFamily] = useState([])
    const {invitedFamily, setInvitedFamily} = useOutletContext()
    const { id } = useParams()

    console.log(allFamily)

    // useEffect(() => {
    //     fetch('http://localhost:5555/family_members')
    //     .then(r => {
    //         if (r.ok) {
    //             r.json().then(data => setAllFamily(data))
    //         }
    //     })
    // }, [])
    // console.log(allFamily)

    ///////////////////////// INVITE FAMILY MEMBER //////////////////////
    function inviteFamilyMember(fm) {
        setInvitedFamily([...invitedFamily, fm]);
        addToJoinTable(fm)
    }

    /////////////////////////// UNINVITE FAMILY MEMBER ///////////////////
    function uninviteFamilyMember(fm) {
        fetch('/uninvite/'+fm.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "event_id": id
            })
        })
        .then(r => {
            if (r.ok) {
                setInvitedFamily(invitedFamily.filter(member => {
                    if (member.id !== fm.id) return member
                }))
            }
        })
    }

    ////////////////////// DELETE FAMILY MEMBER ////////////////////////
    function deleteFamilyMember(fm) {
        fetch('/family_members/'+fm.id, {
            method: 'DELETE'
        })
        .then(r => {
            if (r.ok) {
                setInvitedFamily(invitedFamily.filter(member => {if (member.id !== fm.id) return member}));
                setAllFamily(allFamily.filter(member => {if (member.id !== fm.id) return member}))
            }
        })
    }



    ////////////////////////// family member list ////////////////////////


    const familyMemberList = allFamily.map(fm => {
        const invitedIds = invitedFamily.map(member => member.id)
        const isInvited = invitedIds.includes(fm.id)
        return (
            <li>
                <span key={fm.id}>{`${fm.first_name}`+" "+`${fm.last_name}`}</span>
                {isInvited ? <button className = "uninvitebutton" onClick={() => uninviteFamilyMember(fm)}>Uninvite</button> : <button onClick={() => inviteFamilyMember(fm)}>Invite</button>}
                <button className = "deletebutton" onClick={() => {deleteFamilyMember(fm)}}>X</button>
            </li>
            
        )
    })

    return (
        <div>
            <h3 className = "selectfamilymembertext">Select Family Members to Invite:</h3>
            <ul className = "familymemberoptions">
                {familyMemberList}
            </ul>
        </div>
    )
}

export default AllFamilyMembers
