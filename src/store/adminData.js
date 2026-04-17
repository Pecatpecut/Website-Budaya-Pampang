import { reactive } from 'vue'
import lamin from '@/assets/images/lamin.svg'
import tari from '@/assets/images/tarian.svg'
import festival from '@/assets/images/susur-sungai.svg'

export const adminData = reactive({

  // 📅 AGENDA — field baku: id, title, date, time, location
  agenda: [
    {
      id: 1,
      title: 'Pertunjukan Tari Dayak',
      date: '2026-04-18',
      time: '13:00',
      location: 'Rumah Lamin'
    },
    {
      id: 2,
      title: 'Festival Budaya Pampang',
      date: '2026-04-20',
      time: '15:00',
      location: 'Lapangan Pampang'
    }
  ],

  // 🖼 GALERI
  galeri: [
    { id: 1, title: 'Rumah Lamin',    image: lamin    },
    { id: 2, title: 'Tarian Dayak',   image: tari     },
    { id: 3, title: 'Festival Budaya', image: festival }
  ],

  // 📰 POSTINGAN
  postingan: [
    {
      id: 1,
      title: 'Asal-Usul Desa Pampang',
      content: 'Desa Budaya Pampang merupakan salah satu destinasi wisata budaya yang terkenal di Kalimantan Timur.',
      image: lamin,
      date: '10 April 2026'
    },
    {
      id: 2,
      title: 'Tradisi Dayak Kenyah',
      content: 'Suku Dayak Kenyah dikenal dengan seni tari, ukiran, dan berbagai tradisi budaya yang masih dilestarikan hingga kini.',
      image: tari,
      date: '12 April 2026'
    }
  ],

  // 📞 KONTAK
  kontakInfo: {
    alamat: 'Jl. Pampang, Samarinda, Kalimantan Timur',
    email: 'info@desapampang.id',
    telepon: '0811-5050-123',
    instagram: '@desabudayapampang'
  }

})