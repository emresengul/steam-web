const Check = require("../models/check");
const request = require("request");
const cheerio = require("cheerio");
const Checker = require("../models/checker");

// console.log(Check.speak())
// const object = new Check();
// object.url = "google.com";
// console.log(Check)

// console.log(object.title())

exports.getIndex = (req, res, next) => {
    res.render("main/index")
}


exports.getProfile = (req, res, next) => {
    var profileUrl = (req.body.profileUrl).trim();
    if (profileUrl.includes("steam")) {
        request(profileUrl, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html, { decodeEntities: false });
                // Nickname find
                const siteTitleObject = $(".actual_persona_name");
                var nickName = siteTitleObject.html();
                // Level Find
                const levelObject = $(".friendPlayerLevelNum");
                var level = levelObject.html();
                if (level == null || level == undefined) {
                    var level = 0;
                }
                else {
                    var level = levelObject.html();
                }
                // Real Name Find
                const nameObject = $("bdi");
                var name = nameObject.html();
                if (name == null) {
                    name = "test";
                }
                else {
                    var name = nameObject.html();
                }
                // Country Find
                const flagObject = $(".header_real_name");
                var flag = flagObject.html();
                // console.log(flag.split(" ")[2])
                // console.log(flag)
                if (flag == null) {
                    var flagIcon = "";
                    var flagCountry = "";
                }
                else if(flag.split(" ")[2] == undefined){
                    var flagIcon = "";
                    var flagCountry = "";
                }
                else {
                    var flag2 = flag.split('src="')[1];
                    var flagIcon = flag2.split('"')[0];
                    var flagCountry = flag2.split("\t")[12];
                }

                // Profile Image Find
                const imageObject = $(".playerAvatarAutoSizeInner");
                var image = (imageObject.html());
                var profileImage = image.split('"')[1];
                //Profile Summary // Henüz kullanmadım
                const summaryObject = $(".profile_summary");
                var summary = summaryObject.html();

                // Status Find
                const statusObject = $(".responsive_status_info");
                var status = statusObject.html();
                if (status == null) {
                    var statusMain = "";
                }
                else {
                    if (status.split("<")[1].includes("offline")) {
                        var statusMain = "offline"
                    }
                    else {
                        var statusMain = "online"
                    }

                }





                // Friend Count Find
                // const friendCountObject = $(".profile_count_link_total").children().last();
                // const deneme = friendCountObject.children().last()
                // var deneme2 = deneme.html();
                // var friendCount = (friendCountObject.html()).trim();
                // arkadaş sayısı çekilecek




                var userName = profileUrl.split("/")[4];
                Checker.getByProfile(userName)
                    .then((result) => {
                        if (result[0][0] == undefined) {
                            const savedProfile = new Checker();
                            savedProfile.profileurl = userName;
                            savedProfile.level = level;
                            savedProfile.nickname = nickName;
                            savedProfile.name = name;
                            savedProfile.profileimage = profileImage;
                            savedProfile.status = statusMain;
                            savedProfile.flag = flagIcon;
                            savedProfile.country = flagCountry;

                            savedProfile.saveProfile()
                                .then(() => {
                                    res.redirect(`/profile/${userName}`)

                                }).catch((err) => {
                                    console.log(err)
                                });

                        }
                        else {
                            Checker.delete(userName)
                                .then(() => {
                                    const savedProfile = new Checker();
                                    savedProfile.profileurl = userName;
                                    savedProfile.level = level;
                                    savedProfile.nickname = nickName;
                                    savedProfile.name = name;
                                    savedProfile.profileimage = profileImage;
                                    savedProfile.status = statusMain;
                                    savedProfile.flag = flagIcon;
                                    savedProfile.country = flagCountry;
                                    savedProfile.saveProfile()
                                        .then(() => {
                                            res.redirect(`/profile/${userName}`)

                                        }).catch((err) => {
                                            console.log(err)
                                        });


                                }).catch((err) => {

                                });
                        }

                    }).catch((err) => {

                    });

            }
        });
    }
    else {
        res.redirect("/");
    }
}
exports.showProfile = (req, res, next) => {
    const url = req.params.profile;
    Checker.getByProfile(url)
        .then((result) => {
            if (result[0][0] == undefined) {
                res.redirect("/")
            }
            else {
                res.render("main/profile", {
                    profile: result[0][0]
                })
                console.log(result[0][0].profileurl)
            }

        }).catch((err) => {

        });



}
