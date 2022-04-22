import {
  Cost
} from '@/models';

export class Budget {

  constructor(budget) {

    this.init(budget);

    this.limit *= 1;

    this.total = this.costs.reduce((a, b) =>
    {
        return a + b.amount;
    }, 0);

    this.progress = this.limit ? this.total / this.limit : null;

    this.saving = [true,'true'].includes(this.saving) ? true : false;

    this.isDead = this.total >= this.limit;

    // this.maxPerDayAmount = function(daysUntilSalary) {
    //   return Math.max((this.limit - this.total) / daysUntilSalary, 0);
    // }

  }

  init(object) {
    for(const[k,v] of Object.entries(object)) {
      this[k] = v;
    }

    this.costs = [];

    object.costs.forEach(cost => {
      this.costs.push(new Cost(cost));
    });
  }

  // getMaxPerDayAmount(daysUntilSalary) {
  //   return Math.max((this.limit - this.total) / daysUntilSalary, 0);
  // }

}