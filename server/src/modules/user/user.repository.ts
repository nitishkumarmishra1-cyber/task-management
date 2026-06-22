import User from './user.model.js';
import { CreateUserDto, UpdateUserDto } from './user.dto.js';
import { toObjectId } from '../../shared/utility/util.js';
import { FILTER } from '../../shared/interfaces/user.js';

export class UserRepository {
    async create(data: CreateUserDto) {
        return User.create(data);
    }

    async findById(id: string) {
        return User.findById(id);
    }

    async findByEmail(email: string) {
        return User.findOne({ email });
    }

    async findByEmailWithPassword(email: string) {
        return User.findOne({ email }).select('+password');
    }

    async findAll(userId : string, roleFilter : FILTER) {
        const filter = roleFilter === FILTER.ALL ? {} : { role : roleFilter };
        return User.find({ _id : { $ne : toObjectId(userId) }, ...filter }).populate('reportTo', 'name');
    }

    async findAssignableUsers(userId : string) {
        return User.find()
    }

    async findReporteesWithTeamLead(userId : string) {
        return User.find({ isActive : true, $or : [{ _id : toObjectId(userId) }, { reportTo : toObjectId(userId) }] })
    }

    async findReportees(userId : string, roleFilter : FILTER = FILTER.ALL) {
        const filter = roleFilter === FILTER.ALL ? {} : { role : roleFilter };
        return User.find({ reportTo : toObjectId(userId), ...filter }).populate('reportTo', 'name');
    }

    async updateById(id: string, data: UpdateUserDto) {
        return User.findByIdAndUpdate(id, data, { returnDocument: 'after', runValidators: true });
    }

    async deleteById(id: string) {
        return User.findByIdAndDelete(id);
    }

    async existsByEmail(email: string) {
        const user = await User.exists({ email });
        return !!user;
    }
}

export default new UserRepository();