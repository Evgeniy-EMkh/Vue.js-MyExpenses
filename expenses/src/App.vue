<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">

    <header>
      <div class="title">My personal cost</div>
    </header>
    <main>
      TOTAL: {{getFullPaymentValue}}
      <hr />
      <br />
      <button @click="clicked">ADD NEW COST+</button>
      <br />
      <br />
      <div v-if="showForm">
        <add-payment-form @addPayment="add" />
      </div>
      <br />
      <payments-display :items="paymentsList" />
    </main>
  </div>
</template>

<script>
  import PaymentsDisplay from './components/PaymentsDisplay.vue'
  import AddPaymentForm from './components/AddPaymentForm.vue'
  import { mapMutations, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'App',
    components: {
      PaymentsDisplay,
      AddPaymentForm,
    },
    data() {
      return {
        show: false,
        showForm: false,
      };
    },
    computed: {
      ...mapGetters([
        'getFullPaymentValue'
      ]),
      paymentsList() {
        return this.$store.getters.getPaymentsList
      },
    },

    methods: {
      ...mapMutations({
        myMutation: 'setPaymentsListData'
      }),
      ...mapActions([
        'fetchData'
      ]),
      clicked() {
        this.showForm = this.showForm == false ? true : false;
      },

      add(data) {
        this.$store.commit('addDataToPaymentsList', data)
      },

      //fetchData() {
      //  return [
      //    {
      //      id: '1',
      //      date: '28.03.2020',
      //      category: 'Food',
      //      value: 169,
      //    },
      //    {
      //      id: '2',
      //      date: '24.03.2020',
      //      category: 'Transport',
      //      value: 360,
      //    },
      //    {
      //      id: '3',
      //      date: '24.03.2020',
      //      category: 'Food',
      //      value: 532,
      //    },
      //  ]
      //}
    },
    created() {
      this.fetchData()
      //this.$store.dispatch('fetchData')
      //this.$store.commit('setPaymentsListData', this.fetchData())
      //this.paymentsList = this.fetchData()
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>