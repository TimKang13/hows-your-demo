export function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]')?.content
}

export async function postFormJSON(form, { accept = "application/json" } = {}) {
  const csrfToken = getCSRFToken()

  const res = await fetch(form.action, {
    method: (form.method || "post").toUpperCase(),
    headers: {
      Accept: accept,
      ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {})
    },
    body: new FormData(form)
  })

  let payload = null
  if (res.status !== 204) {
    payload = await res.json().catch(() => null)
  }

  if (!res.ok) {
    const err = new Error(`Request failed: ${res.status}`)
    err.response = res
    err.payload = payload
    throw err
  }

  return payload
}


