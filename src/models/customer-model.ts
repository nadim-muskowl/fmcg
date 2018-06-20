export class CustomerModel {

    customer_id: any;
    customer_group_id: any;
    firstname: any;
    lastname: any;
    email: any;
    telephone: any;

    constructor() {

    }

    clear() {
        this.customer_id = null;
        this.customer_group_id = null;
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.telephone = '';
    }

}