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
    <button @click="addDevice()" class="btn btn-primary">Добавить</button>
    <button @click="redirectToEmployee()" class="btn btn-secondary ml-2">Отмена</button>
  </div>
</template>

<script>
export default {
  name: 'DeviceAdd',
  data() {
    return {
      title: '',
      price: '',
    };
  },
  methods: {
    addDevice() {
      this.$http.post(`/employee/${this.$route.params.id}/devices`, {
        title: this.title,
        price: this.price,
      }).then((response) => {
        if (response.status === 200) {
          window.alert('Девайс успешно добавлен!');
          this.redirectToEmployee();
        }
      });
    },
    redirectToEmployee() {
      this.$router.push({
        name: 'employee',
        params: {
          id: this.$route.params.id,
        },
      });
    },
  },
};
</script>

<style scoped>

</style>
