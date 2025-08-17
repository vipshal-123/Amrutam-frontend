import moment from 'moment'

export const transformApiDataToEvents = (apiData) => {
    return (
        apiData?.flatMap((day) =>
            day?.appointments?.map((appointment) => ({
                id: appointment?._id,
                title: 'Available',
                start: moment(appointment?.start).toDate(),
                end: moment(appointment?.end).toDate(),
                patientCount: appointment?.patientCount,
            })),
        ) || []
    )
}

export const reducedId = (id) => {
    return id.toString().slice(-6).toUpperCase()
}

export const checkForDuplicateDates = (dates) => {
    console.log('dates: ', dates);
    let duplicates = []

    for (let i = 0; i < dates.length; i++) {
        let value = dates[i]
        if (duplicates.indexOf(value) !== -1) {
            return true
        }
        duplicates.push(value)
    }
    return false
}
