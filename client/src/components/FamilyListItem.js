
function FamilyListItem({familyMember, deleteFamilyMember}) {

    function handleDelete() {
        deleteFamilyMember(familyMember.id)
    }

    return (
        <li>
            <span>{`${familyMember.first_name} ${familyMember.last_name}`}</span>
            <button onClick={handleDelete}>Delete</button>
        </li> 
    )
}

export default FamilyListItem