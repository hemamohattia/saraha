import express from "express"
import path from "path"
import { port } from "../config/config.service.js"
import { authRouter, userRouter } from "./modules/index.js"
import { globalErrorHandling } from "./common/utils/response/index.js"

const app = express()

app.use(express.json())

app.use("/uploads",express.static(path.resolve("src/uploads")))

app.use("/auth",authRouter)
app.use("/user",userRouter)

app.use((req,res)=>{
res.status(404).json({
success:false,
message:"Invalid routing"
})
})

app.use(globalErrorHandling)

app.listen(port,()=>{
console.log(`Server running on port ${port}`)
})

export default app