import mongoose from "mongoose"

const GroupSchema= new mongoose.Schema(
    {
        groupName:{
            type:String,
            required:true,
        },

        isGroup:{
            type:Boolean,
            required:true,
            default:true,
        },

        participants:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true,
            }
        ],
        GroupConversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'GroupConversation'
        }
    },
    { timestamps: true }
)



const GroupMemberSchema=mongoose.model("GroupMember",GroupSchema);

export default GroupMemberSchema;