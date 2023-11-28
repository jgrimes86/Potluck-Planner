

// view of 1 event (e.g, Christmas dinner --> event.id = 1)
function Event() {

    // useEffet for a fetch GET request to get the rows from foods table that match the event ID
    // useEffect(() => {
        
    // })
    // from rows of foods table, map through array and create React components (<GuestCard />) listing Family Member and whether they are bringing a food
        // if bringing food: list food next to name
        // if not yet bringing food: include form for adding food (Formik form in the component)

    // when food added, fetch PATCH request to add food to foods table then change component to list food instead of showing form

    return (
        <div>
            <h1>Event</h1>
            {/* <GuestCard /> */}
            
        </div>
    )

}

export default Event


// foods table
// id	name	comments	family_member_id	event_id
// 1	NULL	NULL	    1               	1
// 2	NULL	NULL	    2	                1
// 3    NULL    NULL        1                   2 (Thanksgiving)