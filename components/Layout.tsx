import { useRouter } from 'next/router'
import Link from 'next/link'

import { SiAiqfome } from 'react-icons/si'
import { FaUserAlt } from 'react-icons/fa'
import { RiHome3Fill, RiBook2Fill, RiCheckboxMultipleLine, RiBook3Fill } from 'react-icons/ri'

interface IItemOnNavbar {
  href: string
  children: JSX.Element,
  className?: string
}

const ItemOnNavbar = ({ children, className = '', href }: IItemOnNavbar) => {
  return (
    <button
      className={className + " w-full hover:bg-cyan-sesqui flex justify-center md:hover:scale-105 py-2 cursor-pointer rounded-sm"}
    >
      <Link href={href}>
        {children}
      </Link>
    </button>
  )
}

const Layout = ({ children }: { children: JSX.Element }) => {

  return (
    <div className="w-screen h-screen flex flex-col-reverse md:flex-row ">
      <div className="w-full md:w-16 h-[10vh] md:h-[90vh] bg-dark-sesqui text-white rounded-t-lg md:rounded-xl md:ml-2 md:my-auto bg-opacity-90 flex flex-row md:flex-col md:justify-between items-center py-4 bottom-0">
        <div className="w-full flex flex-row md:flex-col items-center md:gap-3">
          {/* <Image src={'/images/logo.svg'} width={50} height={50} /> */}
          <SiAiqfome className={'w-10 h-10 cursor-pointer hidden md:block'} />
          <hr className="w-full hidden md:block"></hr>
          <ItemOnNavbar href='/schedule-list'>
            <RiCheckboxMultipleLine className={'w-6 h-6'} />
          </ItemOnNavbar>
          <ItemOnNavbar className="" href='/input-grades'>
            <RiBook2Fill className={'w-6 h-6'} />
          </ItemOnNavbar>
          <ItemOnNavbar href='/'>
            <RiHome3Fill className="w-6 h-6" />
          </ItemOnNavbar>
          <ItemOnNavbar href='/'>
            <RiBook3Fill className="w-6 h-6" />
          </ItemOnNavbar>
          <ItemOnNavbar className={'md:hidden'} href='/'>
            <FaUserAlt className={'w-6 h-6 cursor-pointer'} />
          </ItemOnNavbar>
        </div>
        <div className="justify-center hidden md:flex">
          <Link href={'/'}>
            <FaUserAlt className={'w-6 h-6 cursor-pointer'} />
          </Link>
        </div>
      </div>
      <main className="h-[90vh] md:h-full w-full flex justify-center">
        {children}
      </main>
    </div>
  )
}

export default Layout