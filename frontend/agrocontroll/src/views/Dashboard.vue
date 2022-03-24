<template>
  <div class="grey lighten-2 ma-2">
    <v-row>
      <v-col cols="12">
        <v-card class="ma-2">
          <v-card-title class="d-flex justify-center">
            <h1 class="text-h2">Pesticidas Cadastrados</h1>
          </v-card-title>
          <v-card-text>
            <bar-chart
              v-if="loaded"
              :chart-data="chartDataPesticida"
            ></bar-chart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="ma-2">
          <v-card-title class="d-flex justify-center">
            <h1 class="display-1">Estados Cadastrados</h1>
          </v-card-title>
          <v-card-text>
            <bar-chart v-if="loaded" :chart-data="chartDataEstadoAgrupado">
            </bar-chart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="ma-2">
          <v-card-title class="d-flex justify-center">
            <h1 class="display-1">Porcentagem de Estados Cadastrados (%)</h1>
          </v-card-title>
          <v-card-text>
            <pie-chart v-if="loaded" :chart-data="chartDataPercentageEstado">
            </pie-chart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  components: {
    BarChart: () => import("@/components/plots/BarChart.vue"),
    PieChart: () => import("@/components/plots/PieChart.vue"),
  },
  data() {
    return {
      loaded: false,
      pesticidaLabel: [],
      quantitiesPesticida: [],
      estadoLabel: [],
      quantitiesEstado: [],
      estatePorcentage: [],
      chartDataPesticida: null,
      chartDataEstadoAgrupado: null,
      chartDataPercentageEstado: null,
      chartDataTemplate: {
        labels: [],
        datasets: [
          {
            label: "",
            backgroundColor: [
              "#C2185B",
              "#EC407A",
              "#7B1FA2",
              "#8E24AA",
              "#D32F2F",
              "#E53935",
              "#E65100",
              "#EF6C00",
              "#304FFE",
              "#304FFE",
              "#1A237E",
              "#303F9F",
              "#2E7D32",
              "#388E3C",
              "#00E676",
              "#00C853",
              "#C6FF00",
              "#FF6D00",
              "#FF9100",
              "#EF6C00",
              "#FF3D00",
              "#E64A19",
              "#263238",
              "#37474F",
              "#78909C",
              "#00695C",
            ],
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    async loadCountedPesticida() {
      try {
        await Axios.get(`${process.env.VUE_APP_BASEURL}/grouped/pesticida`)
          .then((res) => {
            res.data.forEach((element) => {
              this.pesticidaLabel.push(element.pesticida);
              this.quantitiesPesticida.push(element.quantidade);
            });
          })
          .catch((err) => res.send(err));
        let chartData = Object.assign({}, this.chartDataTemplate);
        chartData.labels = this.pesticidaLabel;
        chartData.datasets[0].data = this.quantitiesPesticida;
        this.chartDataPesticida = chartData;
      } catch (error) {
        console.log(error);
      }
    },

    async loadCountedEstado() {
      try {
        await Axios.get(`${process.env.VUE_APP_BASEURL}/grouped/estado`)
          .then((res) =>
            res.data.map((element) => {
              this.estadoLabel.push(element.estado);
              this.quantitiesEstado.push(element.quantidade);
            })
          )
          .catch((err) => console.log(err));
        let chartData = Object.assign({}, this.chartDataTemplate);
        chartData.labels = this.estadoLabel;
        chartData.datasets[0].data = this.quantitiesEstado;
        this.chartDataEstadoAgrupado = chartData;
      } catch (error) {}
    },
    async loadPorcentageEstate() {
      try {
        const allEstates = await Axios.get(
          `${process.env.VUE_APP_BASEURL}/agrousers`
        )
          .then((res) => res.data.map((register) => register.estado))
          .catch((err) => res.send(err));

        const amountRegister = allEstates.length;
        let porcentage = this.quantitiesEstado.map((quantitie) =>
          ((quantitie / amountRegister) * 100).toFixed(2)
        );
        let chartData = Object.assign({}, this.chartDataTemplate);
        chartData.labels = this.estadoLabel;
        chartData.datasets[0].data = porcentage;
        this.chartDataPercentageEstado = chartData;
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.loaded = false;
    this.loadCountedPesticida();
    this.loadCountedEstado();
    this.loadPorcentageEstate();
    this.loaded = true;
  },
};
</script>

<style></style>
