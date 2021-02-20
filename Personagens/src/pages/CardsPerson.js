import React,{ useState , useContext} from 'react';
import { Redirect  } from 'react-router-dom';
import infoContext from '../context/infoContext'

function CardPerson ({match}) {

    
    const { id } = match.params


    const addName = ({ target }) => {
        const { value } = target
        setName(value)
    }

    const addRyus = ({ target }) => {
        const { value } = target
        setRyus(value)
    }
    

    const datacheck = JSON.parse(localStorage.getItem('data')) || { infoRyus: [] }

    const { diretoryImage , setDiretoryImage } = useContext(infoContext)
    const [dataRyus, setRyus] = useState(0);
    const [name, setName] = useState('');
    const {infoRyus} = datacheck
    const [ status , setStatus] = useState(false)
    const [spent, setSpent] = useState('');
    const [gain, setGain] = useState('');
    const [itemGain, setItemGain] = useState('');
    const [itemSpent, setItemSpent] = useState('');
    const [edit , setEdit] = useState(false);
    


    const showAlert = (message) => {
        alert(message)
    }


    const changeSpent = ({ target }) => {
        const { value } = target;
        setSpent(value);

    }

    const changeGain = ({ target }) => {
        const { value } = target;
        setGain(value);
    }

    
    const changeSorted = (a, b) => {
        if (a.name > b.name) {
            return 1
        }
        if (a.name < b.name) {
            return -1
        }

        return 0
    }


    const deletePerson = (id) => {
        if( infoRyus.length === 1 ) {
             
            infoRyus.sort(changeSorted).splice(infoRyus.indexOf(id) , 1)
            infoRyus.sort(changeSorted).forEach((info, index) => {
              info.id = index
            })
             
             localStorage.setItem('data', JSON.stringify(datacheck));
             setStatus(!status);
        
        } else {
        infoRyus.sort(changeSorted).splice(infoRyus.indexOf(id) , 1)
        infoRyus.sort(changeSorted).forEach((info, index) => {
          info.id = index
        })
         
         localStorage.setItem('data', JSON.stringify(datacheck));
         setStatus(!status);
    }
       }
    
      

    const updateValuesSpent = (id) => {
        if(spent === '' || itemSpent ==='') {
            showAlert('Dijite as informações')
        } else {
        infoRyus[id].ryus =infoRyus[id].ryus - Number(spent);
        const spentPerson = { id: 0, itemSpent: itemSpent, valueItemSpent: spent, }
        infoRyus[id].spentItens.push(spentPerson)
        localStorage.setItem('data', JSON.stringify(datacheck))
        setStatus(!status);
        }
    }

    console.log(id)
    const updateValuesGain = (id) => {
        if(gain === '' || itemGain === '') {
          showAlert('Dijite as informações')
        } else {
        infoRyus[id].ryus = infoRyus[id].ryus + Number(gain)
        const gainPerson = { id: 0, itemGain: itemGain, valueItemGain: gain }
        infoRyus[id].gainItens.push(gainPerson)
        localStorage.setItem('data', JSON.stringify(datacheck))
        setStatus(!status);
        }
    }


    const changeItemSpent = ({ target }) => {
        const { value } = target;
        setItemSpent(value)
    }

    
    const changeItemGain = ({ target }) => {
        const { value } = target;
        setItemGain(value)
    }


    const editPerson = () => {
        setName(infoRyus[id].name)
        setRyus(infoRyus[id].ryus)
        setDiretoryImage(infoRyus[id].img)
        setEdit(!edit)
      
    }

    const confirmEdit = () => {
        infoRyus[id].name = name
        infoRyus[id].ryus = dataRyus
        infoRyus[id].img = diretoryImage
        localStorage.setItem('data', JSON.stringify(datacheck))
        setStatus(!status);
        setDiretoryImage('') 
    }

    const uploadImageNet = ({target}) => {
        const {value} = target;
        setDiretoryImage(value)
    }
    
    
    if(infoRyus[id] === undefined) return <Redirect to="/infoperson" />
    
    return (
        
       <div className="card-info-details" >
           <div className="title" >
            <h1 className="card-title" >Detalhes do Personagem</h1>
            </div>
            
            <div className="container-img-person" >
                            <img hidden={infoRyus[id].img !== '' ? '' : 'hidden'} className="images-person-details"  alt="personagem" src={infoRyus[id].img} />
                            </div>
  
<div className="conteiner-name" >
                            <p className="title is-3" >{infoRyus[id].name}</p>
                        </div>
                        <div className="ryus-title-card">
                            <p className="title is-4" >${infoRyus[id].ryus}</p>
                        </div>
              <div className="tables">
                            <div>
                                <h2 className="title is-5" >Gastos</h2>
                                <table border="1">
                                    <thead>
                                        <tr>
                                            <th> Item ou Evento </th>
                                            <th> Valor </th>
                                        </tr>
                                    </thead>

                                    {infoRyus[id].spentItens.map((item,index2) => {
                                        return (
                                            <tbody key={index2} >
                                                <tr>
                                                    <td>{item.itemSpent}</td>
                                                    <td>{item.valueItemSpent}</td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}

                                </table>
                            </div>
                            <div>
                                <h2 className="title is-5" >Ganhos</h2>
                                <table border="1">
                                    <thead>
                                        <tr>
                                            <th> Item ou Evento </th>
                                            <th> Valor </th>
                                        </tr>
                                    </thead>

                                    {infoRyus[id].gainItens.map((item ,index2) => {
                                        return (
                                            <tbody key={index2}>
                                                <tr>
                                                    <td>{item.itemGain}</td>
                                                    <td>{item.valueItemGain}</td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}

                                </table>
                            </div>

                        </div>
                        <div>
                            <div className="input-info-values">
                                
                                  
                                <input className="inputs-info" onChange={changeSpent} type="number" size="small" />
                                <label> com:</label>
                                <input className="inputs-info" onChange={changeItemSpent} type="text" />
                                <button className="button is-danger is-small is-rounded" onClick={() => updateValuesSpent(infoRyus[id].id)}>Gastou</button>


                            </div>
                            <div className="input-info-values" >
                                
                                <input className="inputs-info"  onChange={changeGain} type="number" />
                                <label>com:</label>
                                <input className="inputs-info" onChange={changeItemGain} type="text" />
                               
                                <button className="button is-link is-small is-rounded" onClick={() => updateValuesGain(infoRyus[id].id)} >Ganhou</button>
                            </div>
                            <button onClick={() => deletePerson(infoRyus[id])} className="button is-warning  is-rounded">
                               Excluir
                        </button>
                        <button className="button is-primary is-rounded" onClick={editPerson} >Editar</button>
                        <div  className="container-initial" >
                        <form hidden={edit ? '' : 'hidden'} >
                
                <div className="field form-initial" >
                <label className="label" >Nome:</label>
                <div className="control">
              <input value={name} onChange={addName} type="text" />
              </div>
                </div>
                <div className="field form-initial" >
                <label className="label" > Ryus: </label>
                <div className="control" >
                  <input value={dataRyus} onChange={addRyus} type="number" />
                  </div>
                  </div>
           <div></div>
        <div className="uploadImage" >
        <label>Insira o Link da imagem:</label>
        <input value={diretoryImage} onChange={uploadImageNet} type="text" />
    </div>
    
            </form>
            <div  hidden={edit ? '' : 'hidden'} className="confirm-edit" >

            
            <button className="button is-success is-rounded" type="button" onClick={confirmEdit}>Confirmar</button>
            </div>
            </div>
           
                        </div>
       </div>
    )
}

export default CardPerson;