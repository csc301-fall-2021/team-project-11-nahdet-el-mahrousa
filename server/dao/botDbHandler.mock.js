// class MockbotDBHandler {
//     constructor(){
//         this.mockMessages = [{lable: 0, content: "Example message", replies: [0, 1]},
//                               {lable: 1, content: "Dummy toMessage 1", replies: []},
//                               {lable: 2, content: "Dummy toMessage 2", replies: []}]
//         this.mockReplies = [{lable: 0, content: "Example reply", fromMessage: 1, toMessage: 1},
//                          {lable: 1, content: "Example reply", fromMessage: 1, toMessage: 2}]
//     }

//     hasMessage(mid){
//         if(mid >= 0 && mid <= 2){
//             return true
//         }
//     }

//     hasReply(rid){
//         if(rid >= 0 && rid <= 1){
//             return true
//         }
//     }

//     retriveMessage(mid){
//         return this.mockMessages[mid]
//     }

//     retriveReply(rid){
//         return this.mockReplies[rid]
//     }

//     getRepliesIdByMessage(mid){
//         return this.mockMessages[mid].replies
//     }

//     getNextMessage(rid){
//         return this.mockReplies[rid].toMessage
//     }

//     async create(model, obj){
//         console.log("CREATE", model, obj)
//         return {}
//     }

//     async update(model, obj){
//         console.log("UPDATE", model, obj)
//         return {}
//     }

//     async delete(model, obj){
//         console.log("DELETE", model, obj)
//         return {}
//     }
// }

// module.exports = MockbotDBHandler