export default defineEventHandler(async (event) => {
    const {files} = await readBody(event)
    for (const file of files) {
        console.log(file)
        const imageName =  await storeFileLocally(
            file,
            10,
        )
    }
    setResponseStatus(event, 204, 'Uploaded successfully')
})