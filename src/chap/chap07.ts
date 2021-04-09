
export  const demo1 = ()=>{
    function tinhtong <T> (a:T) : T {
        return a;
    }
    console.log(tinhtong<number>(9));
    console.log(tinhtong<string>('huy'));
    
}
export const demo2 = ()=>{
    class product {
        id : number;
        name : string;
        price : number;

        showList <T> (list : T[]) : T[] {
            return list;
        }
        showInfo() : void {
            console.log(`
                id : ${this.id}
                name : ${this.name}
                price : ${this.price}
            `);
        }
    }
    const nokia = new product();
    console.log(nokia.showList<string>(["Nokia","9 USD"]));
    console.log(nokia.showList<number>([19,2]));
    console.log("============================================");
    class product1<A,B,C> {
        id : A;
        name : B;
        price : C;

        constructor (id : A,name:B,price : C){
            this.id = id;
            this.name = name;
            this.price = price;
        }
        showList <T> (list : T[]) : T[] {
            return list;
        } 
        
        showInfo() : void {
            console.log(`
                id : ${this.id}
                name : ${this.name}
                price : ${this.price}
            `);
        }
    }
    const iphone = new product1<number,string,number>(1,'Iphone12',100);
    const samsung = new product1<string,string,string>('1','Samsung S20','200');

    console.log(iphone.showList<string>(['hihi','hehe']));
    samsung.showInfo();

}