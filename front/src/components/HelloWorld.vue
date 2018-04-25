<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Sis MEVN</h2>

    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Senha</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users.data" :key="user._id">
          <th>{{ user.name }}</th>
          <th>{{ user.email }}</th>
          <th>{{ user.password }}</th>
          <th></th>
        </tr>
      </tbody>

    </table>

    <form @submit.prevent="save()">
      <input type="text" placeholder="Nome" v-model="toSave.name">
      <input type="text" placeholder="E-mail" v-model="toSave.email">
      <input type="text" placeholder="password" v-model="toSave.password">

      <button type="submit">+</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      toSave: {},
      updateStatus: false,
      users: {data: []}
    }
  },
  methods: {
    save () {
      if (this.updateStatus) {
        this.update()
      } else {
        console.log('save')
        this.create()
      }
    },
    getList () {
      window.axios.get('/api/users')
        .then((res) => {
          console.log('getList')
          this.users = res.data
        })
    },
    remove (id) {
      window.axios.delete('/api/users' + id)
        .then(() => {
          this.getList()
        })
    },
    create () {
      console.log('create 1')
      console.log(this.toSave)
      window.axios.post('/api/users', this.toSave).then(() => {
        console.log('create 2')
        this.toSave = {}
        this.getList()
      })
    },
    update () {
      window.axios.put('/api/users/' + this.toSave._id, this.toSave).then(() => {
        this.toSave = {}
        this.updateStatus = false
        this.getList()
      })
    },
    toUpdate (user) {
      this.updateStatus = user._id
      this.toSave = user
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
