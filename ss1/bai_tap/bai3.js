const getInfor =obj=>{
let{firstName="Quân",degree="Bachelor"}=obj;
console.log(firstName,degree);
}

const sv1 = {
    firstName: 'John',
    gender: 'male',
    degree: 'Bachelor',
    english: 'English'
}
getInfor(sv1);
const sv2 = {
    name: 'John',
    gender: 'male',
    degree: 'Bachelor',
    english: 'English'
}
getInfor(sv2);



