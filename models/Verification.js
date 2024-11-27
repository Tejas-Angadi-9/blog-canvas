import { models, Schema, model } from "mongoose";

const verificationSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    }
})

const Verification = models.Verification || model("Verification", verificationSchema);
export default Verification;