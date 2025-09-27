import bcrypt from "bcrypt"

export const hashMiddlewarePassword=async ()=>{
    if (!this.isModified("password")) return next();

    try {
        const salt=await bcrypt.genSalt(10);
        this.password=await bcyrpt.hash(this.password,salt)
        next()
    } catch (error) {
        next(error)
    }
}

