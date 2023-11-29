
import { useState, useEffect } from "react"

function AllFamilyMembers({addToJoinTable, invitedFamily, setInvitedFamily}) {
    const [allFamily, setAllFamily] = useState([])
    const [isChecked, setIsChecked] = useState({})

    useEffect(() => {
        fetch('http://localhost:5555/family_members')
        .then(r => {
            if (r.ok) {
                r.json().then(data => setAllFamily(data))
            }
        })
    }, [])
    // console.log(allFamily)

    // form that consists of list of components for all guests in FamilyMember table that include:
    // 1. guest name
    // 2. conditonal rendering of:
        // a. already invited to current event
        // b. check mark to invite to current event
    // on submission of form, guests with checked boxes are:
        // a. associated with event in foods table
        // b. added to invitedFamily

    function handleSubmit(event) {
        event.preventDefault()
        let invited = allFamily.filter(fm => {
            if (isChecked[fm.id] === true) {
                return fm
            }
        })
        // console.log(invited)
        // for (const fm of invited) {
        //     addToJoinTable(fm);
        //     setInvitedFamily([...invitedFamily, fm])
        // }
        invited.map(fm => {
            addToJoinTable(fm);
            setInvitedFamily([...invitedFamily, fm])
            setIsChecked([])
        })
    }

    function handleChange(id) {
        let checkedState = isChecked[id]
        setIsChecked({
            ...isChecked,
            [id]: !checkedState
        })
    }

    const formItems = allFamily.map(fm => {
        const invitedIds = invitedFamily.map(fm => fm.id)
        if (invitedIds.includes(fm.id)) {
            return (
                <div key={fm.id}>
                    <span>{`${fm.first_name} ${fm.last_name}`  }</span>
                    <span>  has been invited to the event</span>
                </div>
            )
        } else {
            return (
                <div key={fm.id}>
                    <label htmlFor={fm.id}>{`${fm.first_name} ${fm.last_name}`}</label>
                    <input 
                        type="checkbox"
                        id={fm.id}
                        name={fm.id}
                        onChange={() => handleChange(fm.id)}
                    />
                </div>
            )
        }
    })
    // console.log(isChecked)

    return (
        <div>
            <h3>Select Family Members to Invite:</h3>

            <form onSubmit={handleSubmit} >
                {formItems}
                <button type="submit">Invite Family Members</button>
            </form>
        
        </div>
    )
}

export default AllFamilyMembers
