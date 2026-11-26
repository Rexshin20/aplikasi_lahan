import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api.js'
import Icon from '../components/Icon.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'
import { AreaChart, BarChart, DonutChart, WorldMap } from '../components/charts.jsx'

const fallbackStats = {
  clients: { value: '236', change: '+18,33%' },
  earnings: { value: '$18.306' },
  newProjects: { value: '1538', change: '-18,33%' },
  projects: { value: '864' },
}

const fallbackLeaders = [
  {
    name: 'Hanna Gover', email: 'hgover@gmail.com', photo: '/images/leader-1.jpg',
    project: 'Elite Admin', team: ['DS', 'SS', 'RP'], status: 'Sedang Diuji', statusColor: 'bg-brand',
    weeks: '35', budget: '$96K',
  },
  {
    name: 'Daniel Kristeen', email: 'Kristeen@gmail.com', photo: '/images/leader-2.jpg',
    project: 'Real Homes WP Theme', team: ['DS', 'SS'], status: 'Selesai', statusColor: 'bg-success',
    weeks: '32', budget: '$85K',
  },
  {
    name: 'Julian Josephs', email: 'Josephs@gmail.com', photo: '/images/leader-3.jpg',
    project: 'MedicalPro WP Theme', team: ['DS', 'SS', 'RP'], status: 'Selesai', statusColor: 'bg-brand',
    weeks: '29', budget: '$81K',
  },
  {
    name: 'Jan Petrovic', email: 'hgover@gmail.com', photo: '/images/leader-4.jpg',
    project: 'Hosting Press HTML', team: ['DS', 'SS'], status: 'Sedang Berjalan', statusColor: 'bg-danger',
    weeks: '23', budget: '$80K',
  },
]

function StatCard({ value, label, icon, badge, badgeColor = 'bg-brand', border = true }) {
  return (
    <div className={`card-shadow mb-[30px] rounded-lg bg-white ${border ? 'border-r border-line' : ''}`}>
      <div className="p-6">
        <div className="flex items-center">
          <div>
            <div className="mb-1 inline-flex items-center">
              <h2 className="mb-1 text-[30px] font-medium leading-tight text-ink">{value}</h2>
              {badge && (
                <span className={`ms-2 rounded-full px-2 py-[2px] text-[12px] font-medium text-white ${badgeColor}`}>
                  {badge}
                </span>
              )}
            </div>
            <h6 className="mb-0 w-full truncate text-[14px] font-normal text-body">{label}</h6>
          </div>
          <div className="ms-auto mt-3 text-[#a9b8c9] lg:mt-0">
            <Icon name={icon} size={30} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Card({ title, children, action = true, className = '' }) {
  return (
    <div className={`card-shadow mb-[30px] rounded-lg bg-white ${className}`}>
      <div className="p-6">
        <div className="flex items-start">
          <h4 className="mb-3 text-[18px] font-medium text-ink">{title}</h4>
          {action && (
            <div className="ms-auto">
              <details className="relative">
                <summary className="list-none text-body [&::-webkit-details-marker]:hidden">
                  <Icon name="more-vertical" size={18} />
                </summary>
                <div className="absolute right-0 z-10 w-32 rounded-md bg-white py-1 shadow-[1px_1px_15px_rgba(0,0,0,0.1)]">
                  {['Tambah', 'Perbarui', 'Hapus'].map((label) => (
                    <a key={label} href="#" onClick={(event) => event.preventDefault()} className="block px-4 py-2 text-[13px] text-[#2a3547] hover:bg-[#e8eaec]">
                      {label}
                    </a>
                  ))}
                </div>
              </details>
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

function ActivityItem({ icon, color, title, description, time, more }) {
  return (
    <div className="relative flex items-start border-l border-[#d5dce5] pb-5 pl-4 before:absolute before:-left-[7px] before:top-1 before:h-[13px] before:w-[13px] before:rounded-full before:bg-white before:content-none">
      <div>
        <span className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full text-white ${color}`}>
          <Icon name={icon} size={17} />
        </span>
      </div>
      <div className="ms-3 mt-1">
        <h5 className="mb-2 text-[16px] font-medium text-ink">{title}</h5>
        <p className="mb-2 text-[14px] text-body">{description}</p>
        <span className="block text-[14px] font-light text-body">{time}</span>
        {more && (
          <a href="#" onClick={(event) => event.preventDefault()} className="border-b border-cyan pb-1 text-[14px] text-body">
            Muat Lainnya
          </a>
        )}
      </div>
    </div>
  )
}

function TeamAvatars({ initials }) {
  return (
    <div className="flex -space-x-2">
      {initials.map((text, index) => (
        <span
          key={text}
          className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[12px] text-white ${
            index === 0 ? 'bg-brand' : index === 1 ? 'bg-danger' : index === 2 ? 'bg-cyan' : 'bg-success'
          }`}
        >
          {text}
        </span>
      ))}
      <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-success text-[20px] text-white">+</span>
    </div>
  )
}

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [stats, setStats] = useState(fallbackStats)
  const [leaders, setLeaders] = useState(fallbackLeaders)

  useEffect(() => {
    api.stats().then((data) => setStats(data)).catch(() => {})
    api.leaders().then((data) => setLeaders(data)).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-canvas">
      <Topbar onMenuToggle={() => setMobileOpen((open) => !open)} />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="pt-20 lg:pl-[260px]">
        <div className="flex flex-wrap items-center justify-between px-[30px] pb-4 pt-7">
          <div>
            <h3 className="mb-1 truncate text-[21px] font-medium text-ink">Selamat Pagi, Jason!</h3>
            <nav aria-label="breadcrumb">
              <ol className="flex items-center gap-2 text-[13px]">
                <li><Link to="/dashboard" className="text-brand hover:underline">Dasbor</Link></li>
              </ol>
            </nav>
          </div>
          <select
            aria-label="Periode"
            className="h-9 rounded-[60px] border-0 bg-white px-4 text-[13px] shadow-[0_2px_9px_0_rgba(169,184,200,0.2)] outline-none"
            defaultValue="Agu 23"
          >
            <option>Agu 23</option>
            <option>Jul 23</option>
            <option>Jun 23</option>
          </select>
        </div>

        <main className="px-[30px] pb-1">
          <div className="-mx-[15px] flex flex-wrap">
            <div className="w-full px-[15px] sm:w-1/2 lg:w-1/4">
              <StatCard value={stats.clients?.value || '236'} label="Klien Baru" icon="user-plus" badge={stats.clients?.change} />
            </div>
            <div className="w-full px-[15px] sm:w-1/2 lg:w-1/4">
              <StatCard value={stats.earnings?.value || '$18.306'} label="Penghasilan Bulan Ini" icon="dollar-sign" />
            </div>
            <div className="w-full px-[15px] sm:w-1/2 lg:w-1/4">
              <StatCard value={stats.newProjects?.value || '1538'} label="Proyek Baru" icon="file-plus" badge={stats.newProjects?.change} badgeColor="bg-danger" />
            </div>
            <div className="w-full px-[15px] sm:w-1/2 lg:w-1/4">
              <StatCard value={stats.projects?.value || '864'} label="Proyek" icon="globe" border={false} />
            </div>
          </div>

          <div className="-mx-[15px] flex flex-wrap">
            <div className="w-full px-[15px] lg:w-1/3">
              <Card title="Total Penjualan" action={false}>
                <div className="mt-2 h-[283px] w-full">
                  <DonutChart />
                </div>
                <ul className="mb-0 mt-4 space-y-3">
                  {[
                    { label: 'Penjualan Langsung', value: '$2346', dot: 'bg-brand' },
                    { label: 'Penjualan Rujukan', value: '$2108', dot: 'bg-danger' },
                    { label: 'Penjualan Afiliasi', value: '$1204', dot: 'bg-cyan' },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center text-[14px]">
                      <span className={`mr-2 inline-block h-[9px] w-[9px] rounded-full ${item.dot}`} />
                      <span className="text-body">{item.label}</span>
                      <span className="float-end ml-auto font-medium text-ink">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
            <div className="w-full px-[15px] lg:w-1/3">
              <Card title="Penghasilan Bersih" action={false}>
                <div className="relative mt-4 h-[294px]">
                  <BarChart />
                </div>
                <p className="mb-2 mt-5 text-center text-[14px] italic text-body">Penjualan bulan ini</p>
              </Card>
            </div>
            <div className="w-full px-[15px] lg:w-1/3">
              <Card title="Penghasilan per Lokasi" action={false}>
                <div className="h-[180px]"><WorldMap /></div>
                <div className="mt-5 space-y-3">
                  {[
                    { label: 'India', width: '100%', value: '28%', color: 'bg-brand' },
                    { label: 'Inggris', width: '74%', value: '21%', color: 'bg-danger' },
                    { label: 'AS', width: '60%', value: '18%', color: 'bg-cyan' },
                    { label: 'Tiongkok', width: '50%', value: '12%', color: 'bg-success' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center">
                      <span className="w-1/3 text-right text-[14px] text-body">{row.label}</span>
                      <div className="mx-2 h-[5px] w-5/12 rounded bg-[#edf2f6]">
                        <div className={`h-full rounded ${row.color}`} style={{ width: row.width }} />
                      </div>
                      <span className="w-1/4 text-right text-[14px] font-medium text-ink">{row.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="-mx-[15px] flex flex-wrap">
            <div className="w-full px-[15px] md:w-1/2 lg:w-2/3">
              <Card title="Statistik Penghasilan">
                <div className="mb-5 pl-4">
                  <div className="relative h-[315px]"><AreaChart /></div>
                </div>
                <p className="mb-0 mt-4 text-center text-[14px] italic text-body">Penghasilan bulan ini</p>
              </Card>
            </div>
            <div className="w-full px-[15px] md:w-1/2 lg:w-1/3">
              <Card title="Aktivitas Terbaru" action={false}>
                <div className="mt-4">
                  <ActivityItem
                    icon="shopping-cart" color="bg-cyan" title="Produk Baru Terjual!"
                    description={<>John Musa baru saja membeli<br />kamera Cannon 5M.</>}
                    time="10 Menit Lalu"
                  />
                  <ActivityItem
                    icon="message-square" color="bg-danger" title="Tiket Dukungan Baru"
                    description={<>Richardson baru saja membuat<br />tiket dukungan</>}
                    time="25 Menit Lalu"
                  />
                  <div className="relative flex items-start border-l border-transparent">
                    <ActivityItem
                      icon="bell" color="bg-cyan" title="Notifikasi Pesanan Tertunda!"
                      description={<>Ada satu pesanan tertunda dari<br />Ryne Doe</>}
                      time="2 Jam Lalu" more
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="-mx-[15px] flex flex-wrap">
            <div className="w-full px-[15px]">
              <Card title="Pemimpin Teratas">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left">
                    <thead>
                      <tr className="border-0 text-[14px] font-medium text-body">
                        <th className="border-0 px-2 py-3 font-medium">Pemimpin Tim</th>
                        <th className="border-0 px-2 py-3 font-medium">Proyek</th>
                        <th className="border-0 px-2 py-3 font-medium">Tim</th>
                        <th className="border-0 px-2 py-3 text-center font-medium">Status</th>
                        <th className="border-0 px-2 py-3 text-center font-medium">Minggu</th>
                        <th className="border-0 px-2 py-3 font-medium">Anggaran</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaders.map((leader) => (
                        <tr key={leader.name} className="border-t border-line">
                          <td className="px-2 py-4">
                            <div className="flex items-center gap-3">
                              <img src={leader.photo} alt={leader.name} className="h-[45px] w-[45px] rounded-full" />
                              <div>
                                <h5 className="mb-0 text-[16px] font-medium text-ink">{leader.name}</h5>
                                <span className="text-[14px] text-body">{leader.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-4 text-[14px] text-body">{leader.project}</td>
                          <td className="px-2 py-4"><TeamAvatars initials={leader.team} /></td>
                          <td className="px-2 py-4 text-center" title={leader.status}>
                            <span className={`inline-block h-3 w-3 rounded-full ${leader.statusColor}`} />
                          </td>
                          <td className="px-2 py-4 text-center font-medium text-body">{leader.weeks}</td>
                          <td className="px-2 py-4 font-medium text-ink">{leader.budget}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </main>

        <footer className="px-[30px] py-5 text-center text-[14px] text-body">
          Seluruh hak dilindungi oleh Freedash. Dirancang dan dikembangkan oleh{' '}
          <a href="https://adminmart.com/" className="text-brand hover:underline">Adminmart</a>.
        </footer>
      </div>
    </div>
  )
}
