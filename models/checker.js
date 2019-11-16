const connection = require("../utility/database");

module.exports = class Checker {
    constructor(profileurl,level,nickname,name,profileimage,status,flag,country){
        this.profileurl = profileurl;
        this.level = level;
        this.nickname = nickname
        this.name = name;
        this.profileimage = profileimage;
        this.status = status;
        this.flag = flag;
        this.country = country;
    }
    saveProfile(){
        return connection.execute("INSERT INTO profile (profileurl,level,nickname,name,profileimage,status,flag,country) VALUES(?,?,?,?,?,?,?,?)",[this.profileurl,this.level,this.nickname,this.name,this.profileimage,this.status,this.flag,this.country])
    }
    static getByProfile(url){
        return connection.execute("SELECT * FROM profile WHERE profileurl=?",[url])
    }
    // static getAll(){
    //     return connection.execute("SELECT * FROM images");
    // }
    // static getByUrl(url){
    //     return connection.execute("SELECT * FROM generator WHERE url=?",[url]);
    // }
    // static getByCode(code){
    //     return connection.execute("SELECT * FROM generator WHERE code=?",[code]);
    // }
    // static getByRaffleRoom(raffleroom){
    //     return connection.execute("SELECT * FROM generator WHERE raffleroom=?",[raffleroom]);
    // }
    // static AddNewUser(code,name,active,raffleroom){
    //     return connection.execute("UPDATE generator SET name=?,activisioncount=?,raffleroom=? WHERE code=? ",[name,active,raffleroom,code,])
    // }
    // static getByWinner(winner){
    //     return connection.execute("SELECT * FROM generator WHERE winner=?",[winner]);        
    // }
    // static updateWinner(code,winnerStatus){
    //     return connection.execute("UPDATE generator SET winner=? WHERE code=? ",[winnerStatus,code])
    // }
    // static reset(){
    //     return connection.execute("TRUNCATE generator")
    // }
    static delete(profileurl){
        return connection.execute("DELETE FROM profile WHERE profileurl=?",[profileurl])
    }
}