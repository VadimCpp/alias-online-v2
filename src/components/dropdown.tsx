import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronDownIcon,
  UserIcon,
  HomeIcon,
  VideoCameraIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/20/solid'

const Dropdown: React.FC = () => {
  return (
    <div className="w-56 text-right absolute right-10 top-6 z-10">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white bg-opacity-40 px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Menu
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
            
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link to="/"
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => { console.log('home') }} 
                  >
                    {active ? (
                      <HomeIcon
                        className="mr-2 h-5 w-5 text-violet-400 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    ) : (
                      <HomeIcon
                        className="mr-2 h-5 w-5 text-violet-400 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    )}
                    Home
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link to="/profile"
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => { console.log('profile') }}
                  >
                    {active ? (
                      <UserIcon
                        className="mr-2 h-5 w-5 text-violet-400 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    ) : (
                      <UserIcon
                        className="mr-2 h-5 w-5 text-violet-400 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    )}
                    Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link to="/room"
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => { console.log('room') }}
                  >
                    {active ? (
                      <VideoCameraIcon
                        className="mr-2 h-5 w-5 text-violet-400 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    ) : (
                      <VideoCameraIcon
                        className="mr-2 h-5 w-5 text-violet-400 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    )}
                    Room
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link to="/about"
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => { console.log('about') }}
                  >
                    {active ? (
                      <QuestionMarkCircleIcon
                        className="mr-2 h-5 w-5 text-violet-400 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    ) : (
                      <QuestionMarkCircleIcon
                        className="mr-2 h-5 w-5 text-violet-400 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    )}
                    About
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Dropdown
