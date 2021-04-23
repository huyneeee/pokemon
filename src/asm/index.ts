var _ = require('lodash');
const moment = require('moment');
const $ = document.querySelector.bind(document);
class Assigment {

    async getApi() {
        interface pokemons {
            id: number,
            name: string,
            image: string
        }
        var arr_pokemon: pokemons[] = [];

        for (let i = 9; i <= 33; i++) {
            let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            let pokemon: any = await data.json();
            arr_pokemon.push({ id: pokemon.id, name: pokemon.name, image: pokemon.sprites.back_default }, { id: pokemon.id, name: pokemon.name, image: pokemon.sprites.back_default });
        }

        const shuffle_arr = _.shuffle(arr_pokemon);

        const result = shuffle_arr.map(p => {
            return `
                    <div class="relative h-28 w-20 m-2  transition  duration-500 transform-style-flip transform-style-3d onepokemon">
                        <div class=" border border-white  card justify-center items-center flex choose transform-rotateY-180">
                        <img src="${p.image}" class=" w-20 h-20 ">
                            <input  value="${p.id}" hidden >
                        </div>
                        <div class=" card flex justify-center items-center  " >
                            <img src="../image/back.jpg" class="w-full h-full">
                        </div>
                    </div>
                        `
        }).join('');

        return result;
    }
    saveHistoryPlayer(point:number,gameTime:number) {

        // lấy thông tin user từ localStorage

        const name = JSON.parse(localStorage.getItem('userLogin'));

        const arrPlayer = JSON.parse(localStorage.getItem('userGamer'));

        const timeAtPlay = moment().format('MMMM Do YYYY, h:mm:ss a');

        const indexPlayer = arrPlayer.findIndex(ele => ele.name === name);

        if (indexPlayer != -1) {
            //time now play

            // one user one play
            const timeLine = arrPlayer[indexPlayer].timeLine;

            const gamerSave = { "name": name, "timeLine": [...timeLine, { 'date': timeAtPlay, 'point': point,'gameTime':gameTime }] };

            arrPlayer.splice(indexPlayer, 1, gamerSave);

            localStorage.setItem('userGamer', JSON.stringify(arrPlayer));
        } else {
            const gamerSave = { "name": name, "timeLine": [{ "date": timeAtPlay, "point": point,"gameTime":gameTime }] }

            arrPlayer.push(gamerSave);

            localStorage.setItem('userGamer', JSON.stringify(arrPlayer));
        }

    }
    modal() {


        const modal = $('#modal');
        //local storage
        const name = JSON.parse(localStorage.getItem('userLogin'));
        const arrPlayer = JSON.parse(localStorage.getItem('userGamer'));
        const indexPlayer = arrPlayer.findIndex(ele => ele.name === name);


        const modal_content = $('#modal_content');
        //history click
        $('#history').addEventListener('click', () => {
            modal_content.classList.remove('hidden');
            $('#game').classList.add('blur');
            if (indexPlayer != -1) {
                const result = arrPlayer[indexPlayer].timeLine.map(ele => {
                    return `  
                      <tr>
                            <th
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                                ${ele.date}
                            </th>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                             ${ele.point}
                            </td>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                             ${ele.gameTime}s
                            </td>
                            
                      </tr>
                    `
                }).join('');
                modal.innerHTML = `        
                        <thead>
                        <tr>
                            <th
                            class="px-6 bg-red-300 text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                            DATE
                            </th>
                            <th
                            class="px-6 bg-red-300 text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                            POINT
                            </th>
                            <th
                            class="px-6 bg-red-300 text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                            GAME TIME
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    ${result}
                    </tbody>`;
            } else {
                modal.innerHTML = `
                <p class="text-2xl text-white text-center ">NOT HISTORY</p>
                `
            }
        })
        // ranking click
        $('#ranking').addEventListener('click', () => {
            modal_content.classList.remove('hidden');
            $('#game').classList.add('blur');
            const result = arrPlayer.map(ele => {
                console.log(ele.timeLine);
                if(typeof ele.timeLine!='undefined'){
                    var total = ele.timeLine.reduce((sum, { point }) => sum + point, 0);   
                }
               
                return `  
                      <tr>
                            <th
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                                ${ele.name}
                            </th>
                            <th
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                                ${total != undefined ? total : ele.timeLine.point}
                            </th>
                      </tr>
                    `
            }).join('');
            modal.innerHTML = `        
                        <thead>
                        <tr>
                            <th
                            class="px-6 bg-red-300 text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                            NAME GAMER
                            </th>
                            <th
                            class="px-6 bg-red-300 text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                            TOTAL POINT
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    ${result}
                    </tbody>`;
        })
        // on off modal 
        $('#btn_delete').addEventListener('click', () => {
            modal_content.classList.add('hidden');
            $('#game').classList.remove('blur');
        })

    }
    play() {

        this.modal();
        // this.saveHistoryPlayer();
        const content = $('#main');
        const btnStart = $('#start');
        const btnAgain = $('#again');
        const btnExit = $('#exit');
       
        $('#nameGamer').innerHTML = JSON.parse(localStorage.getItem('userLogin'));
        //btn start ---
        btnStart.addEventListener('click', async () => {

            $('#start').classList.add('hidden');
            $('#again').classList.remove('hidden');
            //timing
            let count = 300;
            const countTime = setInterval(() => {
                count--;
                if (count >= 0) {
                    $('#timeout').innerHTML = count.toString();
                }
                if (count === 0) {
                    const point = parseInt($('#point').textContent);
                    this.saveHistoryPlayer(point,300);
                    this.modal();
                    $('#timeout').innerHTML = 'Time Out';
                    content.innerHTML = '<p class="text-4xl font-bold uppercase">game over !</p>';
                }
            }, 1000)
            //render data
            const result = await this.getApi();
            content.innerHTML = result;
            // game
            let point = 0;
            const arrChoose = content.querySelectorAll('.onepokemon');
            arrChoose.forEach((div, index) => {
                //delay up hình
                setTimeout(() => {
                    div.classList.remove('transform-style-flip');
                }, 5000)

                div.addEventListener('click', () => {

                    div.classList.add('bg-gray-200', 'choosed', 'transform-style-flip');

                    const divChoosed = document.querySelectorAll('.choosed');

                    if (divChoosed.length === 2) {
                        const firstId = divChoosed[0].querySelector('input').value;
                        const secoundId = divChoosed[1].querySelector('input').value;
                        if (firstId === secoundId) {
                            //point
                            point += 5
                            $('#point').innerHTML = point.toString();

                            divChoosed.forEach(ele => {
                                ele.classList.add('bg-green-500');
                                setTimeout(() => {
                                    ele.classList.add('invisible');
                                    ele.classList.remove('bg-green-500', 'bg-gray-200', 'choosed');
                                    ele.querySelector('.choose').remove();
                                }, 800)
                            })
                            setTimeout(()=>{
                                if (point == 125) {
                                    //lưu thông tin người chơi vào local
                                    clearInterval(countTime);
                                    content.innerHTML = '<p class="text-4xl font-bold uppercase">You win 👏👏👏</p>';
                                    const gameTime =300 - parseInt($('#timeout').textContent);
                                    this.saveHistoryPlayer(point,gameTime);
                                    this.modal();
                                }
                            },800)
                            
                        } else {
                            divChoosed.forEach(ele => {
                                ele.classList.add('bg-red-600');
                                setTimeout(() => {
                                    ele.classList.remove('bg-red-600', 'bg-gray-200', 'choosed', 'transform-style-flip')
                                }, 800);
                            })
                        }

                    }
                })
            })
            //btn again
            btnAgain.addEventListener('click', async () => {
                clearInterval(countTime);
                $('#start').classList.remove('hidden');
                $('#again').classList.add('hidden');
                content.innerHTML = '';
                $('#timeout').innerHTML = '300';

            })
        })
        //btn exit
        btnExit.addEventListener('click', async () => {
            localStorage.removeItem('userLogin');
            window.location.reload();
        })
    }
    login() {

        const form = $('#form');
        const result = `
        <div class="flex font-bold justify-center mt-6">
        <img class="h-20 w-20"
            src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg">
        </div>
        <h2 class="text-3xl text-center text-gray-700 mb-4">Login</h2>
            <div class="px-12 pb-10">
                <div class="w-full mb-2">
                    <div class="flex items-center">
                        <i class='ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user'></i>
                        <input type='text' placeholder="Username" class="-mx-6 px-8  w-full border rounded px-3 py-2 text-gray-700 focus:outline-none" />
                    </div>
                </div>
        <a href="#" class="text-xs text-gray-500 float-right mb-4">Register?</a>
        <button type="submit" class="w-full py-2 rounded-full bg-green-600 text-gray-100  focus:outline-none">Login</button>
        `;

        form.innerHTML = result;

        const input = form.querySelector('input');
        form.addEventListener('submit', e => {
            e.preventDefault();
            if (input.value.trim() != '') {

                $('#game').classList.remove('hidden');
                $('#formLogin').classList.add('hidden');

                if (localStorage.getItem('userGamer') == null) {
                    localStorage.setItem('userGamer', '[{"name":"huyne","timeLine":[{"date":"April 15th 2021, 5:46:52 pm","point":20,"gameTime":300},{"date":"April 15th 2021, 6:46:52 pm","point":35,"gameTime":300},{"date":"April 15th 2021, 9:57:26 pm","point":30,"gameTime":300}]},{"name":"duy","timeLine":[{"date":"April 15th 2021, 5:46:52 pm","point":120,"gameTime":250},{"date":"April 15th 2021, 15:24:42 pm","point":20,"gameTime":300}]}]');
                }

                localStorage.setItem('userLogin', JSON.stringify(input.value));

                this.play();
            }
            else {
                input.style.border = 'red solid 1px'
            }

        })

    }
}
export default Assigment;