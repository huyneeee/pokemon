import lab2 from './lab2/index';

import General from './slide04';
import lab4 from './lab4/index'
import {demo1,demo2} from './chap/chap07'
import lab3 from './lab3/index';
import lab5 from './lab5/index'
import Assigment from './asm';
// const Lab2 = new lab2();
// console.log('========lab2========');
// Lab2.bai1();
// Lab2.bai2();
// Lab2.bai3();
// Lab2.bai4();
// Lab2.bai5_2();

//lab3 
// console.log('========lab3========');
// const Lab3 = new lab3();
// Lab3.bai1();
// Lab3.bai2();

//lab4
// console.log('===========lab4=========');
// const Lab4 = new lab4();
// Lab4.bai1();
// Lab4.bai2();
// Lab4.bai3();
// Lab4.bai4();

//lab5 
const Lab5 = new lab5()
// Lab5.bai2();
// Lab5.bai4();
Lab5.bai5();

// asm
const asm = new Assigment();
// asm.play();
asm.login();

//chap  06
// console.log('chap06');
// class GeneralSpells extends General{
//     dameSpells : number;
//     name : string;
//     constructor(nameGame:string,typeGeneral:string,dameSpells:number , name:string){
//         super(nameGame,typeGeneral);
//         this.dameSpells = dameSpells;
//         this.name=name;
//     }
//     show(){
//         console.log(`
//         NameGame:${this.nameGame}
//         NAME: ${this.name}
//         TYPE:${this.typeGeneral}
//         DameSpell : ${this.dameSpells}
//         `);
//     }
// }
// const natalya = new GeneralSpells('Liên Quân','Tướng phép',92,'Natalya');

// natalya.show();


// chap06
// console.log('chap06');
// interface Named {
//     readonly name : string;
// }
// interface Greetable extends Named {
//     greet(pharase : string ) : void;
// }
// class Person implements Greetable {
//      name : string;
//      age = 21;
//      constructor(n:string) {
//          this.name = n;
//      }
//      greet(pharase : string){
//          console.log(`${pharase} : ${this.name}`);
//      }
// }
// let user1 = new Person('HUY');
// user1.greet('Hello');
// console.log(user1);


// demo2
// console.log('demo2');
// abstract class Department {
//     static fiscalYear = 2020;
//     protected employees : string[] = [];

//     constructor (protected readonly id:string , public name : string ){}

//     static creatEmployee(name : string ){
//         return { name : name };
//     }
//     abstract descrbe(this : Department ) :void;
// }
// class ITDepartment extends Department {
//     admins : string[];
//     constructor ( id : string , admins:string[]){
//         super(id,id);
//         this.admins = admins;
//     }
//     descrbe(){
//         console.log(`IT Department - ID : ${this.id}`);
//     }
// }
// const oki = new ITDepartment('9',['huy','ne']);

// console.log(Department.creatEmployee('oki'));
// oki.descrbe();

//chap 07
// demo1();
// demo2();