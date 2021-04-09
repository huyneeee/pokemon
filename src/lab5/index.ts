class lab5 {
    bai1(){
        type Admin = {
            name : string;
            privileges : string[];
        };
        type Employee = {
            name : string;
            startDate : Date;
        };
        type ElevatedEmployee = Admin & Employee;
        
    }
    bai2(){
        class Car {
            drive(){
                console.log("Driving");
            }
        }
        class Truck {
            drive(){
                console.log('Driving a truck');
            }
            loadCargo(amount : number){
                console.log('Loading cargo '+amount);
            }
        }
        type Vehicle = Car | Truck;
        const v1 = new Car();
        const v2 = new Truck();

        function useVehicle(vehicle : Vehicle){
            vehicle.drive();
            if(vehicle instanceof Truck){
                vehicle.loadCargo(1000);
            }
        }
        useVehicle(v2);
    }
    bai3(){
        interface Bird {
            type : 'bird';
            flyingSpeed : number;

        }
        interface Horse {
            type : 'horse';
            runningSpeed : number;
        }
        type Animal = Bird | Horse;
        
        function moveAnimal(animal : Animal){
            let speed;
            switch(animal.type){
                case 'bird':
                    speed = animal.flyingSpeed;
                    break;
                case 'horse':
                    speed = animal.runningSpeed;
            }
            console.log('Moving at speed' + speed);
        }
        
    }
    bai4(){
        function merge <T extends object, U extends object>(objA : T,objB:U){
            return Object.assign(objA,objB);
        }
        const mergeObj = merge ({name : 'max',hobbies : ['Sports']},{age:30});
        console.log(mergeObj);

        //generic interface
        interface Lengthy {
            length : number;
        }
        function constAndDescribe <T extends Lengthy>(element : T) : [T,string] {
            let descriptionText  = 'Got no value';
            if(element.length===1){
                descriptionText ='Got 1 element'
            }else if(element.length>1){
                descriptionText = ` Got ${element.length} elements`
            }
            return [element,descriptionText];
        }
        //generic class
        class DataStorage <T extends string | number | boolean > {
            private data : T[] = [];
            addItem(item : T){
                this.data.push(item);
            }
            removeItem(item:T){
                if(this.data.indexOf(item)===-1){
                    return
                }else{
                    this.data.splice(this.data.indexOf(item),1);
                }
            }
            getItem(){
                return [...this.data];
            }
        }
        const textStorage = new DataStorage<string>();
        textStorage.addItem('Max');
        textStorage.addItem('Manu');
        textStorage.removeItem('Max');
        console.log(textStorage.getItem());
    }
    bai5() {
        const form = document.querySelector('#form');
        const result = `
        
            <input type = "text" class="border border-gray-600 py-3 px-3 w-100 ">
            <button type="submit" class="px-5 py-3 bg-black text-white button">Login</button>
        `;

        form.innerHTML = result;
        
        const button = form.querySelector('.button');
        const input = form.querySelector('input');
        form.addEventListener('submit',e=>{
            e.preventDefault();
            if(input.value==='huyne')
                window.location.href='https://www.facebook.com/';
            input.style.border = 'red solid 1px'
        })
    }
}
export default lab5;