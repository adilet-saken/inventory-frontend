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
    <button @click="addEmployee()" class="btn btn-primary">Добавить</button>
    <button @click="redirectToEmployees()" class="btn btn-secondary ml-2">Отмена</button>
  </div>
</template>

<script>
export default {
  name: 'EmployeeAdd',
  data() {
    return {
      firstName: '',
      lastName: '',
      patronymic: '',
    };
  },
  methods: {
    addEmployee() {
      this.$http.post('/employees', {
        first_name: this.firstName,
        last_name: this.lastName,
        patronymic: this.patronymic,
      }).then((response) => {
        if (response.status === 200) {
          window.alert('Сотрудник успешно добавлен!');
          this.redirectToEmployees();
        }
      });
    },
    redirectToEmployees() {
      this.$router.push({
        name: 'employees',
      });
    },
  },
};
</script>

<style scoped>

</style>
