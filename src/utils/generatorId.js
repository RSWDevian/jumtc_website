//? function to generate id 
export default function generateId(team = "Temporary",year, number) {
    let id = "";
    id += year+"MTC";
    if(team === "Temporary") {
        id += "T";
    }else if (team === "Hardware") {
        id += "H";
    }else if (team === "Electronics") {
        id += "E";
    }else if (team === "Software") {
        id += "S";
    }
    console.log(number);
    let numberID = ((number<10)? "000" : (number>=10 && number<100)? "00" : "0") + number;
    id += numberID;
    return id;
}