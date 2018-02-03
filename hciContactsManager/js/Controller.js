var model;
var timerSessionChecking,timerContactsWaiting;
var loader;
var currentSessionId,deviceId,sessionId;
var contactsLoaded, contactsJSON, pageCreated, connected=false, conctacsArrived,filtering=false,contacts_list_temp_setted=false,toStopLoading=false,newPopup,justSaved=false;
var contacts_list=[], contacts_list_temp=[];
var current_filter;
var modalDetails, newUserModal, deleteUserModal;
var timerSearch = null;
var tagsMap = {};

$(document).ready(function(){
    /*
        Start of application
     */
    contactsLoaded=false;
    pageCreated=false;
    conctacsArrived=false;
    if(Cookies.get('sessionID')!==undefined){ // check for a saved session in cookies
        askForRestoreSession();
    }else{
        model = new Model(Math.floor((Math.random() * 10000) + 1));
        $("#qrcode-container").qrcode({ //create the qr code
            render : "div",
            left : 25,
            top : 25,
            size: 300,
            text: ""+model.sessionId
        });
        timerSessionChecking=setInterval(checkNewSession,2000);
    }

    current_filter="filter_name";
    newUserModal = new jBox('Modal', {
        content: $("#details_new_popup_template").html(),
        addClass: 'details_new_wrapper'
    });
    deleteUserModal = new jBox('Modal');
});

function askForRestoreSession() {
    /*
        Ask and restore the last saved session
    */
    $.confirm({
        title: 'Restore the last saved session?',
        content: 'Restore session '+Cookies.get('sessionID')+", saved in date "+Cookies.get('dateSession')+"?",
        buttons: {
            confirm: function () {
                model = new Model(Cookies.get('sessionID'));
                sessionId=Cookies.get('sessionID');
                    timerSessionChecking=setInterval(checkNewSession,1000);
                $(".top_bar #connection_thumb").css('background',"red").attr("data-connection","Device Disconnected");
                new jBox('Tooltip', {attach: '#connection_thumb', getContent: 'data-connection'});
            },
            cancel: function () {
                model = new Model(Math.floor((Math.random() * 10000) + 1));
                $("#qrcode-container").qrcode({
                    render : "div",
                    left : 25,
                    top : 25,
                    size: 300,
                    text: ""+model.sessionId
                });
                setTimeout(function () {
                    timerSessionChecking=setInterval(checkNewSession,2000);
                },1000)
            }
        }
    });
}

function setLoader() {
    /*
        Load the loader
     */
    loader = null;
    loader = new Sonic({
        width: 200,
        height: 200,
        domClass:'loading',
        stepsPerFrame: 5,
        trailLength: 0.5,
        pointDistance: 0.01,
        fps: 20,
        backgroundColor: '#fff',
        fillColor: '#65ef91',
        path: [
            ['arc', 50, 50, 30, 0, 360]
        ],
        step: function(point, index, frame) {
            var sizeMultiplier = 8;
            this._.beginPath();
            this._.moveTo(point.x, point.y);
            this._.arc(
                point.x, point.y,
                index * sizeMultiplier, 0,
                Math.PI*2, false
            );
            this._.closePath();
            this._.fill();
        }
    });
    loader.play();
    document.body.appendChild(loader.canvas);
    $(".loading").addClass('animated fadeIn').css("display","block");
}

function checkNewSession() {
    /*
        Check if a device is connected
     */
    model.checkForSession(function(output){
        var obj = JSON.parse(output);
        if(obj.id>0){
            setLoader();
            $(".top_bar #bar_model").html(obj.info);
            $(".top_bar #session_text").html("<p>Session <b>"+obj.id+"</b></p>");
            $(".qrDivCotainer").addClass('animated fadeOut').css("display","none");
            clearInterval(timerSessionChecking);
            currentSessionId=obj.id;
            deviceId=obj.device;
            model.reloadContacts();
            $(".top_bar").addClass('animated bounceInDown').css("display","block");
            $(".contacts-container").addClass('animated fadeIn').css("display","block");
            clearInterval(timerContactsWaiting);
            if(!contacts_list_temp_setted){
                contacts_list_temp_setted=true;
                contacts_list_temp = contacts_list;
            }
            sendEvent("connection","eseguita");
            setInterval(function () {
                checkForEvents();
            },1000);
            return;
        }
    });
}

function refreshContacts() {
    /*
        Update the contacts (waiting a response from the device)
     */
    if(!connected){
        $.alert({title:'Warning',content:'You cannot reresh Contacts cause your device is disconnected!',theme:'red'});
        return;
    }
    $(".is-ancestor").html("");
    setLoader();
    sendEvent("refresh",sessionId);
}

function searchNext() {
    /*
        Search the word written in the search box
     */
    var word = $(".search_container input").val();
    contacts_list=[];
    if(word==""){
        contacts_list=contacts_list_temp;
        pageCreated=false;
        createPage();
    }else{
        $(".loading").addClass('animated fadeIn').css("display","block");
        model.searchContacts(word);
        pageCreated=false;
        createPage();
    }
}

function checkForEvents(){
    $.ajax({
        type:     "post",
        data:     {device_session: deviceId+"_"+model.sessionId},
        cache:    false,
        url:      "http://hcicontactsmanager2017.altervista.org/checkForNewPhoneEvent.php",
        error: function (request, error) {
            console.log(arguments);
        },
        success: function (data) {
            if(data!="null"){
                var jsonEvent = JSON.parse(data);
                var jsonData = JSON.parse(jsonEvent.data);
                switch(jsonData.event){
                    case "phone":
                        switch(jsonData.event_data) {
                            case "upload_contacts_completed":
                                model.reloadContacts();
                                pageCreated=false;
                                $(".top_bar").addClass('animated bounceInDown').css("display","block");
                                $(".contacts-container").addClass('animated fadeIn').css("display","block");
                                clearInterval(timerContactsWaiting);
                                if(!contacts_list_temp_setted){
                                    contacts_list_temp_setted=true;
                                    contacts_list_temp = contacts_list;
                                    console.log("contacts_list_temp = contacts_list;");
                                }
                                $(".top_bar #connection_thumb").css('background',"green").attr("data-connection","Device Connected");
                                new jBox('Tooltip', {attach: '#connection_thumb', getContent: 'data-connection'});
                                break;
                            case "connected":
                                $(".top_bar #connection_thumb").css('background',"green").attr("data-connection","Device Connected");
                                connected=true;
                                break
                            case "disconnected":
                                $(".top_bar #connection_thumb").css('background',"red").attr("data-connection","Device Disconnected");
                                connected=false;
                                break;
                            default:
                                break;
                        }

                        break;
                    default:
                        break;
                }
            }

        }
    });
}

function sendEvent(type,data){
    /*
        Send a event notify to server (the app now is listening for events if connected)
     */
    var packet={};
    packet.event=type;
    packet.event_data=data;
    var codex=deviceId+"_"+currentSessionId;
    $.ajax({
        type:     "post",
        data:     {codex:codex,data: JSON.stringify(packet)},
        cache:    false,
        url:      "http://hcicontactsmanager2017.altervista.org/addNewEvent.php",
        error: function (request, error) {
            console.log(arguments);
        },
        success: function (data) {
            console.log("Added event "+type);
        }
    });
}

function setTooltips() {
    /*
        Set tooltips
     */

    new jBox('Tooltip', {
        attach: '#add_contact_btn',
        content: 'Add a contact'
    });
    new jBox('Tooltip', {
        attach: '#refresh_btn',
        content: 'Refresh the contacts'
    });
    new jBox('Tooltip', {
        attach: '#session_text',
        content: 'Current session ID'
    });
    new jBox('Tooltip', {
        attach: '#search_btn',
        content: 'Search between any fields in contacts'
    });
    new jBox('Tooltip', {
        attach: '#save_btn',
        content: 'Save current contact list'
    });
    new jBox('Tooltip', {
        attach: '#filter_name',
        content: 'Filter by name'
    });
    new jBox('Tooltip', {
        attach: '#filter_number',
        content: 'Filter by principal number'
    });
    new jBox('Tooltip', {
        attach: '#filter_birthday',
        content: 'Filter by birthday'
    });
    new jBox('Tooltip', {
        attach: '#filter_email',
        content: 'Filter by principal email'
    });
    new jBox('Tooltip', {
        attach: '.details_options',
        content: 'See details'
    });
    new jBox('Tooltip', {
        attach: '.sms_options',
        content: 'Send a sms'
    });
}

function setTopBarActions(){
    /*
        Set top bar click event
     */
    $('#refresh_btn').on("mouseup",function () {
        new jBox('Notice', {
            content: 'I\'m down here!',
            color: 'black',
            attributes: {
                x: 'right',
                y: 'bottom'
            }
        });
        console.log("User want refresh contacts");
        refreshContacts();
    });
    $(".search_container input").keydown(function(){
        clearTimeout(timerSearch);
        timerSearch = setTimeout(searchNext, 800)
    });
    $('#add_contact_btn').on("mouseup",function () {

        console.log("New User Popup -> "+connected);

        if(!connected){
            $.alert({title:'Warning',content:'Your device is disconnected: you can add a contact, but the request will sent on the next device connection.',theme:'red'});
        }

        if (!newPopup) {
            newPopup=true;
            newUserModal.close();

            newUserModal.open();
            $('.details_new_wrapper').find('#details_displayName').val('');
            $('.details_new_wrapper').find('#details_nickname').val('');
            $('.details_new_wrapper').find('#details_emails').val('');
            $('.details_new_wrapper').find('#details_phoneNumbers').val('');
            $('.details_new_wrapper').find('#details_addresses').val('');
            $('.details_new_wrapper').find('#details_birthday').val('');
            $('.details_new_wrapper').find('#details_note').val('');
            $('.details_new_wrapper').find('#details_organizations').val('');
            $('.details_new_wrapper').find('#details_urls').val('');
            $('.details_new_wrapper').find('.details_new_confirm').on("click", function (ev) {
                ev.preventDefault();
                var contact = {
                    displayName: $('.details_new_wrapper').find('#details_displayName').val(),
                    nickname: $('.details_new_wrapper').find('#details_nickname').val(),
                    emails: $('.details_new_wrapper').find('#details_emails').val(),
                    phoneNumbers: $('.details_new_wrapper').find('#details_phoneNumbers').val(),
                    addresses: $('.details_new_wrapper').find('#details_addresses').val(),
                    birthday: $('.details_new_wrapper').find('#details_birthday').val(),
                    note: $('.details_new_wrapper').find('#details_note').val(),
                    organizations: $('.details_new_wrapper').find('#details_organizations').val(),
                    urls: $('.details_new_wrapper').find('#details_url').val()
                };
                sendEvent("new", (contact));
                $(".jBox-wrapper").css("display","none")
                $(".jBox-overlay").css("display","none")

                var a_contact = new Contact(
                    0,
                    contact.displayName,
                    contact.nickname,
                    (contact.phoneNumbers.length>0)?contact.phoneNumbers.split(','):contact.phoneNumbers,
                    (contact.emails.length>0)?contact.emails.split(','):contact.emails,
                    (contact.addresses.length>0)?contact.addresses.split(','):contact.addresses,
                    contact.organizations,
                    contact.birthday,
                    contact.note,
                    contact.categories,
                    contact.urls
                );
                contacts_list.push(a_contact);
                contacts_list_temp.push(a_contact);
                pageCreated = false;
                createPage();
                newUserModal.close();
                $.alert({title:'Done!',content:'Request sent to your device!',theme:'green'});
            });
            newPopup=false;
        }
    });
    $("#save_btn").on("mouseup",function () {
        justSaved=false;
        if(!justSaved){
            $.confirm({
                title: 'Save current session?',
                content: 'Saving current session you can see your contacts later, without the app support',
                buttons: {
                    confirm: function () {
                        justSaved=true;
                        let d = (new Date());
                        let month = ((d.getMonth()+1)<10)?("0"+(d.getMonth()+1)):(d.getMonth()+1);
                        let currentDate = d.getFullYear()+"/"+month+"/"+d.getDate()+" "+d.getHours()+":"+d.getMinutes();
                        console.log("Saving session on "+currentDate)
                        Cookies.clear('sessionID');
                        Cookies.clear('dateSession');
                        Cookies.set('sessionID', model.sessionId, {expiry : new Date(2042, 0, 1)});
                        Cookies.set('dateSession', currentDate, {expiry : new Date(2042, 0, 1)});

                        for(var index=0;index<contacts_list.length;index++){
                            Cookies.clear("tags_"+contacts_list[index].id);
                            var count = $("#tags_" + contacts_list[index].id +" a").length;
                            //console.log(contacts_list[index].displayName+" has "+count+" tags");
                            if(count>0)
                            {
                                var tags_list = [];
                                $("#tags_" + contacts_list[index].id).children('a').each(function () {
                                    let tag=this.text.slice(0, -1);;
                                    tags_list.push(tag);

                                });
                                Cookies.set("tags_"+contacts_list[index].id,tags_list);
                            }
                        }

                    },
                    cancel: function () {}
                }
            });
        }else{
            $.alert({
                title: 'Session saved',
                content: 'Session '+model.sessionId+"already saved"
            });
        }
    });
}

function setHtml() {
    /*
        Set the html content
     */
    $(".is-ancestor").html("");
    var rows = Math.ceil(contacts_list.length/4);
    for(var i=0;i<rows;i++){
        $(".is-ancestor").append("<div id='tileRow"+i+"' class='tile is-parent is-horizontal'>");
        for(var j=(i*4);j<(i*4+4);j++){
            if(contacts_list[j]==undefined){break;}
            var num = (contacts_list[j].phoneNumbers[0]===undefined)?(""):(contacts_list[j].phoneNumbers[0]);
            $("#tileRow"+i).append("<article class='tile is-child box contact'>" +
                "<div class='contacts_info'>" +
                "<span id='nickname_cont_"+contacts_list[j].id+"'>"+
                "<img id='nickname_btn_img_"+contacts_list[j].id+"' src='images/nickname_btn.png'>"+
                "</span>"+
                "<span id='emails_cont_"+contacts_list[j].id+"'>"+
                "<img id='emails_btn_img_"+contacts_list[j].id+"' src='images/emails_btn.png'>"+
                "</span>"+
                "<span id='phoneNumbers_cont_"+contacts_list[j].id+"'>"+
                "<img id='phoneNumbers_btn_img_"+contacts_list[j].id+"' src='images/phoneNumbers_btn.png'>"+
                "</span>"+
                "<span id='addresses_cont_"+contacts_list[j].id+"'>"+
                "<img id='addresses_btn_img_"+contacts_list[j].id+"' src='images/addresses_btn.png'>"+
                "</span>"+
                "<span id='organizations_cont_"+contacts_list[j].id+"'>"+
                "<img id='organizations_btn_img_"+contacts_list[j].id+"' src='images/organizations_btn.png'>"+
                "</span>"+
                "<span id='birthday_cont_"+contacts_list[j].id+"'>"+
                "<img id='birthday_btn_img_"+contacts_list[j].id+"' src='images/birthday_btn.png'>"+
                "</span>"+
                "<span id='note_cont_"+contacts_list[j].id+"'>"+
                "<img id='note_btn_img_"+contacts_list[j].id+"' src='images/note_btn.png'>"+
                "</span>"+
                "<span id='urls_cont_"+contacts_list[j].id+"'>"+
                "<img id='urls_btn_img_"+contacts_list[j].id+"' src='images/urls_btn.png'>"+
                "</span>"+
                "<span class='categories_cont' id='categories_cont_"+contacts_list[j].id+"'>"+
                "<img id='categories_btn_img_"+contacts_list[j].id+"' src='images/categories_btn.png'>"+
                "</span>"+
                "</div>"+
                "<div class='column'>" +
                "<img src='http://icons.iconarchive.com/icons/blackvariant/button-ui-system-apps/1024/Contacts-icon.png'>" +
                "<p>"+contacts_list[j].displayName+"</p>"+
                "<p>"+num+"</p>"+
                "</div>"+
                "<div class='tag_add_cont' id='tag_add_cont"+contacts_list[j].id+"'>"+
                "<input id='tag_add_"+contacts_list[j].id+"' type='textbox' placeholder='Add a tag for "+contacts_list[j].displayName.split(" ")[0]+"'>"+
                "</div>"+
                "<div class='contact_tags' id='tags_"+contacts_list[j].id+"'>" +
                "<p class='no_tags_notice'>No tags</p>"+
                "</div>"+
                "<div class='contact_options'>" +
                "<span class='options' id='sms_cont_"+contacts_list[j].id+"'>"+
                "<img class='sms_options' id='sms_btn_img_"+contacts_list[j].id+"' src='images/sms_btn.png'>"+
                "</span>"+
                "<span class='options' id='details_cont_"+contacts_list[j].id+"'>"+
                "<img class='details_options' id='details_btn_img_"+contacts_list[j].id+"' src='images/details_btn.png'>"+
                "</span>"+
                "</div>"+
                "</article>");

            $('#tag_add_'+contacts_list[j].id).attr("data-array-index",j);
            $("#tag_add_"+contacts_list[j].id).on("keyup",function (e) {
                let index = $(this).attr("data-array-index");
                if (e.which === 13) {
                    console.log("tag "+this.value)
                    $("#tags_"+contacts_list[index].id+" p").css("display","none");
                    $("#tags_"+contacts_list[index].id)
                        .append("<a href='#' class='tag' id='tag_"+this.value+"' data-contact-id='"+contacts_list[index].id+"' data-tag='"+this.value+"'>"  + this.value
                            +'<span class="cross" id="del_tag_'+contacts_list[index].id+'_'+this.value+'">X</span>'+ "</a>");

                    $("#del_tag_"+contacts_list[index].id+"_"+this.value).on("click",function () {
                        let tag_a = $(this).parent();
                        tag_a.remove();
                        var count = $("#tags_" + contacts_list[index].id +" a").length;
                        console.log("removing " + tag_a.attr("data-tag") + " -> " + count);
                        if(count<=0){
                            $("#tags_"+contacts_list[index].id+" p").css("display","block");
                        }else{
                            $("#tags_"+contacts_list[index].id+" p").css("display","none");
                        }
                    });

                    if(tagsMap['tags_'+contacts_list[index].id]==undefined){
                        tagsMap['tags_'+contacts_list[index].id]=[];
                        tagsMap['tags_'+contacts_list[index].id].push(this.value);
                    }else{
                        tagsMap['tags_'+contacts_list[index].id].push(this.value);
                    }

                    $(this).val("");
                }
            });

            deleteUserModal = new jBox('Modal', {
                attach: '#details_cont_'+contacts_list[j].id,
                content: $("#details_popup_template").html(),
                addClass: 'details_wrapper_'+contacts_list[j].id
            });

            $('#sms_cont_'+contacts_list[j].id).attr("data-array-index",j);
            $('#sms_cont_'+contacts_list[j].id).on("click",function () {
                if(!connected){
                    $.alert({title:'Warning',content:'Your device is disconnected: you can send a sms, but the request will sent on the next device connection.',theme:'red'});
                }
                var index = $(this).attr("data-array-index");
                $.confirm({
                    title: 'Send sms to '+contacts_list[index].displayName,
                    content: '' +
                    '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<label>Enter something here</label>' +
                    '<input type="text" placeholder="Sms" class="sms form-control" required />' +
                    '</div>' +
                    '</form>',
                    buttons: {
                        formSubmit: {
                            text: 'Send',
                            btnClass: 'btn-blue',
                            action: function () {
                                var smsText = this.$content.find('.sms').val();
                                if (!smsText) {
                                    $.alert('Provide a valid sms');
                                    return false;
                                }else{
                                    sendEvent("sms", {receiver: contacts_list[index].phoneNumbers[0], text: smsText});
                                    $.alert({title: 'Message sent', content: 'Request to send message sent'});
                                    return true;
                                }
                            }
                        },
                        cancel: function () {
                            //close
                        },
                    },
                    onContentReady: function () {
                        // bind to events
                        var jc = this;
                        this.$content.find('form').on('submit', function (e) {
                            e.preventDefault();
                            jc.$$formSubmit.trigger('click');
                        });
                    }
                });
            });


            $("#details_cont_"+contacts_list[j].id).attr("data-array-index",j);
            $("#details_cont_"+contacts_list[j].id).on("click",function () {
                new jBox('Tooltip', {
                    attach: '.details_delete_user',
                    content: 'Delete the contact'
                });
                new jBox('Tooltip', {
                    attach: '.details_edit_user',
                    content: 'Edit the contact'
                });
                var index = $(this).attr("data-array-index");
                $('.details_wrapper_'+contacts_list[index].id).find('.details_name').html(contacts_list[index].displayName);
                $('.details_wrapper_'+contacts_list[index].id).find('#details_displayName').html(contacts_list[index].displayName);
                $('.details_wrapper_'+contacts_list[index].id).find('#details_nickname').html(contacts_list[index].nickname);
                $('.details_wrapper_'+contacts_list[index].id).find('#details_emails').html(contacts_list[index].emails.toString());
                $('.details_wrapper_'+contacts_list[index].id).find('#details_phoneNumbers').html(contacts_list[index].phoneNumbers.toString());
                $('.details_wrapper_'+contacts_list[index].id).find('#details_addresses').html(contacts_list[index].addresses);
                $('.details_wrapper_'+contacts_list[index].id).find('#details_birthday').html(contacts_list[index].birthday);
                $('.details_wrapper_'+contacts_list[index].id).find('#details_note').html(contacts_list[index].note);
                $('.details_wrapper_'+contacts_list[index].id).find('#details_organizations').html(contacts_list[index].organizations.toString());
                $('.details_wrapper_'+contacts_list[index].id).find('#details_url').html(contacts_list[index].urls.toString());

                $('.details_wrapper_'+contacts_list[index].id).find('.details_edit_user').attr("data-array-index",index);
                $('.details_wrapper_'+contacts_list[index].id).find('.details_delete_user').attr("data-array-index",index);
                $('.details_wrapper_'+contacts_list[index].id).find('.details_delete_user').on("click",function () {
                    console.log("Deleting "+contacts_list[index].displayName);
                    console.log("Deleting "+modalDetails);

                    if(!connected){
                        $.alert({title:'Warning',content:'Your device is disconnected: you can delete the contact, but the request will sent on the next device connection.',theme:'red'});
                    }

                    deleteUserModal.hide();
                    $.confirm({
                        title: 'Do you really want to delete '+contacts_list[index].displayName+'?',
                        content: '',
                        autoClose: 'cancelAction|5000',
                        type: 'red',
                        boxWidth:'50%',
                        typeAnimated: true,
                        buttons: {
                            deleteUser: {
                                text: 'Yes, delete it',
                                action: function () {
                                    sendEvent("delete",contacts_list[index].id);
                                    $(".jBox-wrapper").css("display","none")
                                    $(".jBox-overlay").css("display","none")
                                    $.alert({title:'Done!',content:'Request sent to your device!',theme:'green'});
                                }
                            },
                            cancelAction: function () {
                            }
                        }
                    });
                });

                $('.details_wrapper_'+contacts_list[index].id).find('.details_edit_user').on("click",function () {
                    $.alert({title:'Functionality not supported',content:'Editing a contact is not already supported.',theme:'red'});
                });

/*
                              new jBox('Modal', {
                                  attach: $('.details_wrapper_'+contacts_list[index].id).find('.details_edit_user'),
                                  content: $("#details_edit_popup_template").html(),
                                  addClass: 'details_edit_wrapper_'+cots_list[index].id
                              });
                              /*
                                              $('.details_wrapper_'+contacts_list[index].id).find('.details_edit_user').on("click",function () {
                                                  console.log("Editing "+contacts_list[index].displayName);
                                                  //modalDetails.hide();
                                                  $('.details_edit_wrapper_'+contacts_list[index].id).find('.details_name').val('Edit contact: '+contacts_list[index].displayName);
                                                  $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_displayName').val(contacts_list[index].displayName);
                                                  $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_nickname').val(contacts_list[index].nickname);
                                                  $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_emails').val(contacts_list[index].emails.toString());
                                                  $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_phoneNumbers').val(contacts_list[index].phoneNumbers.toString());
                                                  $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_addresses').val(contacts_list[index].addresses);
                                                  $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_birthday').val(contacts_list[index].birthday);
                                                  $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_note').val(contacts_list[index].note);
                                                  $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_organizations').val(contacts_list[index].organizations.toString());
                                                  $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_url').val(contacts_list[index].urls.toString());
                                                  $('.details_edit_wrapper_'+contacts_list[index].id).find('.details_edit_confirm').on("click",function () {

                                                      if(!connected){
                                                          $.alert({title:'Warning',content:'Your device is disconnected: you can edit the contact, but the request will sent on the next device connection.',theme:'red'});
                                                      }

                                                      var contact = {
                                                          id: contacts_list[index].id,
                                                          displayName: $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_displayName').val(),
                                                          nickname: $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_nickname').val(),
                                                          emails: $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_emails').val(),
                                                          phoneNumbers: $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_phoneNumbers').val(),
                                                          addresses: $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_addresses').val(),
                                                          birthday: $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_birthday').val(),
                                                          note: $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_note').val(),
                                                          organizations: $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_organizations').val(),
                                                          urls: $('.details_edit_wrapper_'+contacts_list[index].id).find('#details_url').val()
                                                      };
                                                      $.confirm({
                                                          title: 'Save '+contacts_list[index].displayName+'?',
                                                          content: '',
                                                          autoClose: 'cancelAction|5000',
                                                          type: 'orange',
                                                          boxWidth:'50%',
                                                          typeAnimated: true,
                                                          buttons: {
                                                              editContact: {
                                                                  text: 'Yes, edit it',
                                                                  action: function () {
                                                                      console.log("Send edit:\n"+JSON.stringify(contact))
                                                                      sendEvent("edit",(contact));
                                                                      $(".jBox-wrapper").css("display","none")
                                                                      $(".jBox-overlay").css("display","none")
                                                                      $.alert({title:'Done!',content:'Request sent to your device!',theme:'green'});
                                                                      contacts_list[index].displayName = contact.displayName;
                                                                      contacts_list[index].nickname = contact.nickname;
                                                                      contacts_list[index].emails = contact.emails;
                                                                      contacts_list[index].phoneNumbers = contact.phoneNumbers;
                                                                      contacts_list[index].addresses = contact.addresses;
                                                                      contacts_list[index].birthday = contact.birthday;
                                                                      contacts_list[index].note = contact.note;
                                                                      contacts_list[index].organizations = contact.organizations;
                                                                      contacts_list[index].urls = contact.urls;
                                                                      $('.details_wrapper_'+contacts_list[index].id).find('.details_name').html(contacts_list[index].displayName);
                                                                      $('.details_wrapper_'+contacts_list[index].id).find('#details_displayName').html(contacts_list[index].displayName);
                                                                      $('.details_wrapper_'+contacts_list[index].id).find('#details_nickname').html(contacts_list[index].nickname);
                                                                      $('.details_wrapper_'+contacts_list[index].id).find('#details_emails').html(contacts_list[index].emails.toString());
                                                                      $('.details_wrapper_'+contacts_list[index].id).find('#details_phoneNumbers').html(contacts_list[index].phoneNumbers.toString());
                                                                      $('.details_wrapper_'+contacts_list[index].id).find('#details_addresses').html(contacts_list[index].addresses);
                                                                      $('.details_wrapper_'+contacts_list[index].id).find('#details_birthday').html(contacts_list[index].birthday);
                                                                      $('.details_wrapper_'+contacts_list[index].id).find('#details_note').html(contacts_list[index].note);
                                                                      $('.details_wrapper_'+contacts_list[index].id).find('#details_organizations').html(contacts_list[index].organizations.toString());
                                                                      $('.details_wrapper_'+contacts_list[index].id).find('#details_url').html(contacts_list[index].urls.toString());
                                                                  }
                                                              },
                                                              cancelAction: function () {
                                                              }
                                                          }
                                                      });
                                                  });

                                              });
                              */
            });
            // TOP BAR
            if(contacts_list[j].nickname!=""&&contacts_list[j].nickname!=null){
                new jBox('Tooltip', {
                    attach: '#nickname_btn_img_'+contacts_list[j].id,
                    content: contacts_list[j].nickname
                });
            }else{
                $("#nickname_cont_"+contacts_list[j].id).css("display","none");
            }
            if((contacts_list[j].emails[0] != undefined)&&contacts_list[j].emails!=null){
                new jBox('Tooltip', {
                    attach: '#emails_btn_img_'+contacts_list[j].id,
                    content: ''+contacts_list[j].emails
                });
            }else{
                $("#emails_cont_"+contacts_list[j].id).css("display","none");
            }
            if(contacts_list[j].phoneNumbers[0] != undefined&&contacts_list[j].phoneNumbers!=null){
                new jBox('Tooltip', {
                    attach: '#phoneNumbers_btn_img_'+contacts_list[j].id,
                    content: ''+contacts_list[j].phoneNumbers
                });
            }else{
                $("#phoneNumbers_cont_"+contacts_list[j].id).css("display","none");
            }
            if(contacts_list[j].addresses[0] != undefined&&contacts_list[j].addresses!=null){
                new jBox('Tooltip', {
                    attach: '#addresses_btn_img_'+contacts_list[j].id,
                    content: ''+contacts_list[j].addresses
                });
            }else{
                $("#addresses_cont_"+contacts_list[j].id).css("display","none");
            }
            if(contacts_list[j].organizations[0] != undefined&&contacts_list[j].organizations!=null){
                new jBox('Tooltip', {
                    attach: '#organizations_btn_img_'+contacts_list[j].id,
                    content: ''+contacts_list[j].organizations
                });
            }else{
                $("#organizations_cont_"+contacts_list[j].id).css("display","none");
            }
            if(contacts_list[j].birthday!=""&&contacts_list[j].birthday!=null){
                new jBox('Tooltip', {
                    attach: '#birthday_btn_img_'+contacts_list[j].id,
                    content: contacts_list[j].birthday
                });
            }else{
                $("#birthday_cont_"+contacts_list[j].id).css("display","none");
            }
            if(contacts_list[j].note!=""&&contacts_list[j].note!=null){
                new jBox('Tooltip', {
                    attach: '#note_btn_img_'+contacts_list[j].id,
                    content: contacts_list[j].note
                });
            }else{
                $("#note_cont_"+contacts_list[j].id).css("display","none");
            }
            if(contacts_list[j].urls != undefined&&contacts_list[j].urls[0] != undefined&&contacts_list[j].urls!=null){

                new jBox('Tooltip', {
                    attach: '#urls_btn_img_'+contacts_list[j].id,
                    content: ''+contacts_list[j].urls
                });
            }else{
                $("#urls_cont_"+contacts_list[j].id).css("display","none");
            }
            if(contacts_list[j].categories!=undefined&&contacts_list[j].categories[0] != undefined&&contacts_list[j].categories!=null){

                new jBox('Tooltip', {
                    attach: '#categories_btn_img_'+contacts_list[j].id,
                    content: ''+contacts_list[j].categories
                });
            }else{
                $("#categories_cont_"+contacts_list[j].id).css("display","none");
            }

        }
        $(".is-ancestor").append("</div>");
    }
}
function createPage() {
    /*
        Create the page (html content + interactions)
     */
    if(pageCreated){return;}
    toStopLoading=true;
    $(".search_container").addClass('animated bounceInDown').css("display", "block");
    $(".filters").on("click",function () {
        $(".filters").css("background","none");
        $(this).css("background","rgba(93, 220, 108,0.75)");

        filterContacts($(this).attr("id"));
    });

    model.checkContacts();
    contacts_list.sort(model.compareName);

    $("#bar_number_contacts").html(contacts_list.length+" contacts");

    setHtml();
    setTags();
    setTopBarActions();
    setTooltips();

    $(".loading").addClass('animated fadeOut').css("display","none");
    loader.stop();
    pageCreated=true;


}

function setTags() {
    /*
        Set the tags
     */
    Array.prototype.unique = function() {
        var a = this.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    };
    for(var k =0;k<contacts_list.length;k++){
        var tags=[];
        if(Cookies.get("tags_"+contacts_list[k].id)!=undefined||tagsMap['tags_'+contacts_list[k].id]!=undefined){
            if(Cookies.get("tags_"+contacts_list[k].id)!=undefined){
                tags = Cookies.get("tags_"+contacts_list[k].id).split(",");
            }
            if(tagsMap['tags_'+contacts_list[k].id]!=undefined){
                tags = tags.concat(tagsMap['tags_'+contacts_list[k].id]).unique();
            }
            for (var j=0;j<tags.length;j++){
                let index = k;
                    $("#tags_"+contacts_list[index].id+" p").css("display","none");
                    $("#tags_"+contacts_list[index].id)
                        .append("<a href='#' class='tag' id='tag_"+tags[j]+"' data-contact-id='"+contacts_list[index].id+"' data-tag='"+tags[j]+"'>"  + tags[j]
                            +'<span class="cross" id="del_tag_'+contacts_list[index].id+'_'+tags[j]+'">X</span>'+ "</a>");

                    $("#del_tag_"+contacts_list[index].id+"_"+tags[j]).on("click",function () {
                        let tag_a = $(this).parent();
                        tag_a.remove();
                        var count = $("#tags_" + contacts_list[index].id +" a").length;
                        if(count<=0){
                            $("#tags_"+contacts_list[index].id+" p").css("display","block");
                        }else{
                            $("#tags_"+contacts_list[index].id+" p").css("display","none");
                        }
                    });
            }
        }
    }
}

function filterContacts(filter) {
    /*
        Filter the contacts by selected filter
     */
    $(".is-ancestor").html("");
    setLoader();
    model.sortContacts(filter);

    var time = (filter=="filter_name"||filter=="filter_number")?1000:2000;
    let finishFiltering = setInterval(function () {
        if(!filtering){
            pageCreated=false;

            setTooltips();
            setTopBarActions();
            setHtml();
            setTags();

            $(".loading").addClass('animated fadeOut').css("display","none");
            clearInterval(finishFiltering);
        }
    },time);

}

function removeDuplicates(arr){
    /*
        Utility: remove duplicates from an array
     */
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}