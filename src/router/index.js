import Vue from 'vue';
import VueRouter from 'vue-router';
import Employees from '@/views/Employees.vue';
import EmployeeAdd from '@/views/EmployeeAdd.vue';
import Employee from '@/views/Employee.vue';
import Device from '@/views/Device.vue';
import DeviceAdd from '@/views/DeviceAdd.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'employees',
    component: Employees,
  },
  {
    path: '/employee',
    name: 'employee-add',
    component: EmployeeAdd,
  },
  {
    path: '/employee/:id',
    name: 'employee',
    component: Employee,
  },
  {
    path: '/employee/:id/devices',
    name: 'employee-devices',
    component: DeviceAdd,
  },
  {
    path: '/device/:id',
    name: 'device',
    component: Device,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
