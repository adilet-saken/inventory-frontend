<template>
  <div>
    <form>
      <div class="form-group row">
        <label for="inputTitle" class="col-sm-2 col-form-label">Название</label>
        <div class="col-sm-10">
          <input v-model="title"
                 type="text"
                 class="form-control"
                 id="inputTitle">
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPrice" class="col-sm-2 col-form-label">Цена</label>
        <div class="col-sm-10">
          <input v-model="price"
                 type="number"
                 class="form-control"
                 id="inputPrice">
        </div>
      </div>
    </form>
    <button @click="editDevice()" class="btn btn-primary">Сохранить</button>
    <button @click="redirectToEmployee()" class="btn btn-secondary ml-2">Отмена</button>
  </div>
</template>

<script>
export default {
  name: 'Device',
  data() {
    return {
      title: '',
      price: undefined,
      employee_id: undefined,
    };
  },
  methods: {
    editDevice() {
      this.$http.put(`/devices/${this.$route.params.id}`, {
        title: this.title,
        price: this.price,
      }).then((response) => {
        if (response.status === 200) {
          window.alert('Девайс успешно сохранен!');
        }
      });
    },
    redirectToEmployee() {
      this.$router.push({
        name: 'employee',
        params: {
          id: this.employee_id,
        },
      });
    },
  },
  created() {
    this.$http.get(`/devices/${this.$route.params.id}`)
      .then((response) => {
        this.title = response.data[0].title;
        this.price = response.data[0].price;
        this.employee_id = response.data[0].employee_id;
      });
  },
};
</script>

<style scoped>

</style>
