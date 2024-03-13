export const mergeArray = (attendanceArray, employeeArray) => {
    const result = []
    const idArray = []
    for (let i = 0; i < employeeArray.length; i++) {
        if (!idArray.includes(employeeArray[i]._id)) {
            idArray.push(employeeArray[i]._id)
            result.push({ employeeId: employeeArray[i]._id })
        }
    }
    console.log(attendanceArray)
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < attendanceArray.length; i++) {
            if (result[i].employeeId === attendanceArray[j].employeeId) {
                for (let key in attendanceArray[j].attendanceArray[0]) {
                    console.log(key)
                }
            }
        }
    }

    return console.log(result)
}