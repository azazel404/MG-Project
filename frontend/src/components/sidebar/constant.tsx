import { IconSettings, IconCalendar, IconUsers, IconCalendarEvent, IconCar, IconLayoutDashboard } from '@tabler/icons-react'

export const navigation = [
 {
  section: 'General',
  navigation: [
   {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <IconLayoutDashboard />,
   },
   {
    title: 'Events',
    path: '/events',
    icon: <IconCalendarEvent />,
   },
   {
    title: 'Packages',
    path: '/packages',
    icon: <IconCar />,
   },
   {
    title: 'Customers',
    path: '/customers',
    icon: <IconUsers />,
   },
   {
    title: 'Configuration',
    path: '/tables',
    icon: <IconSettings />,
   },
   //    {
   //     title: 'Calendar',
   //     path: '/calendar',
   //     icon: <IconCalendar />,
   //    },
  ],
 },
]
