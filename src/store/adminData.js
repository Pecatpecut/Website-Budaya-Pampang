import { reactive } from 'vue'
import lamin from '@/assets/images/lamin.svg'
import tari from '@/assets/images/tarian.svg'
import festival from '@/assets/images/susur-sungai.svg'

export const adminData = reactive({

  // 📅 AGENDA
  // field: id, title, date (YYYY-MM-DD), time (HH:mm), location
  agenda: [
    { id: 1, title: 'Pertunjukan Tari Dayak', date: '2026-04-25', time: '13:00', location: 'Rumah Lamin' },
    { id: 2, title: 'Festival Budaya Pampang', date: '2026-05-10', time: '09:00', location: 'Lapangan Pampang' }
  ],

  // 🖼 GALERI
  // field: id, title, image (blob URL string)
  galeri: [
    { id: 1, title: 'Rumah Lamin',     image: lamin    },
    { id: 2, title: 'Tarian Dayak',    image: tari     },
    { id: 3, title: 'Festival Budaya', image: festival }
  ],

  // 📰 POSTINGAN (repost/kurator — bukan nulis sendiri)
  // field: id, title, link, source, thumbnail (blob URL), date (YYYY-MM-DD)
  postingan: [
    {
      id: 1,
      title: 'Asal-Usul Desa Budaya Pampang',
      link: 'https://www.example.com/berita/pampang',
      source: 'Kompas.com',
      thumbnail: lamin,
      date: '2026-04-10'
    },
    {
      id: 2,
      title: 'Tradisi Dayak Kenyah yang Masih Lestari',
      link: 'https://www.instagram.com/p/example',
      source: '@budayapampang',
      thumbnail: tari,
      date: '2026-04-12'
    }
  ],

  // ================= KONTAK =================
  kontakInfo: {
    alamat: 'Jl. Wisata Budaya Pampang No.32',
    email: 'budayapampang@gmail.com',
    telepon: '08123456789',
    instagram: '@budayapampang',

    // ================= INFO SECTION =================
    infoSection: {
      jamOperasional: {
        weekdays: '08.00 - 17.00 WITA',
        sunday: '14.00 WITA'
      },
      parkir: {
        motor: '5000',
        mobil: '10000',
        bus: '20000'
      },
      wisata: {
        tarian: '45000',
        lamin: '15000',
        susur: '30000'
      },
      tambahan: {
        foto: '25000 / 5 foto',
        sewa: '50000 - 100000'
      }
    }
  }

})