import { reactive } from 'vue'

export const adminData = reactive({
  postingan: [
    {
      id: 1,
      title: 'Postingan 1',
      content: 'Isi postingan...',
      image: ''
    }
  ],
  galeri: [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ],
  agenda: [
    { id: 1 }
  ],
  kontakInfo: {
  alamat: 'Desa Budaya Pampang, Samarinda',
  email: 'info@pampang.com',
  telepon: '08123456789',
  instagram: '@pampang'
}
})