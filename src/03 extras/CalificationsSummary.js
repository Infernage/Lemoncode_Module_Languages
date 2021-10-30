const summarizeClassRoom = (studentList) => {
    return studentList.map(student => {
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
//# sourceMappingURL=CalificationsSummary.js.map