import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

const notifications = [
  {
    icon: 'airplay',
    color: 'bg-danger',
    title: 'Luncurkan Admin',
    text: 'Lihat panel admin baru saya!',
    time: '09:30',
  },
  {
    icon: 'calendar',
    color: 'bg-success',
    title: 'Acara Hari Ini',
    text: 'Pengingat: Anda memiliki acara hari ini',
    time: '09:10',
  },
  {
    icon: 'settings',
    color: 'bg-cyan',
    title: 'Pengaturan',
    text: 'Anda dapat menyesuaikan templated sesuka Anda',
    time: '09:08',
  },
  {
    icon: 'box',
    color: 'bg-brand',
    title: 'Pavan Kumar',
    text: 'Lihat admin baru saya!',
    time: '09:02',
  },
]

function Dropdown({ trigger, children, align = 'left', width = 'w-64' }) {
  return (
    <details className="group relative">
      <summary className="list-none [&::-webkit-details-marker]:hidden">{trigger}</summary>
      <div
        className={`absolute top-full z-50 mt-1 ${align === 'right' ? 'right-0' : 'left-0'} ${width} rounded-md border-0 bg-white py-2 shadow-[1px_1px_15px_rgba(0,0,0,0.1)]`}
      >
        {children}
      </div>
    </details>
  )
}

export default function Topbar({ onMenuToggle }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-20 bg-white">
      <div className="flex h-full">
        <div className="flex items-center justify-between bg-white px-[30px] shadow-[0_-7px_9px_0_rgba(169,184,200,0.15)] lg:w-[260px] lg:shrink-0">
          <button
            type="button"
            onClick={onMenuToggle}
            aria-label="Buka menu"
            className="text-xl text-[#2a3547] lg:hidden"
          >
            <Icon name="menu" size={22} />
          </button>
          <Link to="/dashboard" className="flex items-center">
            <img src="/images/logo-text.png" alt="Freedash" className="max-h-9 w-auto" />
          </Link>
          <button type="button" aria-label="Menu tambahan" className="lg:hidden">
            <Icon name="more-horizontal" size={22} />
          </button>
        </div>

        <nav className="flex flex-1 items-center justify-between border-b border-line px-3 sm:px-5">
          <ul className="flex items-center gap-1 sm:gap-2">
            <li className="relative">
              <Dropdown
                width="w-[300px]"
                trigger={
                  <button
                    type="button"
                    aria-label="Notifikasi"
                    className="relative px-2 py-2 text-[#2a3547] sm:px-3"
                  >
                    <Icon name="bell" size={18} />
                    <span className="absolute right-0 top-1 rounded-full bg-brand px-[6px] py-[2px] text-[11px] font-medium leading-3 text-white">
                      5
                    </span>
                  </button>
                }
              >
                <div className="message-center">
                  {notifications.map((item) => (
                    <a
                      key={item.title}
                      href="#"
                      onClick={(event) => event.preventDefault()}
                      className="flex items-center gap-3 border-b border-line px-4 py-3 hover:bg-[#e8eaec]"
                    >
                      <span className={`flex h-9 w-9 items-center justify-center rounded-full text-white ${item.color}`}>
                        <Icon name={item.icon} size={16} />
                      </span>
                      <span className="w-3/4">
                        <span className="block text-[14px] font-medium text-ink">{item.title}</span>
                        <span className="block truncate text-[12px] text-body">{item.text}</span>
                        <span className="block text-[12px] text-body">{item.time} AM</span>
                      </span>
                    </a>
                  ))}
                </div>
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  className="block pt-3 text-center text-[14px] font-medium text-ink"
                >
                  Lihat semua notifikasi <Icon name="chevron-right" size={13} className="ml-1" />
                </a>
              </Dropdown>
            </li>
            <li>
              <Dropdown
                trigger={
                  <button type="button" aria-label="Pengaturan" className="px-2 py-2 text-[#2a3547] sm:px-3">
                    <Icon name="settings" size={18} />
                  </button>
                }
              >
                {['Tindakan', 'Tindakan lain', 'Pilihan lainnya'].map((label) => (
                  <a
                    key={label}
                    href="#"
                    onClick={(event) => event.preventDefault()}
                    className="block px-4 py-2 text-[14px] text-[#2a3547] hover:bg-[#e8eaec]"
                  >
                    {label}
                  </a>
                ))}
              </Dropdown>
            </li>
            <li className="hidden md:block">
              <select
                aria-label="Bahasa"
                className="h-9 rounded-[60px] border-0 bg-white px-3 text-[13px] shadow-[0_2px_9px_0_rgba(169,184,200,0.2)] outline-none"
                defaultValue="ID"
              >
                <option value="ID">ID</option>
                <option value="EN">EN</option>
                <option value="AB">AB</option>
                <option value="AK">AK</option>
              </select>
            </li>
          </ul>

          <ul className="flex items-center">
            <li className="hidden md:block">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Cari"
                  aria-label="Cari"
                  className="h-9 w-44 rounded-[60px] border-0 bg-white py-3 pl-7 pr-10 text-[13px] text-[#b8c3d5] shadow-[0_2px_9px_0_rgba(169,184,200,0.2)] outline-none lg:w-56"
                />
                <Icon name="search" size={16} className="absolute right-3 top-2.5 text-[#b8c3d5]" />
              </div>
            </li>
            <li className="ml-2">
              <Dropdown
                align="right"
                width="w-[280px]"
                trigger={
                  <button type="button" className="flex items-center gap-2 text-[14px]">
                    <img src="/images/profile-pic.jpg" alt="Profil" className="h-10 w-10 rounded-full" />
                    <span className="hidden items-center gap-1 lg:inline-flex">
                      <span className="text-body">Halo,</span>
                      <span className="font-medium text-ink">Jason Doe</span>
                      <Icon name="chevron-down" size={14} />
                    </span>
                  </button>
                }
              >
                {[
                  { icon: 'user', label: 'Profil Saya' },
                  { icon: 'credit-card', label: 'Saldo Saya' },
                  { icon: 'mail', label: 'Kotak Masuk' },
                  { icon: 'settings', label: 'Pengaturan Akun' },
                  { icon: 'power', label: 'Keluar' },
                ].map((item, index) => (
                  <div key={item.label}>
                    {index === 3 || index === 4 ? <hr className="my-2 border-line" /> : null}
                    <Link
                      to={item.label === 'Keluar' ? '/login' : '#'}
                      className="flex items-center gap-3 px-4 py-2 text-[14px] text-[#2a3547] hover:bg-[#e8eaec]"
                    >
                      <Icon name={item.icon} size={15} className="ml-1" />
                      {item.label}
                    </Link>
                  </div>
                ))}
                <hr className="my-2 border-line" />
                <div className="px-4 pb-2 pt-1">
                  <Link to="/dashboard" className="inline-block rounded bg-cyan px-3 py-1 text-[12px] text-white">
                    Lihat Profil
                  </Link>
                </div>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
