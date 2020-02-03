<template>
  <div class="employees">
    <h5>Список сотрудников</h5>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th @click="sortBy('name')" scope="col">
            ФИО
            <font-awesome-icon
                v-if="!sortingColumn"
                :icon="['fas', 'sort']" />
            <font-awesome-icon
                v-if="sortingColumn === 'name' && !sortingDescending"
                :icon="['fas', 'caret-up']" />
            <font-awesome-icon
                v-if="sortingColumn === 'name' && sortingDescending"
                :icon="['fas', 'caret-down']" />
          </th>
          <th @click="sortBy('quantity')" scope="col">
            Кол-во
            <font-awesome-icon
                v-if="!sortingColumn"
                :icon="['fas', 'sort']" />
            <font-awesome-icon
                v-if="sortingColumn === 'quantity' && !sortingDescending"
                :icon="['fas', 'caret-up']" />
            <font-awesome-icon
                v-if="sortingColumn === 'quantity' && sortingDescending"
                :icon="['fas', 'caret-down']" />
          </th>
          <th @click="sortBy('price')" scope="col">
            Общая стоимость
            <font-awesome-icon
                v-if="!sortingColumn"
                :icon="['fas', 'sort']" />
            <font-awesome-icon
                v-if="sortingColumn === 'price' && !sortingDescending"
                :icon="['fas', 'caret-up']" />
            <font-awesome-icon
                v-if="sortingColumn === 'price' && sortingDescending"
                :icon="['fas', 'caret-down']" />
          </th>
        </tr>
        <tr>
          <th scope="col">
            <input v-model="nameQuery"
                   type="text"
                   class="form-control"
                   placeholder="ФИО">
          </th>
          <th scope="col">
            <input v-model="quantityQuery"
                   type="number"
                   class="form-control"
                   placeholder="Кол-во">
          </th>
          <th scope="col">
            <input v-model="priceQuery"
                   type="number"
                   class="form-control"
                   placeholder="Общая стоимость">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in paginatedEmployees"
            :key="employee.id"
            :class="{ 'table-active': activeRow === employee.id }"
            @click="activeRow = employee.id"
            @dblclick="redirectToEmployee(employee.id)"
            @contextmenu="deleteEmployee(employee.id)">
          <td>{{ getName(employee) }}</td>
          <td>{{ employee.devices_count ? employee.devices_count : 0 }}</td>
          <td>{{ employee.devices_price ? employee.devices_price : 0 }}</td>
        </tr>
      </tbody>
    </table>
    <nav>
      <ul class="pagination">
        <li v-for="page in sortedEmployees.length ? Math.ceil(sortedEmployees.length / 10):1"
            :key="page"
            :class="{ 'active': currentPage === page }"
            class="page-item">
          <a @click="currentPage = page" class="page-link" href="#">{{ page }}</a>
        </li>
      </ul>
    </nav>
    <button @click="redirectToAddEmployee()"
            class="btn btn-primary">Добавить</button>
  </div>
</template>

<script>
export default {
  name: 'Employees',
  data() {
    return {
      nameQuery: '',
      quantityQuery: '',
      priceQuery: '',
      employees: [],
      currentPage: 1,
      sortingColumn: false,
      sortingDescending: false,
      activeRow: false,
    };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter(e => this.getName(e).indexOf(this.nameQuery) !== -1
        && ((this.quantityQuery ? this.quantityQuery === e.devices_count : true)
          || (!e.devices_count && this.quantityQuery === '0'))
        && ((this.priceQuery ? this.priceQuery === e.devices_price : true)
          || (!e.devices_price && this.priceQuery === '0')));
    },
    sortedEmployees() {
      const employees = this.filteredEmployees.slice();
      if (this.sortingColumn) {
        employees.sort((a, b) => {
          let c = a;
          let d = b;
          if (this.sortingColumn === 'name') {
            c = this.getName(a);
            d = this.getName(b);
          } else if (this.sortingColumn === 'quantity') {
            c = a.devices_count;
            d = b.devices_count;
          } else if (this.sortingColumn === 'price') {
            c = a.devices_price;
            d = b.devices_price;
          }
          let value;
          if (c > d) {
            value = 1;
          } else if (c < d) {
            value = -1;
          } else {
            value = 0;
          }
          return this.sortingDescending ? value * -1 : value;
        });
      }
      return employees;
    },
    paginatedEmployees() {
      return this.sortedEmployees.slice((this.currentPage - 1) * 10, this.currentPage * 10);
    },
  },
  methods: {
    sortBy(column) {
      if (column === this.sortingColumn) {
        this.sortingDescending = !this.sortingDescending;
      } else {
        this.sortingColumn = column;
        this.sortingDescending = false;
      }
    },
    getName(employee) {
      return `${employee.last_name} ${employee.first_name.charAt(0)}. ${employee.patronymic.charAt(0)}.`;
    },
    redirectToEmployee(id) {
      this.$router.push({
        name: 'employee',
        params: { id },
      });
    },
    redirectToAddEmployee() {
      this.$router.push({
        name: 'employee-add',
      });
    },
    deleteEmployee(id) {
      if (window.confirm('Вы действительно хотите удалить данного сотрудника?')) {
        this.$http.delete(`/employee/${id}`)
          .then((response) => {
            if (response.status === 200) {
              window.location.reload(true);
            }
          });
      }
    },
  },
  created() {
    this.$http.get('/employees')
      .then((response) => {
        this.employees = response.data;
      });
  },
};
</script>

<style scoped>
  .employees {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
