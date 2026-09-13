export function saveReview(state) {
    return fetch(`${process.env.API_URL}${process.env.API_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
    })
        .then(res => res.json())
        .then(data => console.log("Saved:", data))
        .catch(err => console.error("Failed to save:", err))
}