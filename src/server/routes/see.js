export default defineEventHandler(async (event) => {
    const eventStream = createEventStream(event)

    const interval = setInterval(async () => {
        await eventStream.push(`Message @ ${new Date().toLocaleTimeString()}`)
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
