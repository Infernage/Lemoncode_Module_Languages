type TStudent = {
    name: string;
    califications: number[];
};
type TStudentSummary = Pick<TStudent, 'name'> & {
    highestCalification: number;
    averageCalifications: string;
}

const summarizeClassRoom = (studentList: TStudent[]) => {
    return studentList.map<TStudentSummary>(student => {
        let highestCalification = 0;
        let averageCalification = 0;
        for (const calification of student.califications) {
            if (highestCalification < calification) {
                highestCalification = calification;
            }
            averageCalification += calification;
        }

        return {
            name: student.name,
            averageCalifications: (averageCalification / student.califications.length).toFixed(2).toString(),
            highestCalification: highestCalification
        };
    });
};