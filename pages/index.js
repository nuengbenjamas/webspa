import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/Outline'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'About', href: './about' },
  { name: 'Admin', href: '#' },
  { name: 'Config', href: '#' },
]

export default function Home() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <Popover>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <a href="">
                      <span className="sr-only">Workflow</span>
                      <img
                        className="h-8 w-auto sm:h-10"
                        src="data:image/png;base64,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"
                      />
                    </a>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                  {navigation.map((item) => (
                    <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                      {item.name}
                    </a>
                  ))}
                  <a href="login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Log in
                  </a>
                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://yt3.ggpht.com/bIuyb_udmTbAduqSb7KoJqNuDw1Sxv6FH_VNsb70EQHElyZWzbtq1cBkQkglQs4Pun1ylg6YWw=s600-c-k-c0x00ffffff-no-rj-rp-mo"
                        alt=""
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close main menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                  >
                    Log in
                  </a>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Nueng Flower Store</span>{' '}
                <span className="block text-indigo-600 xl:inline">online Shopping</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                ร้านขายดอกไม้ออนไลน์ บริการจำหน่ายดอกไม้ทั้งแบบดอกและช่อ 
                <br></br>รับจัดช่อดอกไม้ ในโอกาสต่าง ๆ 
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Shopping
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="https://www.youtube.com/watch?v=x2r2sZYBx0I"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Youtube
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://inwfile.com/s-o/g5m9oy.jpg"
          alt=""
        />
      </div>
    </div>
  )
}