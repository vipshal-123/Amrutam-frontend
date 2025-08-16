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
