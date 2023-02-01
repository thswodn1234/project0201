import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from "./SelectDate";
import Modal from 'react-modal';
import Barchart from './BarChart';

function MyModal(props){
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [lead, setLead] = useContext(AppContext);

  const [list, setList] = useState();
  // const [machinery, setMachinery] = useState();
  // const [items, setItems] = useState();
  // const [part, setPart] = useState();

  const machinery = props['props']?.[0]['machinery']
  const items = props['props']?.[0]['items']
  const part1 = props['props']?.[0]['part1']

  useEffect(()=>{
    // setMachinery(props['props']?.[0]['machinery'])
    // setItems(props['props']?.[0]['items'])
    // setPart(props['props']?.[0]['part1'])
    getPastLeadtime();

  },[props])

  const getPastLeadtime = async () => {
    
    let url = `http://10.125.121.177:8080/data/past_leadtime?machinery=${machinery}&items=${items}&part1=${part1}`;

    try {
      const resp = await fetch(url);
      const data = await resp.json();
      setList(data)
    } catch (err) {
      console.log(err);
    }
  }

  // console.log("load", machinery,items, part)

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  

  return(
    <>
      <button onClick={() => setModalIsOpen(true)}>Modal Open</button>
	    <Modal isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)} 
        ariaHideApp={false} 
        style={customStyles}>
        <Barchart props={list}/>
      </Modal>
    </>
  )
};
export default MyModal;