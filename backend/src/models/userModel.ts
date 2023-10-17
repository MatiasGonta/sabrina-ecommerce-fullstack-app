import { model, Schema, Document} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface User extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    verify: boolean;
}

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    verify: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    timestamps: true
});

userSchema.plugin(mongoosePaginate);

export const UserModel = model<User>('User', userSchema);