var _ = require('lodash');
class Assigment {
    async Pokemon() {
        interface pokemons {
            id: number,
            name: string,
            image: string
        }
        var arr_pokemon: pokemons[] = [];

        for (let i = 9; i <= 38; i++) {
            let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
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


        //time out
        var point = 0;

        const btnStart = document.querySelector('#start');

        btnStart.addEventListener('click', () => {
            document.querySelector('#start').classList.add('hidden');
            document.querySelector('#again').classList.remove('hidden');
            let count = 60;
            const countTime = setInterval( ()=>{
                count--;
                if (count >= 0) {

                    document.querySelector('#timeout').innerHTML = count.toString();
                }
                if (count === 0) {
                    document.querySelector('#timeout').innerHTML = 'Time Out';
                    content.innerHTML = '<p class="text-4xl font-bold uppercase">game over !</p>';

                }

            }, 1000)
            
            content.innerHTML = result;

            //play game
            const arrChoose = content.querySelectorAll('.onepokemon');
            arrChoose.forEach((div, index) => {
                div.addEventListener('click', () => {

                    div.classList.add('bg-gray-200', 'choosed');

                    const divChoosed = document.querySelectorAll('.choosed');

                    if (divChoosed.length === 2) {
                        const firstId = divChoosed[0].querySelector('input').value;
                        const secoundId = divChoosed[1].querySelector('input').value;
                        if (firstId === secoundId) {
                            //point
                            point+=5   
                            document.querySelector('#point').innerHTML=point.toString();
                            

                            divChoosed.forEach(ele => {
                                ele.classList.add('bg-green-400');
                                setTimeout(() => {
                                    ele.classList.remove('bg-green-400', 'bg-gray-200', 'choosed');
                                    ele.querySelector('.choose').remove();
                                    if(point===150){
                                        clearInterval(countTime);
                                        content.innerHTML = '<p class="text-4xl font-bold uppercase">You win 👏👏👏</p>';          
                                    }
                                }, 500)

                            })
                        } else {
                            divChoosed.forEach(ele => {
                                ele.classList.add('bg-red-600');
                                setTimeout(() => {
                                    ele.classList.remove('bg-red-600', 'bg-gray-200', 'choosed')
                                }, 500);

                            })
                        }
                    }
                })
            })
           

        })
        
        const btnAgain = document.querySelector('#again');
        btnAgain.addEventListener('click',()=>{
            window.location.reload();
        })
       

    }
    login(){
   
        
        const form = document.querySelector('#form');
        const result = `
        
            <input type = "text" placeholder="Name Game" class="border border-gray-600 py-3 px-3 w-100 ">
            <button type="submit"  class="px-5 py-3 bg-black text-white button">Login</button>
        `;

        form.innerHTML = result;
        
        const button = form.querySelector('.button');
        const input = form.querySelector('input');
        form.addEventListener('submit',e=>{
            e.preventDefault();
            if(input.value==='pokemon'){
                document.querySelector('#game').classList.remove('hidden');
                document.querySelector('#formLogin').classList.add('hidden');
                  this.Pokemon();
            }else{
                input.style.border = 'red solid 1px'
            }
 
            
        })
    }
}
export default Assigment;