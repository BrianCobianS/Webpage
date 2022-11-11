import inventory from "./Setinventory.js";
import ansible from "./Ansible.js";
import shel from "./shell.js";


const API = (req,res) =>{
    const eliminar = ['-','T',':']
    function removecharcter(x,b){
        while(x.indexOf(b)!= -1){
            x= x.replace(b,'')
        }    
        return x  
    }
    const {Controladores} = req.body
    for(let i=0;i<Controladores.length;i++){
        eliminar.forEach(element => Controladores[i].fecha=removecharcter(Controladores[i].fecha,element));
        console.log(Controladores[i])
        // console.log(Controladores[i].fecha)
        if (Controladores[i].fecha!= 'Now'){
            // console.log(Controladores[i].fecha)
            shel(Controladores[i])
        }else{
            inventory(Controladores[i])
            ansible(Controladores[i])
        }
    }    
    res.json({msg:`Recibiendo Controladores`})   

}

export default API;