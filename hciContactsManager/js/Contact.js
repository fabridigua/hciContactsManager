class Contact {
    /*
        Simple data structure rappresenting a Contact
     */
    constructor(id, displayName,nickname,phoneNumbers,emails,addresses, organizations, birthday,note,categories,urls) {
        this.id = id;
        this.displayName = displayName;
        this.nickname = nickname;
        this.emails = emails;
        this.phoneNumbers = phoneNumbers;
        this.addresses = addresses;
        this.organizations = organizations;
        this.birthday = birthday;
        this.note = note;
        this.categories = categories;
        this.urls = urls;
    }
}