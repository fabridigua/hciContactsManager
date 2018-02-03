class Model {
    /*
        DEMO VERSION: there are dummy contacts, generated with https://www.mockaroo.com/
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
                    contactsJSON = JSON.parse('[{"id":"1","displayName":"Arabela Pickton","nickname":"Mélanie","emails":["apickton0@sciencedaily.com","apickton0@technorati.com"],"phoneNumbers":["97329203"],"addresses":["01605 Arizona Center"],"organizations":["Wordtune"],"birthday":"1988/11/26","note":"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.","categories":[],"urls":["adobe.com/pede/venenatis/non/sodales/sed/tincidunt.jpg"]},{"id":"2","displayName":"Gardie Gocke","nickname":null,"emails":["ggocke1@cornell.edu"],"phoneNumbers":["82693337"],"addresses":[],"organizations":["DabZ"],"birthday":"1981/06/07","note":null,"categories":["needs-based"],"urls":[]},{"id":"3","displayName":"Clevey MacDougall","nickname":"Cléopatre","emails":["cmacdougall2@globo.com"],"phoneNumbers":["36570555"],"addresses":["71762 Meadow Ridge Hill","45 Gina Street"],"organizations":["Katz"],"birthday":"1977/04/24","note":null,"categories":[],"urls":[]},{"id":"4","displayName":"Gray Boodell","nickname":"Médiamass","emails":[],"phoneNumbers":["46003841"],"addresses":["769 Arkansas Lane","894 Dorton Lane"],"organizations":[],"birthday":"1975/01/23","note":null,"categories":[],"urls":["vkontakte.ru/ut/at/dolor/quis.js"]},{"id":"5","displayName":"Darrin Shillington","nickname":"Laurélie","emails":["dshillington4@va.gov","dshillington4@123-reg.co.uk"],"phoneNumbers":["82697868"],"addresses":[],"organizations":["Minyx"],"birthday":"1980/07/26","note":null,"categories":[],"urls":["xrea.com/iaculis/diam/erat/fermentum.xml"]},{"id":"6","displayName":"Nancy Clitheroe","nickname":"Lèi","emails":["nclitheroe5@51.la"],"phoneNumbers":["96113642"],"addresses":["9065 Butternut Junction","7 Raven Pass"],"organizations":["Skidoo"],"birthday":"1976/05/02","note":"In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.","categories":[],"urls":["chronoengine.com/dapibus/at/diam/nam.jsp"]},{"id":"7","displayName":"Bond Heys","nickname":"Cléa","emails":["bheys6@google.es","bheys6@discovery.com"],"phoneNumbers":["30201076"],"addresses":["7302 Butterfield Plaza","01 Harbort Avenue"],"organizations":["Fanoodle"],"birthday":"1976/01/28","note":null,"categories":[],"urls":[]},{"id":"8","displayName":"Etheline Sharrocks","nickname":"Ruò","emails":[],"phoneNumbers":["24728544"],"addresses":[],"organizations":[],"birthday":"1984/03/13","note":"Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.","categories":[],"urls":[]},{"id":"9","displayName":"Orsola Ruffell","nickname":"Vérane","emails":[],"phoneNumbers":["86229272"],"addresses":[],"organizations":[],"birthday":"1995/10/11","note":null,"categories":[],"urls":["howstuffworks.com/vestibulum/vestibulum/ante/ipsum/primis/in.xml"]},{"id":"10","displayName":"Natal Gibbeson","nickname":null,"emails":["ngibbeson9@nifty.com","ngibbeson9@so-net.ne.jp"],"phoneNumbers":["63155529"],"addresses":["90 Schiller Center"],"organizations":[],"birthday":"1976/08/16","note":null,"categories":[],"urls":[]},{"id":"11","displayName":"Elke Botterill","nickname":"Faîtes","emails":["ebotterilla@mashable.com"],"phoneNumbers":["79200862"],"addresses":["1 La Follette Center"],"organizations":["Ainyx"],"birthday":"1985/04/28","note":null,"categories":["Mandatory"],"urls":[]},{"id":"12","displayName":"Chester McCloid","nickname":"Océane","emails":["cmccloidb@addthis.com","cmccloidb@rakuten.co.jp"],"phoneNumbers":["68466551"],"addresses":[],"organizations":[],"birthday":"1996/10/20","note":"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.","categories":["Robust"],"urls":[]},{"id":"13","displayName":"Farr Riha","nickname":"Marie-hélène","emails":[],"phoneNumbers":["81712713"],"addresses":["81326 Eagle Crest Place"],"organizations":["Thoughtmix"],"birthday":"1972/05/28","note":"Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.","categories":["circuit"],"urls":["lycos.com/nisi/at/nibh/in.jsp"]},{"id":"14","displayName":"Paulette Stych","nickname":"Maéna","emails":[],"phoneNumbers":["58597309"],"addresses":["855 Acker Circle"],"organizations":["Yakitri"],"birthday":"1996/03/07","note":"","categories":[],"urls":["bigcartel.com/lacus.png"]},{"id":"15","displayName":"Sheelagh Kinnear","nickname":"Laurélie","emails":["skinneare@nifty.com"],"phoneNumbers":["21782823"],"addresses":["216 Mandrake Terrace","4119 Myrtle Junction"],"organizations":[],"birthday":"1982/11/20","note":null,"categories":["Extended"],"urls":["google.com.au/eget/semper.aspx"]},{"id":"16","displayName":"Tucky Kibble","nickname":null,"emails":["tkibblef@harvard.edu","tkibblef@hc360.com"],"phoneNumbers":["45901060"],"addresses":[],"organizations":[],"birthday":"1979/04/21","note":null,"categories":[],"urls":["yahoo.com/curabitur/at.html"]},{"id":"17","displayName":"Andrej Bilsborrow","nickname":null,"emails":["abilsborrowg@theglobeandmail.com","abilsborrowg@answers.com"],"phoneNumbers":["37632762"],"addresses":["62813 Garrison Drive"],"organizations":["Zoonoodle"],"birthday":"1995/11/02","note":null,"categories":["support"],"urls":[]},{"id":"18","displayName":"Joli Kores","nickname":null,"emails":["jkoresh@soundcloud.com","jkoresh@mozilla.com"],"phoneNumbers":["36446470"],"addresses":["036 Talisman Hill","32874 Graceland Road"],"organizations":[],"birthday":"1992/11/03","note":null,"categories":["motivating"],"urls":["lycos.com/neque/libero/convallis.jpg"]},{"id":"19","displayName":"Tania Adshed","nickname":"Illustrée","emails":["tadshedi@amazon.co.jp"],"phoneNumbers":["36827314"],"addresses":["85165 Sheridan Plaza"],"organizations":[],"birthday":"1997/06/02","note":null,"categories":[],"urls":[]},{"id":"20","displayName":"Broddie Cadell","nickname":"Ruò","emails":["bcadellj@jalbum.net"],"phoneNumbers":["96341333"],"addresses":["4 Scoville Terrace"],"organizations":[],"birthday":"1994/03/18","note":null,"categories":[],"urls":["uol.com.br/magna/vestibulum/aliquet/ultrices/erat.png"]},{"id":"21","displayName":"Rudie Trench","nickname":"Erwéi","emails":[],"phoneNumbers":["32119105"],"addresses":["0 Ridgeway Way","23365 Del Sol Crossing"],"organizations":[],"birthday":"1980/09/10","note":null,"categories":[],"urls":[]},{"id":"22","displayName":"Onfre Korneichuk","nickname":"Léone","emails":["okorneichukl@youku.com","okorneichukl@tinypic.com"],"phoneNumbers":["63247834"],"addresses":["45904 Sullivan Drive"],"organizations":["Photobug"],"birthday":"1991/02/07","note":null,"categories":[],"urls":["delicious.com/dolor/morbi.html"]},{"id":"23","displayName":"Ashla Huddles","nickname":"Gisèle","emails":["ahuddlesm@privacy.gov.au"],"phoneNumbers":["30593506"],"addresses":[],"organizations":["Chatterpoint"],"birthday":"1972/12/04","note":null,"categories":["architecture"],"urls":[]},{"id":"24","displayName":"Shana Ithell","nickname":"Maéna","emails":["sithelln@si.edu"],"phoneNumbers":["52117454"],"addresses":["2992 Porter Way"],"organizations":["Oyonder"],"birthday":"1994/11/29","note":null,"categories":[],"urls":[]},{"id":"25","displayName":"Alexandr Goldhawk","nickname":"Mà","emails":["agoldhawko@latimes.com"],"phoneNumbers":["53443563"],"addresses":[],"organizations":["Livetube"],"birthday":"1985/03/31","note":null,"categories":[],"urls":["t-online.de/ut/ultrices/vel/augue/vestibulum/ante.jpg"]},{"id":"26","displayName":"Janenna Craigg","nickname":null,"emails":["jcraiggp@github.com"],"phoneNumbers":["33019089"],"addresses":[],"organizations":[],"birthday":"1983/12/14","note":null,"categories":[],"urls":["state.tx.us/aliquam.aspx"]},{"id":"27","displayName":"Clarissa Hammell","nickname":null,"emails":["chammellq@wikia.com"],"phoneNumbers":["96812618"],"addresses":[],"organizations":[],"birthday":"1988/09/17","note":null,"categories":[],"urls":[]},{"id":"28","displayName":"Fayette Eastmond","nickname":"Eléonore","emails":["feastmondr@mozilla.com","feastmondr@craigslist.org"],"phoneNumbers":["20013447"],"addresses":[],"organizations":[],"birthday":"1977/10/18","note":"","categories":["User-friendly"],"urls":[]},{"id":"29","displayName":"Konstantin Danielian","nickname":"Marlène","emails":["kdanielians@google.com.au"],"phoneNumbers":["14406198"],"addresses":["85 Cherokee Circle","6811 Sherman Hill"],"organizations":[],"birthday":"1995/11/01","note":null,"categories":["background"],"urls":[]},{"id":"30","displayName":"Malissia Pedgrift","nickname":"Stéphanie","emails":[],"phoneNumbers":["52105227"],"addresses":["24876 Lake View Parkway","89 Ilene Way"],"organizations":["Rhynyx"],"birthday":"1971/04/22","note":null,"categories":["parallelism"],"urls":[]},{"id":"31","displayName":"Jannel Chisnall","nickname":"Kévina","emails":[],"phoneNumbers":["12015918"],"addresses":["26 Truax Circle","12 American Road"],"organizations":[],"birthday":"1995/10/10","note":null,"categories":["background"],"urls":[]},{"id":"32","displayName":"Augy Phillott","nickname":"Irène","emails":[],"phoneNumbers":["58867019"],"addresses":[],"organizations":["Dynabox"],"birthday":"1995/05/22","note":null,"categories":[],"urls":["live.com/in/blandit/ultrices/enim/lorem.aspx"]},{"id":"33","displayName":"Victor Boulton","nickname":"Eliès","emails":["vboultonw@flavors.me","vboultonw@tinypic.com"],"phoneNumbers":["94200588"],"addresses":["0684 Fairfield Way"],"organizations":["Topicblab"],"birthday":"1974/03/21","note":null,"categories":[],"urls":[]},{"id":"34","displayName":"Hettie Tewelson","nickname":"Océane","emails":[],"phoneNumbers":["98639653"],"addresses":[],"organizations":["Yodel"],"birthday":"1989/09/04","note":"","categories":["optimal"],"urls":[]},{"id":"35","displayName":"Jesse McCathie","nickname":null,"emails":["jmccathiey@walmart.com","jmccathiey@reuters.com"],"phoneNumbers":["33420487"],"addresses":[],"organizations":[],"birthday":"1978/07/05","note":null,"categories":["Open-source"],"urls":[]},{"id":"36","displayName":"Fedora Playden","nickname":null,"emails":["fplaydenz@netlog.com","fplaydenz@histats.com"],"phoneNumbers":["63097196"],"addresses":[],"organizations":["Thoughtstorm"],"birthday":"1992/10/22","note":null,"categories":["multi-state"],"urls":[]},{"id":"37","displayName":"Maxie Slorance","nickname":null,"emails":[],"phoneNumbers":["53375903"],"addresses":[],"organizations":[],"birthday":"1981/08/14","note":null,"categories":["Centralized"],"urls":[]},{"id":"38","displayName":"Christie Ekell","nickname":"Mélia","emails":["cekell11@home.pl","cekell11@odnoklassniki.ru"],"phoneNumbers":["73954264"],"addresses":["4917 Huxley Crossing"],"organizations":["Tavu"],"birthday":"1983/02/01","note":null,"categories":["fresh-thinking"],"urls":[]},{"id":"39","displayName":"Lani Zealander","nickname":"Mà","emails":[],"phoneNumbers":["45508647"],"addresses":[],"organizations":[],"birthday":"1993/02/22","note":null,"categories":["intangible"],"urls":[]},{"id":"40","displayName":"Adrienne Todd","nickname":null,"emails":["atodd13@ucla.edu","atodd13@lycos.com"],"phoneNumbers":["76297444"],"addresses":[],"organizations":["Browsetype"],"birthday":"1971/05/26","note":null,"categories":[],"urls":[]},{"id":"41","displayName":"Aleen Dominguez","nickname":"Mélys","emails":["adominguez14@4shared.com"],"phoneNumbers":["63633041"],"addresses":["545 Muir Trail"],"organizations":["Zooveo"],"birthday":"1994/05/27","note":null,"categories":[],"urls":["toplist.cz/maecenas/rhoncus/aliquam/lacus/morbi.xml"]},{"id":"42","displayName":"Billy Taft","nickname":null,"emails":[],"phoneNumbers":["62332824"],"addresses":[],"organizations":["Midel"],"birthday":"1990/09/13","note":null,"categories":["encoding"],"urls":[]},{"id":"43","displayName":"Mavis Rowney","nickname":"Océane","emails":["mrowney16@hud.gov","mrowney16@weather.com"],"phoneNumbers":["89026176"],"addresses":["275 Sloan Parkway"],"organizations":["Jaxworks"],"birthday":"1996/08/24","note":null,"categories":[],"urls":["icio.us/fusce/congue.xml"]},{"id":"44","displayName":"Stefan Forson","nickname":"Sòng","emails":["sforson17@topsy.com","sforson17@about.com"],"phoneNumbers":["15776977"],"addresses":["82 Sauthoff Drive"],"organizations":[],"birthday":"1975/06/11","note":null,"categories":[],"urls":[]},{"id":"45","displayName":"Liza Olley","nickname":"Léonie","emails":["lolley18@clickbank.net"],"phoneNumbers":["30699810"],"addresses":["050 Morningstar Circle"],"organizations":[],"birthday":"1978/07/09","note":null,"categories":["budgetary management"],"urls":[]},{"id":"46","displayName":"Aveline Blight","nickname":"Angèle","emails":[],"phoneNumbers":["22287915"],"addresses":["2 Orin Trail"],"organizations":["Topiclounge"],"birthday":"1979/01/01","note":null,"categories":["interactive"],"urls":[]},{"id":"47","displayName":"Shep Hulatt","nickname":"Loïs","emails":["shulatt1a@vistaprint.com"],"phoneNumbers":["19725180"],"addresses":[],"organizations":["Oba"],"birthday":"1992/02/06","note":null,"categories":[],"urls":[]},{"id":"48","displayName":"Lyn Blasetti","nickname":"Maïlys","emails":["lblasetti1b@examiner.com"],"phoneNumbers":["17015388"],"addresses":["72002 Claremont Circle"],"organizations":[],"birthday":"1987/07/02","note":"","categories":[],"urls":["shutterfly.com/in/hac/habitasse/platea/dictumst/morbi.jpg"]},{"id":"49","displayName":"Rudolph Mottershead","nickname":"Jú","emails":["rmottershead1c@rambler.ru"],"phoneNumbers":["65261804"],"addresses":["9651 Shasta Trail"],"organizations":["Shufflester"],"birthday":"1978/12/06","note":"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.","categories":[],"urls":[]},{"id":"50","displayName":"Hale Thomasson","nickname":"Crééz","emails":["hthomasson1d@tripod.com","hthomasson1d@wufoo.com"],"phoneNumbers":["41975668"],"addresses":["484 Bonner Circle"],"organizations":["Agimba"],"birthday":"1979/02/13","note":null,"categories":[],"urls":[]},{"id":"51","displayName":"Shalne Alu","nickname":"Cinéma","emails":["salu1e@indiatimes.com"],"phoneNumbers":["64254664"],"addresses":["851 Sage Plaza"],"organizations":[],"birthday":"1994/04/10","note":"","categories":["directional"],"urls":[]},{"id":"52","displayName":"Devan Oakenford","nickname":"Eléa","emails":["doakenford1f@ebay.co.uk","doakenford1f@lulu.com"],"phoneNumbers":["84413443"],"addresses":["80516 Village Terrace","42896 Sutherland Court"],"organizations":[],"birthday":"1985/08/21","note":"","categories":[],"urls":[]},{"id":"53","displayName":"Cloris Hanlon","nickname":"Anaé","emails":["chanlon1g@sphinn.com"],"phoneNumbers":["90727279"],"addresses":["9306 Caliangt Road"],"organizations":[],"birthday":"1972/10/19","note":null,"categories":["Graphic Interface"],"urls":["networkadvertising.org/amet/nulla.png"]},{"id":"54","displayName":"Zedekiah Saynor","nickname":"Lauréna","emails":["zsaynor1h@webs.com"],"phoneNumbers":["34346288"],"addresses":["3 Red Cloud Lane"],"organizations":["Divape"],"birthday":"1970/03/15","note":"","categories":["orchestration"],"urls":["list-manage.com/suspendisse/potenti/cras/in.json"]},{"id":"55","displayName":"Roxine Ruegg","nickname":"Intéressant","emails":["rruegg1i@google.it","rruegg1i@stumbleupon.com"],"phoneNumbers":["80124431"],"addresses":["93 Vahlen Lane","93 Meadow Vale Alley"],"organizations":["Thoughtbridge"],"birthday":"1981/12/20","note":null,"categories":["access"],"urls":[]},{"id":"56","displayName":"Darrick Tommasetti","nickname":null,"emails":["dtommasetti1j@etsy.com","dtommasetti1j@livejournal.com"],"phoneNumbers":["25375038"],"addresses":["2 Warner Circle","8654 Vidon Hill"],"organizations":["Minyx"],"birthday":"1979/07/25","note":null,"categories":["mobile"],"urls":["foxnews.com/donec/pharetra/magna.jsp"]},{"id":"57","displayName":"Isahella Diack","nickname":null,"emails":[],"phoneNumbers":["97356283"],"addresses":["26521 Hollow Ridge Hill"],"organizations":["Thoughtstorm"],"birthday":"1981/08/21","note":null,"categories":[],"urls":["trellian.com/donec/semper/sapien/a/libero/nam/dui.xml"]},{"id":"58","displayName":"Cosme Leupold","nickname":"Magdalène","emails":[],"phoneNumbers":["15622245"],"addresses":["282 Waubesa Junction","82408 Harbort Junction"],"organizations":["Gigabox"],"birthday":"1971/06/23","note":null,"categories":[],"urls":["goo.gl/odio.jpg"]},{"id":"59","displayName":"Korry Gresty","nickname":"Åslög","emails":["kgresty1m@cocolog-nifty.com"],"phoneNumbers":["28745403"],"addresses":["3 Roth Park","6 Anniversary Alley"],"organizations":[],"birthday":"1979/03/04","note":null,"categories":[],"urls":["mit.edu/etiam/vel/augue.jsp"]},{"id":"60","displayName":"Ivie Crowcroft","nickname":"Örjan","emails":["icrowcroft1n@photobucket.com","icrowcroft1n@etsy.com"],"phoneNumbers":["97090328"],"addresses":[],"organizations":[],"birthday":"1995/07/02","note":null,"categories":["zero administration"],"urls":[]},{"id":"61","displayName":"Millisent Capaldo","nickname":"Eléonore","emails":["mcapaldo1o@slate.com"],"phoneNumbers":["68735304"],"addresses":["5649 High Crossing Drive"],"organizations":[],"birthday":"1987/08/14","note":null,"categories":[],"urls":["nytimes.com/sapien/quis/libero.json"]},{"id":"62","displayName":"Elwyn Bysh","nickname":"Pål","emails":[],"phoneNumbers":["50428239"],"addresses":["2 Golf Course Parkway","37 Scott Junction"],"organizations":[],"birthday":"1984/06/23","note":null,"categories":[],"urls":[]},{"id":"63","displayName":"Sidnee Shilstone","nickname":null,"emails":["sshilstone1q@guardian.co.uk"],"phoneNumbers":["89831662"],"addresses":["7703 Fremont Road"],"organizations":[],"birthday":"1984/10/07","note":"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.","categories":[],"urls":[]},{"id":"64","displayName":"Ofilia Kornes","nickname":"Béatrice","emails":["okornes1r@soup.io"],"phoneNumbers":["84023513"],"addresses":["34 Hudson Trail","8274 Ludington Trail"],"organizations":[],"birthday":"1980/11/20","note":null,"categories":["De-engineered"],"urls":["msu.edu/vivamus/vestibulum.html"]},{"id":"65","displayName":"Ruthy Goldsworthy","nickname":null,"emails":["rgoldsworthy1s@webs.com"],"phoneNumbers":["70648719"],"addresses":["26654 Center Parkway"],"organizations":[],"birthday":"1997/01/23","note":null,"categories":[],"urls":["icq.com/lacinia/aenean/sit/amet.png"]},{"id":"66","displayName":"Lissi Garstan","nickname":null,"emails":["lgarstan1t@tumblr.com"],"phoneNumbers":["58537675"],"addresses":[],"organizations":[],"birthday":"1988/11/14","note":null,"categories":[],"urls":[]},{"id":"67","displayName":"Vite Vedyashkin","nickname":"Maëline","emails":["vvedyashkin1u@house.gov","vvedyashkin1u@reuters.com"],"phoneNumbers":["19034085"],"addresses":["39 Namekagon Point","17789 Manufacturers Lane"],"organizations":["Skibox"],"birthday":"1984/09/25","note":null,"categories":[],"urls":["patch.com/sem/fusce/consequat/nulla/nisl/nunc/nisl.xml"]},{"id":"68","displayName":"Eldin Bosma","nickname":"Clélia","emails":["ebosma1v@domainmarket.com"],"phoneNumbers":["40779955"],"addresses":["07 Quincy Alley","7562 2nd Park"],"organizations":[],"birthday":"1982/04/25","note":"","categories":[],"urls":["exblog.jp/augue/aliquam/erat.json"]},{"id":"69","displayName":"Gorden Cowx","nickname":"Joséphine","emails":["gcowx1w@reuters.com","gcowx1w@163.com"],"phoneNumbers":["70477312"],"addresses":[],"organizations":["Thoughtblab"],"birthday":"1994/06/04","note":null,"categories":[],"urls":["themeforest.net/nam/dui/proin/leo/odio/porttitor/id.aspx"]},{"id":"70","displayName":"Lela Madill","nickname":"Mårten","emails":["lmadill1x@wufoo.com","lmadill1x@ycombinator.com"],"phoneNumbers":["65325542"],"addresses":[],"organizations":[],"birthday":"1981/11/30","note":"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.","categories":[],"urls":["is.gd/eget/tempus/vel.png"]},{"id":"71","displayName":"Jayson Iacavone","nickname":"Naëlle","emails":["jiacavone1y@berkeley.edu","jiacavone1y@prlog.org"],"phoneNumbers":["81101868"],"addresses":[],"organizations":["Mybuzz"],"birthday":"1972/06/20","note":null,"categories":[],"urls":[]},{"id":"72","displayName":"Jacqueline Skillman","nickname":null,"emails":["jskillman1z@simplemachines.org"],"phoneNumbers":["98582872"],"addresses":["5598 Dryden Drive"],"organizations":["Feedbug"],"birthday":"1985/04/06","note":"Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.","categories":["interface"],"urls":["usda.gov/nulla.png"]},{"id":"73","displayName":"Leontine Kynsey","nickname":null,"emails":["lkynsey20@typepad.com","lkynsey20@wsj.com"],"phoneNumbers":["42447879"],"addresses":[],"organizations":["Skivee"],"birthday":"1987/11/13","note":null,"categories":["3rd generation"],"urls":["squarespace.com/metus/vitae.aspx"]},{"id":"74","displayName":"Deanna Wrennall","nickname":"Josée","emails":["dwrennall21@gmpg.org"],"phoneNumbers":["81139474"],"addresses":[],"organizations":[],"birthday":"1983/11/18","note":null,"categories":[],"urls":["g.co/ut/massa/quis/augue/luctus/tincidunt.jsp"]},{"id":"75","displayName":"Cammi McGlade","nickname":"Hélène","emails":[],"phoneNumbers":["77545903"],"addresses":["61 Dunning Road","6 Namekagon Drive"],"organizations":[],"birthday":"1979/06/24","note":null,"categories":[],"urls":[]},{"id":"76","displayName":"Chrissy Gain","nickname":"Loïca","emails":[],"phoneNumbers":["97856252"],"addresses":["0039 Arapahoe Alley","54102 Gulseth Road"],"organizations":["Midel"],"birthday":"1980/06/09","note":null,"categories":[],"urls":["indiatimes.com/eu/interdum/eu.aspx"]},{"id":"77","displayName":"Yurik MacAndrew","nickname":"Aimée","emails":[],"phoneNumbers":["97123043"],"addresses":["5595 Fuller Circle","42 Stuart Hill"],"organizations":[],"birthday":"1997/03/08","note":null,"categories":["secondary"],"urls":[]},{"id":"78","displayName":"Chrissie Alexandre","nickname":null,"emails":[],"phoneNumbers":["60621193"],"addresses":[],"organizations":["Skalith"],"birthday":"1975/06/20","note":null,"categories":[],"urls":["usatoday.com/nulla.aspx"]},{"id":"79","displayName":"Mona Craydon","nickname":"Léandre","emails":["mcraydon26@over-blog.com","mcraydon26@discuz.net"],"phoneNumbers":["54124374"],"addresses":["6137 Helena Terrace"],"organizations":[],"birthday":"1970/05/21","note":null,"categories":["superstructure"],"urls":[]},{"id":"80","displayName":"Vidovik Macilhench","nickname":"Ráo","emails":[],"phoneNumbers":["55544206"],"addresses":["032 1st Plaza","91 School Trail"],"organizations":[],"birthday":"1979/03/23","note":null,"categories":[],"urls":["ted.com/enim/blandit/mi/in/porttitor/pede.js"]},{"id":"81","displayName":"Isadore Leakner","nickname":null,"emails":["ileakner28@rambler.ru","ileakner28@icq.com"],"phoneNumbers":["65566966"],"addresses":["190 Warrior Plaza"],"organizations":[],"birthday":"1980/03/08","note":null,"categories":["info-mediaries"],"urls":["rakuten.co.jp/ligula/sit/amet/eleifend.jsp"]},{"id":"82","displayName":"Cobbie Boord","nickname":null,"emails":["cboord29@google.com.au"],"phoneNumbers":["55518412"],"addresses":["4 Shelley Crossing","062 Bunting Point"],"organizations":[],"birthday":"1975/05/13","note":null,"categories":[],"urls":["apple.com/nunc/purus/phasellus/in.png"]},{"id":"83","displayName":"Niven Congdon","nickname":"Renée","emails":[],"phoneNumbers":["33028767"],"addresses":["23 Superior Hill","4 Forest Dale Way"],"organizations":[],"birthday":"1977/05/05","note":"","categories":["customer loyalty"],"urls":["mayoclinic.com/nisl/ut/volutpat/sapien.png"]},{"id":"84","displayName":"Emerson Ales0","nickname":"Lài","emails":["eales2b@usnews.com","eales2b@kickstarter.com"],"phoneNumbers":["95595399"],"addresses":[],"organizations":[],"birthday":"1978/10/23","note":null,"categories":[],"urls":["gizmodo.com/vestibulum/aliquet/ultrices/erat.jpg"]},{"id":"85","displayName":"Alvis Caulcutt","nickname":"Frédérique","emails":["acaulcutt2c@wikispaces.com","acaulcutt2c@posterous.com"],"phoneNumbers":["47128928"],"addresses":[],"organizations":[],"birthday":"1988/08/24","note":null,"categories":["parallelism"],"urls":["cocolog-nifty.com/enim/sit/amet.html"]},{"id":"86","displayName":"Leeanne Shotter","nickname":null,"emails":["lshotter2d@over-blog.com","lshotter2d@census.gov"],"phoneNumbers":["63534949"],"addresses":[],"organizations":["Yambee"],"birthday":"1975/08/14","note":null,"categories":["transitional"],"urls":[]},{"id":"87","displayName":"Cull Radborne","nickname":"Maïwenn","emails":[],"phoneNumbers":["86408704"],"addresses":["08706 Gale Park","9 Fair Oaks Plaza"],"organizations":["Vipe"],"birthday":"1983/08/13","note":null,"categories":[],"urls":["samsung.com/at/dolor/quis/odio/consequat.jpg"]},{"id":"88","displayName":"Avictor Robyns","nickname":"Aimée","emails":["arobyns2f@spiegel.de"],"phoneNumbers":["99778541"],"addresses":[],"organizations":["Abata"],"birthday":"1992/03/20","note":null,"categories":[],"urls":[]},{"id":"89","displayName":"Ofella Frayn","nickname":null,"emails":["ofrayn2g@istockphoto.com"],"phoneNumbers":["89721706"],"addresses":["1597 Kenwood Avenue"],"organizations":[],"birthday":"1988/01/22","note":null,"categories":["Enhanced"],"urls":[]},{"id":"90","displayName":"Hazel Merryweather","nickname":"Bécassine","emails":[],"phoneNumbers":["50380587"],"addresses":["35726 Lukken Plaza","39 Maryland Court"],"organizations":[],"birthday":"1992/11/26","note":"Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.","categories":["incremental"],"urls":[]},{"id":"91","displayName":"Kelby Gisborne","nickname":"Cécilia","emails":[],"phoneNumbers":["53175205"],"addresses":[],"organizations":[],"birthday":"1972/12/31","note":"Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.","categories":[],"urls":[]},{"id":"92","displayName":"Rodrick Ca","nickname":"Adèle","emails":["rca2j@soundcloud.com"],"phoneNumbers":["21076866"],"addresses":["30 Memorial Court","27 Texas Avenue"],"organizations":["Photobug"],"birthday":"1979/10/29","note":null,"categories":["Seamless"],"urls":[]},{"id":"93","displayName":"Wesley Cuttle","nickname":"Véronique","emails":[],"phoneNumbers":["91747493"],"addresses":["87 Briar Crest Road","4 Monument Park"],"organizations":["Flashspan"],"birthday":"1990/03/23","note":null,"categories":[],"urls":[]},{"id":"94","displayName":"Lurette Valenta","nickname":"Maëlys","emails":["lvalenta2l@stanford.edu","lvalenta2l@wired.com"],"phoneNumbers":["53734117"],"addresses":["74 Sunnyside Crossing"],"organizations":[],"birthday":"1981/03/29","note":null,"categories":[],"urls":[]},{"id":"95","displayName":"Estel Petrina","nickname":"Vérane","emails":["epetrina2m@pagesperso-orange.fr","epetrina2m@tamu.edu"],"phoneNumbers":["29403323"],"addresses":["52 Tomscot Street"],"organizations":["Bubblebox"],"birthday":"1989/09/02","note":null,"categories":[],"urls":[]},{"id":"96","displayName":"Forster Albury","nickname":"Anaé","emails":["falbury2n@mapquest.com"],"phoneNumbers":["61246972"],"addresses":[],"organizations":["Einti"],"birthday":"1989/09/04","note":null,"categories":["Multi-layered"],"urls":["archive.org/nulla.jpg"]},{"id":"97","displayName":"Peggi Fernant","nickname":"Mélanie","emails":["pfernant2o@mozilla.org"],"phoneNumbers":["68038056"],"addresses":["814 Eggendart Crossing","8 Sullivan Alley"],"organizations":[],"birthday":"1976/07/12","note":null,"categories":[],"urls":["zimbio.com/sapien/iaculis/congue/vivamus.html"]},{"id":"98","displayName":"Salomone Saxton","nickname":"Maëlla","emails":["ssaxton2p@opera.com","ssaxton2p@amazon.co.jp"],"phoneNumbers":["78450957"],"addresses":["909 Northland Crossing","1 Bellgrove Lane"],"organizations":["Kazu"],"birthday":"1986/07/22","note":"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.","categories":["Grass-roots"],"urls":["soundcloud.com/parturient/montes/nascetur/ridiculus/mus/vivamus/vestibulum.jpg"]},{"id":"99","displayName":"Cleopatra Glasson","nickname":"Táng","emails":[],"phoneNumbers":["43705242"],"addresses":[],"organizations":[],"birthday":"1997/02/25","note":null,"categories":[],"urls":[]},{"id":"100","displayName":"Marabel Southam","nickname":"Mélys","emails":["msoutham2r@constantcontact.com","msoutham2r@naver.com"],"phoneNumbers":["93569775"],"addresses":["85780 Bayside Pass","5721 Moulton Drive"],"organizations":["Brightdog"],"birthday":"1978/03/21","note":null,"categories":[],"urls":["mapy.cz/tristique.html"]}]');
                    if(contactsJSON==null){
                        console.log("ERROR RELOADING");
                        return;
                    }
                    //contactsJSON = contactsJSON.contacts_list;
                    //contactsJSON = JSON.parse(contactsJSON);

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
                    console.log("Contact "+JSON.stringify(a_contact))
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