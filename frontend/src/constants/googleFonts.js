import { Roboto } from 'next/font/google'
const roboto = Roboto({
  weight: ['100','300','400', '700'],
  style: ['normal', 'italic',],
  subsets: ['latin'],
  display: 'swap',
})
export default roboto;