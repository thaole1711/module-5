const Students=[
    {
        id: 1,
        name: "Nguyễn Văn An",
        dob: "2003-05-14",
        point: 8.5,
        address: "Hà Nội",
    },
    {
        id: 2,
        name: "Trần Thị Bình",
        dob: "2004-11-22",
        point: 9.0,
        address: "Đà Nẵng",
    },
    {
        id: 3,
        name: "Lê Minh Tuấn",
        dob: "2002-03-09",
        point: 7.2,
        address: "TP. Hồ Chí Minh",
    },
    {
        id: 4,
        name: "Phạm Thị Hạnh",
        dob: "2003-07-30",
        point: 8.8,
        address: "Hải Phòng",
    },
    {
        id: 5,
        name: "Đỗ Quang Khải",
        dob: "2005-01-18",
        point: 6.9,
        address: "Cần Thơ",
    },
];
export const getAllStudents=()=>{return Students};
export const addStudent=(student)=>{
    Students.push(student);
}