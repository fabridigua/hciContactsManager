class Model {
    /*
        Model: takes the contacts and gives them to the Controller
     */

    constructor(sessionId) {
        this.contacts = [];
        this.sessionId = sessionId;
        this.hasLoadedContacts = false;
    }

    reloadContacts(){
        /*
            Load the contatcs from the server
         */
        $.ajax({
            type:     "get",
            data:     {session: this.sessionId,device:deviceId},
            cache:    false,
            url:      "http://hcicontactsmanager2017.altervista.org/loadContacts.php",
            error: function (request, error) {
                console.log(arguments);
                alert(" Can't do because: " + error);
            },
            success: function (data) {
                if(data!==null){

                    contactsJSON = JSON.parse(data);
                    if(contactsJSON==null){
                        console.log("ERROR RELOADING");
                        return;
                    }
                    contactsJSON = contactsJSON.contacts_list;
                    contactsJSON = JSON.parse(contactsJSON);

                    let contacts_number = Object.keys(contactsJSON).length;

                    for(var c in contactsJSON){
                        let cId = contactsJSON[c].id;
                        let cDName = contactsJSON[c].displayName;
                        let cNickname = contactsJSON[c].nickname;
                        if(contactsJSON[c].displayName!=null) {
                            var a_contact = new Contact(
                                contactsJSON[c].id,
                                contactsJSON[c].displayName,
                                contactsJSON[c].nickname,
                                removeDuplicates(contactsJSON[c].phoneNumbers),
                                removeDuplicates(contactsJSON[c].emails),
                                removeDuplicates(contactsJSON[c].addresses),
                                contactsJSON[c].organizations,
                                contactsJSON[c].birthday,
                                contactsJSON[c].note,
                                contactsJSON[c].categories,
                                removeDuplicates(contactsJSON[c].urls)
                            );
                            contacts_list.push(a_contact);
                        }
                    }
                    this.hasLoadedContacts = true;
                    contactsLoaded = true;
                    createPage();
                }
            }
        });

    }

    checkForSession(checkResult){
        /*
            Check if there is a session from witch load the contatcs
         */
        $.ajax({
            type:     "post",
            data:     {session: this.sessionId},
            cache:    false,
            url:      "http://hcicontactsmanager2017.altervista.org/checkForNewSession.php",
            error: function (request, error) {
                console.log(arguments);
                //alert(" Can't do because: " + error);
            },
            success: function (data) {
                console.log("Result session check: "+data);
                checkResult(data);
            }
        });
    }

    /* Compare by a filter */
    compareName(a,b) {
        if (a.displayName < b.displayName)
            return -1;
        if (a.displayName > b.displayName)
            return 1;
        return 0;
    }
    compareEmail(a,b) {
        if (a.emails[0] < b.emails[0]){
            return -1;
        }
        if (a.emails[0] > b.emails[0]){
            return 1;
        }
        return 0;
    }
    compareNumber(a,b) {
        if (a.phoneNumbers[0] < b.phoneNumbers[0])
            return -1;
        if (a.phoneNumbers[0] > b.phoneNumbers[0])
            return 1;
        return 0;
    }
    compareBirthday(a,b) {
        if (a.birthday < b.birthday)
            return -1;
        if (a.birthday > b.birthday)
            return 1;
        return 0;
    }
    sortContacts(filter){
        switch (filter){
            case "filter_name":
                contacts_list=contacts_list_temp.slice();
                contacts_list.sort(this.compareName);
                filtering=false;
                break;
            case "filter_email":
                if(filtering){return;}
                filtering=true;
                var femails=[];
                var temp = contacts_list_temp.slice();
                for(var c=0;c<temp.length;c++){
                    if(temp[c].emails[0]!=undefined&&temp[c].emails[0]!=null){
                        femails.push(temp[c])
                        temp.splice(c, 1);
                    }
                }
                femails.sort(this.compareEmail);
                contacts_list=femails//concat(temp);
                filtering=false;
                break;
            case "filter_number":
                contacts_list=contacts_list_temp.slice();
                contacts_list.sort(this.compareNumber);
                filtering=false;
                break;
            case "filter_birthday":
                if(filtering){return;}
                filtering=true;
                var fbirth=[];
                var temp = contacts_list_temp.slice();
                for(var k=0;k<4;k++){
                    for(var c=0;c<temp.length;c++){
                        if(temp[c].birthday!=undefined&&temp[c].birthday!=""){
                            fbirth.push(temp[c])
                            temp.splice(c, 1);
                        }
                    }
                }
                fbirth.sort(this.compareBirthday);
                contacts_list=fbirth;//concat(temp);
                filtering=false;
                break;
        }
    }

    searchContacts(word){
        /*
            Search the contacts with the word in any fields or TAGS
         */
        word=word.toLowerCase();
        var temp = contacts_list_temp;
        contacts_list = temp.filter(function (el) {
            return (el.displayName!= null && el.displayName.toLowerCase().indexOf(word) >= 0) ||
                (el.nickname!= null && el.nickname.toLowerCase().indexOf(word) >= 0)||
                (el.emails!= null && el.emails.toString().toLowerCase().indexOf(word) >= 0)||
                (el.phoneNumbers!= null && el.phoneNumbers.toString().toLowerCase().indexOf(word) >= 0)||
                (el.addresses!= null && el.addresses.toString().toLowerCase().indexOf(word) >= 0)||
                (el.organizations!= null && el.organizations.toString().toLowerCase().indexOf(word) >= 0)||
                (el.birthday!= null && el.birthday.toString().toLowerCase().indexOf(word) >= 0)||
                (el.note!= null && el.note.toString().toLowerCase().indexOf(word) >= 0)||
                (el.categories!= null && el.categories.toString().toLowerCase().indexOf(word) >= 0)||
                (el.urls!= null && el.urls.toString().toLowerCase().indexOf(word) >= 0);
        });
        //TAGS
        for(var index=0;index<contacts_list_temp.length;index++){
            var count = $("#tags_" + contacts_list_temp[index].id +" a").length;
            if(count>0){
                var tags_list = [];
                $("#tags_" + contacts_list_temp[index].id).children('a').each(function () {
                    let tag=this.text;
                    if(tag.toLowerCase().indexOf(word) >= 0){
                        contacts_list.push(contacts_list_temp[index]);
                    }
                });
            }
        }
        this.checkContacts();
    }
    checkContacts(){
        /*
            Utility: check contacts after the loading
         */
        let unique_ids = [];
        let new_contacts=[];
        for(let i = 0;i < contacts_list.length; i++){
            if(unique_ids.indexOf(contacts_list[i].id) == -1){
                unique_ids.push(contacts_list[i].id)
                new_contacts.push(contacts_list[i])
            }
        }
        contacts_list=new_contacts;
    }

}