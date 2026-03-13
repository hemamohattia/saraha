import multer from "multer"
import { nanoid } from "nanoid"
import path from "path"
import fs from "fs"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "src/uploads/gallery"
        
        if (file.fieldname === "image") {
            folder = "src/uploads/profile"
        } else if (file.fieldname === "images") {
            folder = "src/uploads/cover"
        }

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true })
        }

        cb(null, folder)
    },
    filename: (req, file, cb) => {
        const name = nanoid() + path.extname(file.originalname)
        cb(null, name)
    }
})

export const upload = multer({ storage })