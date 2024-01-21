// src/routes/upload.js
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export async function post(request) {
    const uploadDir = 'static/uploads'; // Directory to save files

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const files = request.files || {}; // Get files from the request
    Object.values(files).forEach(file => {
        // Generate a unique name for the file to avoid naming conflicts
        const filename = `${uuidv4()}-${file.name}`;
        const filepath = path.join(uploadDir, filename);

        // Save the file
        fs.writeFileSync(filepath, file.data);
    });

    return {
        status: 200,
        body: {
            message: 'Files uploaded successfully'
        }
    };
}