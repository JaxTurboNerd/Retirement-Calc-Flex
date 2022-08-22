export class Retiree {
  constructor(firstName, mInit, lastName, retiredAge) {
    this._firstName = firstName;
    this._mInit = mInit;
    this._lastName = lastName;
    this._retiredAge = retiredAge;
    this._milBuyBack = milBuyBack;
    this._sickLeaveBalance = sickLeaveBalance;
    this._high3Salary = high3Salary;
    this._survivorAnnuity = survivorAnnuity;
    this._enterOnDate = enterOnDate;
    this._retirmentDate = retirementDate;
    this._militaryStartDate = militaryStartDate;
    this._militaryEndDate = militaryEndDate;
    this._ssaBenefit = ssaBenefit;
    this._otherIncome = otherIncome;
  }

  //Getters:
  get firstName() {
    return this._firstName;
  }
  get mInit() {
    return this._mInit;
  }
  get lastName() {
    return this._lastName;
  }
  get retiredAge() {
    return this._retiredAge;
  }
  get milBuyBack() {
    return this._milBuyBack;
  }
  get sickLeaveBalance() {
    return this._sickLeaveBalance;
  }
  get high3Salary() {
    return this._high3Salary;
  }
  get survivorAnnuity() {
    return this._survivorAnnuity;
  }
  get enterOnDate() {
    return this._enterOnDate;
  }
  get retirementDate() {
    return this._retirmentDate;
  }
  get militaryStartDate() {
    return this._militaryStartDate;
  }
  get militaryEndDate() {
    return this._militaryEndDate;
  }
  get ssaBenefit() {
    return this._ssaBenefit;
  }
  get otherIncome() {
    return this._otherIncome;
  }

  //Setters:
  set firstName(name) {
    this._firstName = name;
  }
  set mInit(initial) {
    this._mInit = initial;
  }
  set lasttName(name) {
    this._lastName = name;
  }
  set retiredAge(age) {
    this._retiredAge = age;
  }
  set milBuyBack(didBuyback) {
    this._milBuyBack = didBuyback;
  }
  set sickLeaveBalance(balance) {
    this._sickLeaveBalance = balance;
  }
  set high3Salary(salary) {
    this._high3Salary = salary;
  }
  set survivorAnnuity(annuity) {
    this._survivorAnnuity = annuity;
  }
  set enterOnDate(date) {
    this._enterOnDate = date;
  }
  set retirementDate(date) {
    this._retirmentDate = date;
  }
  set militaryStartDate(date) {
    this._militaryStartDate = date;
  }
  set militaryEndDate(date) {
    this._militaryEndDate = date;
  }
  set ssaBenefit(benefit) {
    this._ssaBenefit = benefit;
  }
  set otherIncome(income) {
    this._otherIncome = income;
  }
}
