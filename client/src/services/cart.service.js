import createApiClient from './api.service';
class CartService {
    
    constructor(baseUrl = '/api/cart') {
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

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
}
export default new CartService();
