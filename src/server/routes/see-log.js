export default defineEventHandler(async (event) => {
    const eventStream = createEventStream(event)

    const interval = setInterval(async () => {
        const logs = await logRepo.findLog()
        await eventStream.push(JSON.stringify(logs))
    }, 1000)


    eventStream.onClosed(async () => {
        clearInterval(interval)
        await eventStream.close()
    })

    setResponseHeaders(event, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    return eventStream.send()

})
