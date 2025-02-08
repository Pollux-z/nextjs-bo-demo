import mongoose, {Schema} from "mongoose";

const resignSchema = new Schema(
    {
        employeeName: {
            type: String,
            required: true
        },
        employeeTitle: {
            type: String,
            required: true
        },
        resignRemark: {
            type: String,
            required: true
        },
        issueDate: {
            type: String,
            required: true
        },
        userCreate: {
            type: String,
            required: true
        },
    },
    {timestamps: true}
)

const Resign = mongoose.models.Resign || mongoose.model("Resign", resignSchema)
export default Resign;