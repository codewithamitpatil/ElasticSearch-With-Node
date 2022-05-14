import elasticClient from "../db/elkConnection.js";


// add document to elastic search index
export const AddPost = async (body) => {
    const temp = await elasticClient.index({
        index: 'postsearch',
        body
    });
    return temp;
};

// update document by id
export const UpdateDocument = async (id, query) => {
    const temp = await elasticClient.update({
        index: "postsearch",
        id: id,
        doc: query,
    });
    return temp;
}

// delete by particular field
export const DeleteByQuery = async (id) => {
    try {
        const data = await elasticClient.deleteByQuery({
            index: "postsearch",
            query: {
                match: {
                    pid: id
                }
            }
        })
        console.log(data)
        return true;
    } catch (e) {
        console.log(e.message)
        return e;
    }

}

// delete by elastic search id
export const DeleteById = async (id) => {
    try {

        // id - id of elastic document
        const temp = await elasticClient.delete({
            index: 'postsearch',
            id
        });
        console.log(temp)
        return true;
    } catch (e) {
        console.log(e.message)
    }

}

// to search all documents in elastic search
export const searchDocuments1 = async (query) => {

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
    return temp;
}

// to get all documents in elastic search
export const searchDocuments2 = async () => {

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
    return temp;


}