export class Cost {

  constructor(cost) {

    this.init(cost);

    this.amount *= 1;

    this.id *= 1;

    this.budgets_id *= 1;

  }

  init(object) {
    for(const[k,v] of Object.entries(object)) {
      this[k] = v;
    }
  }

}