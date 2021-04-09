class lab3 {
    bai1(){
        const Sum = () : number=>{
            return 9+2;
        }
        console.log(`Tổng hàm sum k tham số  : ${Sum()}`);

        // function default parameter
        const fnDefaulParam = ( a : string = 'Default Parameter') : void =>{
            console.log(a);
        }
        // function option parameter
        const fnOptionParam = ( a?: number ) : number =>{
            if(a){
                return a;
            }
        }

        //function rest parameter
        const fnRestParam = ( ...values : string[]) : void =>{
            for( let ele of values ){
                console.log(ele);
            }
        }

        fnDefaulParam();
        // console.log(`function k tham số : ${fnOptionParam()}`);
        console.log(`function có tham số : ${fnOptionParam(3)}`);
        console.log('===================');
        fnRestParam('huy','ne','hihi');

        // array
        const hobbies : string[] = ['Sports','Cooking'];
        const activeHobbies : string[] = ['Hiking'];
        const newHobbies = [ ...activeHobbies,...hobbies];
        console.log(newHobbies);
    }
    bai2(){
        //function and void
        let sum = ( x : number=5, y?:number) =>{
            return x + <number>y;
        }
        let speech = (output : any) : void =>{
            console.log(`Result ${output}`);
        }
        speech(sum(9,12));
        // console.log(speech(sum(8,5)));

        // never & void
        let something : void = undefined;
        // let nothing : never = null; 
        function throwError (err : string) : never {
            throw new Error(err);
        }
        //function & callback

        function addHandle( x:number , y:number,callback:(num:number)=>void){
            const result = x+y;
            callback(result);
            
        }
        function callback(x){
            console.log(x);
        }
        addHandle(10,20,callback);
    }
}
export default lab3;