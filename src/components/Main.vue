<template>
  <div class="container">
    <div class="calculator">
       <top></top>
      <display :value="displayValue" :test="test"></Display>

      <div class="actions">
        <div class="numbers">
          <button class="btn btn-primary" @click="addDigit(7)">7</button>
          <button class="btn btn-primary" @click="addDigit(8)">8</button>
          <button class="btn btn-primary" @click="addDigit(9)">9</button>
          <button class="btn btn-primary" @click="addDigit(4)">4</button>
          <button class="btn btn-primary" @click="addDigit(5)">5</button>
          <button class="btn btn-primary" @click="addDigit(6)">6</button>
          <button class="btn btn-primary" @click="addDigit(1)">1</button>
          <button class="btn btn-primary" @click="addDigit(2)">2</button>
          <button class="btn btn-primary" @click="addDigit(3)">3</button>
          <button class="btn btn-primary w-100" @click="addDigit(0)">0</button>
        </div>

        <div class="functions">
          <button class="btn"  @click="setOperation('+')">+</button>
          <button class="btn" @click="setOperation('-')">-</button>
          <button class="btn" @click="setOperation('*')">*</button>
          <button class="btn" @click="setOperation('/')">/</button>
        </div>

        <div class="know">
          <button class="btn" @click="clearMemory()">AC</button>
          <button class="btn" @click="addDigit('.')">.</button>
          <button class="btn btn-spot" @click="setOperation('=')">=</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Display from "../components/Display";
import Top from '../components/Top'
export default {

  components:{Display, Top},
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