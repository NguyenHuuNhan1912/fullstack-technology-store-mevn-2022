import createApiClient from './api.service';
class OrderService {
    // Nhay den local 3008/api/contacts
    constructor(baseUrl = '/api/order') {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        // gan cung host name
        // return (await this.api.get('localhost/3000/api/contacts')); 
        // console.log(this.api);
        // console.log(await this.api.get('/'));
        return (await this.api.get('/')).data;
    }

    async create(data) {
        // Object contactlocal
        // console.log(await this.api.post('/', data));
        return (await this.api.post('/', data)).data;
    }
}
export default new OrderService();
