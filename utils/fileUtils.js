import path from 'path';
import fs from 'fs';

export async function isFileDownloaded(fileName, shouldExist, downloadDir) 
{
    const normalizedFileName = normalizeFileName(fileName);
    let timeElapsed = 0;
    const timeout = 10;

    if (!shouldExist) 
    {
        return getMatchingFile(normalizedFileName, downloadDir) !== null;
    }

    while (timeElapsed < timeout) 
    {
        // Check full file
        const match = getMatchingFile(normalizedFileName, downloadDir);
        if (match) 
        {
            fs.unlinkSync(match); // cleanup
            return true;
        }

        // Check partial downloads
        const partials = fs.readdirSync(downloadDir).filter(f => f.endsWith('.crdownload') || f.endsWith('.part'));
        if (partials.length > 0) 
        {
            for (const p of partials) 
            {
                fs.unlinkSync(path.join(downloadDir, p)); // cleanup partials
            }
        return true; // treat as detected
        }

        // wait 1 second
        await new Promise(r => setTimeout(r, 1000));
        timeElapsed++;
    }

    console.log(`File should be downloaded but is not: ${fileName}`);
    return false;
}

export function getMatchingFile(normalizedExpected, dir) 
{
    const files = fs.readdirSync(dir);
    for (const file of files) 
    {
        const normalizedActual = normalizeFileName(file).replace(/%20/g, ' ') // Decode URL spaces;
        if (normalizedActual === normalizedExpected) 
        {
            return path.join(dir, file);
        }
    }
    return null;
}

export function normalizeFileName(name) {
    return name.trim().replace(/\u00A0|\u202F/g, ' ')  // Normalize NBSP/narrow spaces
        .replace(/\s+/g, ' ')            // Collapse multiple spaces
        .toLowerCase();
}