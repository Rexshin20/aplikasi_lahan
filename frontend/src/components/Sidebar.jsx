import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'

const menu = [
  { label: 'Dasbor', icon: 'home', to: '/dashboard' },
  { divider: true },
  {
    section: 'Aplikasi',
    items: [
      { label: 'Daftar Tiket', icon: 'tag' },
      { label: 'Chat', icon: 'message-square' },
      { label: 'Kalender', icon: 'calendar' },
    ],
  },
  { divider: true },
  {
    section: 'Komponen',
    items: [
      {
        label: 'Formulir',
        icon: 'file-text',
        children: ['Input Formulir', 'Grid Formulir', 'Kotak Centang & Radio'],
      },
      {
        label: 'Tabel',
        icon: 'grid',
        children: ['Tabel Dasar', 'Tabel Gelap', 'Ukuran Tabel', 'Tabel Berwarna', 'Datatable Dasar'],
      },
      {
        label: 'Grafik',
        icon: 'bar-chart',
        children: ['Grafik Morris', 'ChartJs', 'Grafik Knob'],
      },
      {
        label: 'Elemen UI',
        icon: 'box',
        children: [
          'Tombol', 'Modal', 'Tab', 'Tooltip & Popover', 'Notifikasi', 'Bilah Progres',
          'Tipografi', 'Bootstrap UI', 'Rute Navigasi', 'Daftar Media', 'Grid',
          'Karusel', 'Scrollspy', 'Toast', 'Spinner',
        ],
      },
      { label: 'Kartu', icon: 'sidebar' },
    ],
  },
  { divider: true },
  {
    section: 'Autentikasi',
    items: [
      { label: 'Masuk', icon: 'lock', to: '/login' },
      { label: 'Daftar', icon: 'lock' },
      {
        label: 'Ikon',
        icon: 'feather',
        children: ['Ikon Fontawesome', 'Ikon Simple Line'],
      },
    ],
  },
  { divider: true },
  {
    section: 'Lainnya',
    items: [
      { label: 'Keluar', icon: 'log-out', to: '/login' },
      { label: 'Dropdown multi-level', icon: 'crosshair', children: ['Butir 1.1', 'Butir 1.2', 'Butir 1.3'] },
    ],
  },
]

function LinkItem({ item, active }) {
  const content = (
    <>
      {item.icon && <Icon name={item.icon} size={19} className="text-[#2a3547]" />}
      <span className="hide-menu">{item.label}</span>
    </>
  )

  return item.to ? (
    <Link
      to={item.to}
      className={`flex items-center gap-3 px-[30px] py-3 text-[14px] transition-colors hover:text-brand ${
        active ? 'bg-gradient-to-r from-[#8971ea] to-[#5f76e8] text-white hover:text-white [&_svg]:!text-white' : 'text-[#2a3547]'
      }`}
    >
      {content}
    </Link>
  ) : (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className="flex items-center gap-3 px-[30px] py-3 text-[14px] text-[#2a3547] transition-colors hover:text-brand"
    >
      {content}
    </a>
  )
}

export default function Sidebar({ mobileOpen, onClose }) {
  const [open, setOpen] = useState({})
  const location = useLocation()

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Tutup menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}
      <aside
        className={`fixed bottom-0 left-0 top-20 z-50 w-[260px] overflow-y-auto border-r border-line bg-white transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="py-4">
          {menu.map((entry, index) => {
            if (entry.divider) {
              return <li key={`divider-${index}`} className="mx-[30px] my-4 list-none border-t border-line" />
            }
            if (entry.section) {
              return (
                <div key={entry.section}>
                  <p className="px-[30px] pb-2 pt-1 text-[12px] font-medium uppercase tracking-wide text-[#a1aab8]">
                    {entry.section}
                  </p>
                  {entry.items.map((item) => {
                    const isOpen = Boolean(open[item.label])
                    return (
                      <div key={item.label}>
                        <button
                          type="button"
                          onClick={() =>
                            item.children
                              ? setOpen((state) => ({ ...state, [item.label]: !state[item.label] }))
                              : undefined
                          }
                          className={`flex w-full items-center gap-3 py-3 pl-[30px] pr-5 text-left text-[14px] transition-colors hover:text-brand ${
                            item.to === location.pathname ? 'text-brand' : 'text-[#2a3547]'
                          }`}
                        >
                          {item.icon && <Icon name={item.icon} size={19} className="text-[#2a3547]" />}
                          <span className="flex-1">{item.label}</span>
                          {item.children && (
                            <Icon
                              name={isOpen ? 'chevron-down' : 'chevron-right'}
                              size={14}
                              className="text-[#a1aab8]"
                            />
                          )}
                        </button>
                        {item.children && (
                          <div className={`${isOpen ? 'block' : 'hidden'} border-l border-line py-1`}>
                            {item.children.map((child) => (
                              <a
                                key={child}
                                href="#"
                                onClick={(event) => event.preventDefault()}
                                className="block py-2 pl-[62px] pr-5 text-[13px] text-[#2a3547] hover:text-brand"
                              >
                                {child}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            }
            return (
              <LinkItem
                key={entry.label}
                item={entry}
                active={entry.to === location.pathname}
              />
            )
          })}
        </nav>
      </aside>
    </>
  )
}
