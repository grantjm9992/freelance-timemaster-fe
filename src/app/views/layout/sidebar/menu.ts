import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Billing',
    isTitle: true
  },
  {
    label: 'Invoices',
    icon: 'dollar-sign',
    link: '/billing/invoice',
  },
  {
    label: 'Admin',
    isTitle: true
  },
  {
    label: 'Client',
    icon: 'briefcase',
    link: '/time-tracking/client',
  },
  {
    label: 'Project',
    icon: 'trello',
    link: '/time-tracking/project',
  },
   /*
  {
    label: 'Admin',
    profiles: ['company_admin'],
    icon: 'settings',
    subItems: [
      {
        label: 'Users',
        link: '/core/user',
      },
      {
        label: 'Client',
        link: '/time-tracking/client',
      },
      {
        label: 'Project',
        link: '/time-tracking/project',
      },
      {
        label: 'Task',
        link: '/time-tracking/task',
      },
    ]
  },*/
  {
    label: 'Time Tracking',
    isTitle: true
  },
  {
    label: 'Entries',
    icon: 'table',
    link: '/time-tracking/list',
  },
  {
    label: 'My calendar',
    icon: 'calendar',
    link: '/time-tracking/calendar/my-calendar',
  },/*
  {
    label: 'Team calendar',
    icon: 'calendar',
    link: '/time-tracking/calendar/company-calendar',
  },*/
  {
    label: 'Reports',
    icon: 'bar-chart-2',
    link: '/time-tracking/report',
  },/*
  {
    label: 'HR',
    isTitle: true
  },
  {
    label: 'HR Admin',
    profiles: ['company_admin'],
    icon: 'settings',
    subItems: [
      {
        label: 'Absence types',
        link: '/hr/absence-type',
      },
    ]
  }*/
];
