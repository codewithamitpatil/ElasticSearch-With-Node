# ElasticSearch-With-Node


In this repo i have implemented basic crud , connectivity to ealstic search using @elastic/elasticsearch package .

I have implemented the main feature of search with eleastic search.

which is also called external indexing.

Instead of using any paid tools , this apporch is effective for built in search engine.

Logshtash is also good way to integrate the data to elastic search , but it brings complexity.




# Resources for elastic search client

1] https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html#docs-delete-by-query-api-query-params

2] https://medium.com/yom-ai/api-rest-con-node-js-y-elasticsearch-a2a2ca858cbb





# Code Snippets for elastic client


1] To Get All The documents from elestic search index


```
const searchDocuments1 = async (query) => {

    const body = await elasticClient.search({
        index: 'postsearch',
        body: {
            query: {
                match_all: {}
            }
        }
    })

    const temp = body.hits.hits.map((item) => {
        const obj = {
            ...item._source,
            _id: item._id
        }
        return obj;
    })
    console.log(temp)

}

// outp -

[
  { title: 'hello rakesh', pid: 3, _id: '-qbHwYABqMvvxKt5NsCO' },
  { title: 'hello suraj', pid: 4, _id: '_abHwYABqMvvxKt5NsDY' }
]

```

2] To full text search in elastic search index

```
const searchDocuments = async (query) => {

    const body = await elasticClient.search({
        index: 'postsearch',
        body: {
            query: {
                match: {
                    title: query
                }
            }
        }
    })

    const temp = body.hits.hits.map((item) => {
        const obj = {
            ...item._source,
            _id: item._id
        }
        return obj;
    })
    console.log(temp)

}

searchDocuments("hello")


output -
[
  { title: 'hello rakesh', pid: 3, _id: '-qbHwYABqMvvxKt5NsCO' },
  { title: 'hello suraj', pid: 4, _id: '_abHwYABqMvvxKt5NsDY' }
]

```

3] Delete document by Elastic Id or query 

```

const DeleteById = async (id) => {
    try {

        // id - id of elastic document
        const temp = await elasticClient.delete({
            index: 'postsearch',
            id
        });
        console.log(temp)

    } catch (e) {
        console.log(e.message)
    }

}


const DeleteByQuery = async (id) => {
    try {
        const data = await elasticClient.deleteByQuery({
            index: "postsearch",
            query: {
                match: {
                    pid: 2
                }
            }
        })
        console.log(data)

    } catch (e) {
        console.log(e.message)
    }

}


```

4] Add Documents to elastic search index

```
export const AddPost = async (body) => {
    const temp = await elasticClient.index({
        index: 'postsearch',
        body
    });
    console.log(temp)
};


AddPost('postsearch', {
    title: 'hello vaishanvi',
    pid: 2
})


```

5] Update document in Elastic search

```

// update document by id
const UpdateDocument = async (id) => {
    const temp = await elasticClient.update({
        index: "postsearch",
        id: id,
        doc: {
            title: "vaisjabi"
        },
    });

}


```
