const API_URL = import.meta.env.VITE_API_URL || ''

function token() {
  return localStorage.getItem('lahan_token')
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token() ? { Authorization: `Bearer ${token()}` } : {}),
      ...options.headers,
    },
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(payload.message || `Request gagal (${response.status})`)
  }
  return payload
}

export const api = {
  login: (username, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  me: () => request('/api/auth/me'),
  stats: () => request('/api/dashboard/stats'),
  leaders: () => request('/api/dashboard/leaders'),
}
