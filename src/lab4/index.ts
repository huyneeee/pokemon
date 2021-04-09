
var _ = require('lodash');
class lab4 {
    bai1() {
        interface AddFunction {
            (a: number, b: number): number;
        }
        let add: AddFunction;
        add = (n1: number, n2: number) => {
            return n1 + n2;
        }
        console.log(add(9, 2));
    }
    bai2() {
        interface Named {
            readonly name?: string;
            outputName?: string;
        }
        interface Greetable extends Named {
            greet(phrase: string): void;
        }
        class Person implements Greetable {
            name: string;
            age = 21;
            constructor(n: string) {
                this.name = n;
            }
            greet(phrase: string) {
                console.log(`Hi i am ${this.name}`);
            }
        }
        let user1: Greetable;
        user1 = new Person('huy');
        console.log(user1);

    }
    bai3() {
        abstract class Department {
            static fiscalYear = 2021;
            protected employees: string[] = [];
            constructor(protected readonly id: string, public name: string) {
            }
            static creatEmployee(name: string) {
                return { name: name }
            }
            abstract describe(this: Department): void;
            addEmployee(employee: string) {
                this.employees.push(employee);
            }

            printEmployee() {
                console.log(this.employees.length);
                console.log(this.employees);
            }
        }
        class ITDepartment extends Department {
            admins: string[];
            constructor(id: string, admins: string[]) {
                super(id, 'IT');
                this.admins = admins;
            }
            describe() {
                console.log('IT Department - ID ' + this.id);
            }
        }

        const employee1 = Department.creatEmployee('Huy');
        console.log(employee1, Department.fiscalYear);

        const it = new ITDepartment('9', ['HUY Nè']);

        console.log(it);
        //  it.describe();
        it.addEmployee('Huy HIHI');
        it.addEmployee('HUY ADD 2');
        // it.printEmployee();
    }
    bai4() {
        class pokemons {
            readonly api: string;

            constructor(api: string) {
                this.api = api;
            }

            async render(this: pokemons) {
                // var arr_pokemon: pokemons[] = [];
                var arr_pokemon = []
                for (let i = 9; i <= 38; i++) {
                    let data = await fetch(`${this.api}/${i}`);
                    let pokemon: any = await data.json();
                    arr_pokemon.push({ id: i, name: pokemon.name, image: pokemon.sprites.back_default }, { id: i, name: pokemon.name, image: pokemon.sprites.back_default });

                }

                const shuffle_arr = _.shuffle(arr_pokemon);

                var content = document.querySelector('#main');

                const result = shuffle_arr.map(p => {
                        return `
                        <div class="w-16 h-16 m-1 onepokemon border border-gray-200 rounded shadow-md">
                        <div class="bg-cover bg-center  w-16 h-16 choose" style="background-image: url(${p.image});"></div>
                            <input  value="${p.id}" hidden >
                        </div>
                        `
                }).join('');
                content.innerHTML = result;

                const arrChoose = content.querySelectorAll('.onepokemon');

                arrChoose.forEach((div, index) => {


                    div.addEventListener('click', () => {

                        div.classList.add('bg-gray-200', 'choosed');

                        const divChoosed = document.querySelectorAll('.choosed');

                        if (divChoosed.length === 2) {
                            const firstId = divChoosed[0].querySelector('input').value;
                            const secoundId = divChoosed[1].querySelector('input').value;
                            if (firstId === secoundId) {
                                divChoosed.forEach(ele => {
                                    ele.classList.add('bg-green-400');
                                    setTimeout(() => {
                                        ele.classList.remove('bg-green-400', 'bg-gray-200','choosed');
                                        ele.querySelector('.choose').remove();
                                    }, 500)

                                })
                                
                            } else {
                                divChoosed.forEach(ele => {
                                    ele.classList.add('bg-red-600');
                                    setTimeout(() => {
                                        ele.classList.remove('bg-red-600', 'bg-gray-200','choosed')
                                    }, 500);

                                })
                            }
                        }
                    })
                })
            }



        }
        const pokemon = new pokemons('https://pokeapi.co/api/v2/pokemon');
        pokemon.render();



    }


}
export default lab4;
