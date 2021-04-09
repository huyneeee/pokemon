
var _ = require('lodash');
class lab2 {
    bai1() {
        let number1: number = 5;
        let number2: number = 2.8;
        let pharase: string = 'Result is ';
        let permit: boolean = true;
        const result = number1 + number2;
        if (permit) {
            console.log(pharase + result);
        } else {
            console.log('Not show result');
        }
    }
    bai2() {
        function add(x: any = 5) {
            let phrare: any;
            phrare = 'result is';
            phrare = 10;

            x = '2.8';
            let x2: number = +x;

            return phrare + x2;
        }
        let result: number = add();
        console.log(result);
    }
    bai3() {
        interface persons {
            name: string,
            age: number
        }
        const person: persons = {
            name: "TypeScript",
            age: 11
        }
        console.log(person.name);
    }
    bai4() {
        enum Role { ADMIN, READ_ONLY, AUTHOR };
        const person: {
            name: string,
            age: number,
            hobbies: string[],
            role: string,
            roletuple: [number, string]
        } = {
            name: 'TypeScript',
            age: 11,
            hobbies: ['Sports', 'cooking'],
            role: Role[Role.ADMIN],
            roletuple: [2, 'author']
        }

        let favouriteActivites: any[];
        favouriteActivites = [5, 'Sports', true];
        if (person.role === Role[Role.AUTHOR]) {
            console.log('is author');
        }
        person.roletuple.push('admin');
        person.roletuple[0] = 10;
        person.roletuple = [0, 'user'];
    }
    async bai5_2() {
        interface pokemons {
            name: string,
            image: string
        }
        var arr_pokemon: pokemons[] = [];
        for (let i = 9; i <= 18; i++) {
            let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            let pokemon: any = await data.json();
            arr_pokemon.push({ name: pokemon.name, image: pokemon.sprites.back_default }, { name: pokemon.name, image: pokemon.sprites.back_default });
        }

        const shuffle_arr = _.shuffle(arr_pokemon);


        const content = document.querySelector('#main');
        const result = shuffle_arr.map(p => {
            return `
                <div class="border border-gray-400 px-10 py-10 text-center rounded shadow-md relative" id="pokemon">
                            <div class="bg-cover bg-center w-auto h-32 choose" style="background-image: url(${p.image});"></div>
                        </div>
                `
        }).join('');
        content.innerHTML = result;

    }

}
export default lab2;