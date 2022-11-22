function makeCalendar(year, month) {
    const week = ['일', '월', '화', '수', '목', '금', '토']
    const monthEndDate = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    const dates = Array.from(new Array(7), x => []);
    // const sundays = [];
    // const mondays = [];
    // const tuesdays = [];
    // const wednesdays = [];
    // const thirsdays = [];
    // const fridays = [];
    // const saturdays = [];

    for(let date=1 ; date<=monthEndDate[month-1] ; date++) {
        let thisDate = new Date(`${year}-${month}-${date}`);
        let thisDay = thisDate.getDay();
        if(date === 1) {
            for(let i=0 ; i<thisDay ; i++) {
                dates[i].push(0);
            }
        }
        dates[thisDay].push(date);
    }
    return dates
}

export default makeCalendar;