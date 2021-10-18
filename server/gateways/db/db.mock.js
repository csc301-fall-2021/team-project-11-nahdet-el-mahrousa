
class MockDBHandler {
    async retrieve(model, query){
        console.log("RETRIEVE", model, query)
        return {}
    }

    async create(model, obj){
        console.log("CREATE", model, obj)
        return {}
    }

    async update(model, obj){
        console.log("UPDATE", model, obj)
        return {}
    }

    async delete(model, obj){
        console.log("DELETE", model, obj)
        return {}
    }
}

module.exports = MockDBHandler
