<template>
  <div class="container">
    <div class="calculator">
       <top></top>
      <display :value="displayValue" :test="test"></Display>

      <div class="actions">
        <div class="numbers">
          <v-button primary @click="addDigit(7)">7</v-button>
          <v-button primary @click="addDigit(8)">8</v-button>
          <v-button primary @click="addDigit(9)">9</v-button>
          <v-button primary @click="addDigit(4)">4</v-button>
          <v-button primary @click="addDigit(5)">5</v-button>
          <v-button primary @click="addDigit(6)">6</v-button>
          <v-button primary @click="addDigit(1)">1</v-button>
          <v-button primary @click="addDigit(2)">2</v-button>
          <v-button primary @click="addDigit(3)">3</v-button>
          <v-button primary block @click="addDigit(0)">0</v-button>
        </div>

        <div class="functions">
          <v-button @click="setOperation('+')">+</v-button>
          <v-button @click="setOperation('-')">-</v-button>
          <v-button @click="setOperation('*')">*</v-button>
          <v-button @click="setOperation('/')">/</v-button>
        </div>

        <div class="know">
          <v-button  @click="clearMemory()">AC</v-button>
          <v-button  @click="addDigit('.')">.</v-button>
          <v-button spot @click="setOperation('=')">=</v-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Display from "../components/Display";
import Top from '../components/Top'
import VButton from './VButton'
export default {
  components:{Display, Top, VButton},
  data: function () {
    return {
      displayValue: "0",
      clearDisplay: false,
      operation: null,
      values: [0, 0],
      current: 0,
      test: [],
    };
  },
  methods: {
    clearMemory() {
      Object.assign(this.$data, this.$options.data());
    },

    setOperation(operation) {
      this.displayValue = 0;
      if (this.current === 0) {
        this.operation = operation;
        this.current = 1;
        this.clearDisplay = true;
        this.test.push(`${ this.values[0] } ${operation}`)
      } else {
        this.test.push(`${ this.values[1] } ${operation}`)

        const equals = operation === "=";
        const currentOperation = this.operation;
        try {
          this.values[0] = eval(
            `${this.values[0]} ${currentOperation} ${this.values[1]}`
          );
        } catch (e) {
          this.$emit("onError", e);
        }
        this.values[1] = 0;
        this.displayValue = this.values[0];
        this.operation = equals ? null : operation;
        this.current = equals ? 0 : 1;
        this.clearDisplay = !equals;
      }
    
    },

    history(operation){
      if(operation != '=')  this.test =`${this.test} ${ this.values[0] } ${operation}`
      else this.test = 0;
    },

    addDigit(n) {
      if (n === "." && this.displayValue.includes(".")) {
        return;
      }

      const clearDisplay = this.displayValue === "0" || this.clearDisplay;
      const currentValue = clearDisplay ? "" : this.displayValue;
      const displayValue = currentValue + n;

      this.displayValue = displayValue;
      this.clearDisplay = false;

      this.values[this.current] = displayValue;
    },
  },
};
</script>