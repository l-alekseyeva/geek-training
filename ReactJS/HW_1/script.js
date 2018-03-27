// Задание №1

let loop = (times = 0, callback = null) => {
  if (callback) {
    for (let i = 1; i <= times; i++) {
      callback(console.log('Вывели функцию ' + i + '.'));
    }
  } else {
    return false;
  }
};

loop(3, function() {
});

loop(4);

// Задание №2

let calculateArea = (a, b) => {
  let area = a * b;
  let fig = {};
  if (a === b) {
    fig = {
      area: area,
      figure: 'square',
      input: {a , b}
    }
  } else {
    fig = {
      area: area,
      figure: 'rectangule',
      input: {a , b}
    }
  }
  console.log(fig);
}

calculateArea(3, 3);
calculateArea(5, 4);

// Задание №3

class Human {
  constructor(name, age, dateOfBirth) {
    this.name = name;
    this.age = age;
    this.dateOfBirth = dateOfBirth;
  }
  displayInfo() {
    console.log(`Name: ${this.name}. Age: ${this.age}. Date of birth: ${this.dateOfBirth}.`);
  }
};

class Employee extends Human{
  constructor(name, age, dateOfBirth, salary, department) {
    super(name, age, dateOfBirth);
    this.salary = salary;
    this.department = department;
  }
  displayInfo() {
    super.displayInfo();
    console.log(`Salary: ${this.salary}. Department: ${this.department}.`);
  }
}
