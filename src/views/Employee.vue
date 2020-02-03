<template>
  <div>
    <form>
      <div class="form-group row">
        <label for="inputLastName" class="col-sm-2 col-form-label">Фамилия</label>
        <div class="col-sm-10">
          <input v-model="lastName"
                 type="text"
                 class="form-control"
                 id="inputLastName">
        </div>
      </div>
      <div class="form-group row">
        <label for="inputFirstName" class="col-sm-2 col-form-label">Имя</label>
        <div class="col-sm-10">
          <input v-model="firstName"
                 type="text"
                 class="form-control"
                 id="inputFirstName">
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPatronymic" class="col-sm-2 col-form-label">Отчество</label>
        <div class="col-sm-10">
          <input v-model="patronymic"
                 type="text"
                 class="form-control"
                 id="inputPatronymic">
        </div>
      </div>
    </form>
    <button @click="editEmployee()" class="btn btn-primary">Сохранить</button>
    <button @click="redirectToEmployees()" class="btn btn-secondary ml-2">Отмена</button>
    <div class="devices">
      <h5>Список выданных материальных ценностей:</h5>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">№ п/п</th>
            <th scope="col">Название</th>
            <th scope="col">Стоимость</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(device, index) in devices"
              :key="device.id"
              :class="{ 'table-active': activeRow === device.id }"
              @click="activeRow = device.id"
              @dblclick="redirectToDevice(device.id)"
              @contextmenu="deleteDevice(device.id)">
            <td>{{ index + 1 }}</td>
            <td>{{ device.title }}</td>
            <td>{{ device.price ? device.price : 0 }}</td>
          </tr>
          <tr>
            <td colspan="2">Итого</td>
            <td>{{ devices.map(device => parseInt(device.price)).reduce((a, b) => a + b, 0) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="redirectToDeviceAdd()" class="btn btn-primary">Добавить девайс</button>
  </div>
</template>

<script>
export default {
  name: 'Employee',
  data() {
    return {
      firstName: '',
      lastName: '',
      patronymic: '',
      devices: [],
      activeRow: false,
    };
  },
  methods: {
    editEmployee() {
      this.$http.put(`/employee/${this.$route.params.id}`, {
        first_name: this.firstName,
        last_name: this.lastName,
        patronymic: this.patronymic,
      }).then((response) => {
        if (response.status === 200) {
          window.alert('Сотрудник успешно сохранен!');
        }
      });
    },
    redirectToEmployees() {
      this.$router.push({
        name: 'employees',
      });
    },
    redirectToDevice(id) {
      this.$router.push({
        name: 'device',
        params: { id },
      });
    },
    redirectToDeviceAdd() {
      this.$router.push({
        name: 'employee-devices',
        params: {
          id: this.$route.params.id,
        },
      });
    },
    deleteDevice(id) {
      if (window.confirm('Вы действительно хотите удалить данный девайс?')) {
        this.$http.delete(`/devices/${id}`)
          .then((response) => {
            if (response.status === 200) {
              window.location.reload(true);
            }
          });
      }
    },
  },
  created() {
    this.$http.get(`/employee/${this.$route.params.id}`)
      .then((response) => {
        this.firstName = response.data[0].first_name;
        this.lastName = response.data[0].last_name;
        this.patronymic = response.data[0].patronymic;
      });
    this.$http.get(`/employee/${this.$route.params.id}/devices`)
      .then((response) => {
        this.devices = response.data;
      });
  },
};
</script>

<style scoped>
  .devices {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  td[colspan="2"] {
    text-align: end;
  }
</style>
