class KPromise{
    constructor(handle){
        this.status = "pending";
        this.value = undefined;
        handle(function(val){
            console.log(val)
        }, function(err){
            console.log(err)
        });
    }
}