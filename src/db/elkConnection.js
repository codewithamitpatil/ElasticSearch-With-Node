import {
    Client,
} from '@elastic/elasticsearch';



const elasticClient = new Client({
    cloud: {
        id: "search:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGE1ZmUwMmZiNWMwMTQ4MTBhNTI4ZDE1Mjg1M2FmOWYxJDVjNzVkZmFhODJiOTRmNzY4NjBiZTcwOTJkMjFlYjgy"
    },
    auth: {
        username: "elastic",
        password: "4KMAOekw5rLSg29C33HNEaWD"
    }
});

elasticClient.info()
    .then(response => {
        // console.log(response)
        console.log('elk connected');
    })
    .catch(error => console.error(error))

export default elasticClient;
// hello 