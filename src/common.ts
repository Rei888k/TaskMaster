export function getCurrentTime(): string {
    const now = new Date()
    console.log(now.toLocaleDateString())
    return now.toLocaleDateString()
}