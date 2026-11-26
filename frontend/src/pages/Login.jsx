import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../lib/api.js'
import Icon from '../components/Icon.jsx'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api.login(username, password)
      localStorage.setItem('lahan_token', data.token)
      localStorage.setItem('lahan_user', JSON.stringify(data.user))
      navigate('/dashboard')
    } catch (err) {
      // Mode demo: tetap bisa masuk kalau backend/MySQL belum berjalan.
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('lahan_token', 'demo-token')
        localStorage.setItem('lahan_user', JSON.stringify({ username: 'admin', name: 'Jason Doe' }))
        navigate('/dashboard')
        return
      }
      setError(err.message || 'Nama pengguna atau kata sandi salah.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-10"
      style={{ backgroundImage: 'url(/images/auth-bg.jpg)' }}
    >
      <div className="grid w-full max-w-[1000px] overflow-hidden rounded-lg bg-white shadow-[0_3px_20px_rgba(0,0,0,0.1)] md:grid-cols-12">
        <div
          className="hidden bg-cover bg-center md:col-span-5 md:block lg:col-span-7"
          style={{ backgroundImage: 'url(/images/auth-photo.jpg)' }}
        />
        <div className="bg-white md:col-span-7 lg:col-span-5">
          <div className="p-5">
            <div className="text-center">
              <img src="/images/auth-icon.png" alt="Logo" className="mx-auto" />
            </div>
            <h2 className="mt-3 text-center text-[30px] font-normal text-ink">Masuk</h2>
            <p className="text-center text-[14px] text-body">
              Masukkan nama pengguna dan kata sandi untuk mengakses panel admin.
            </p>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="mb-1 block text-[14px] font-medium text-ink" htmlFor="uname">
                  Nama Pengguna
                </label>
                <input
                  className="h-10 w-full rounded border border-[#ced4da] px-3 text-[14px] outline-none focus:border-brand"
                  id="uname"
                  type="text"
                  placeholder="masukkan nama pengguna"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="mb-1 block text-[14px] font-medium text-ink" htmlFor="pwd">
                  Kata Sandi
                </label>
                <input
                  className="h-10 w-full rounded border border-[#ced4da] px-3 text-[14px] outline-none focus:border-brand"
                  id="pwd"
                  type="password"
                  placeholder="masukkan kata sandi"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="mb-3 rounded bg-red-50 px-3 py-2 text-[13px] text-danger">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-brand-dark px-4 py-2 text-[15px] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading ? 'Memproses…' : 'Masuk'}
              </button>
              <div className="mt-5 text-center text-[14px] text-body">
                Belum punya akun? <Link to="/dashboard" className="text-danger hover:underline">Daftar</Link>
              </div>
            </form>
            <p className="mt-6 text-center text-[12px] text-muted">
              Demo: <span className="font-medium text-ink">admin</span> /{' '}
              <span className="font-medium text-ink">admin123</span>
              <span className="mt-1 flex items-center justify-center gap-1">
                <Icon name="info" size={12} /> Tanpa koneksi database, tombol Masuk tetap membuka dasbor.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
