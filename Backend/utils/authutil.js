import bcrypt from 'bcrypt';

export const hashPwd = async(password)=> {
    try {
        const saltRound = 5;
        const hashPassword = await bcrypt.hash(password, saltRound);
        return hashPassword;
    } catch (error) {
        console.log(error);
    }
}

export const comparePwd = async(password, hashedpwd) =>{
    return bcrypt.compare(password, hashedpwd)
}