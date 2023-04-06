import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

export default {
    namespaced:true,
    state() {
        return {
            images: [
                {id: "123",
                name: "image 1",
                uploadDate: "1/1/2023",
                url: "http://somerandomurl.jpg"
                },
                {id: "234",
                name: "image 2",
                uploadDate: "1/10/2023",
                url: "http://someotherrandomurl.jpg"
                }
            ]
        }
    },
    mutations,
    actions,
    getters
}