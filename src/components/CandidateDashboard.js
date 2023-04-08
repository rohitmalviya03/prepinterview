
import React, { useEffect, useState  } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useLocation } from 'react-router-dom';

export default function CandidateDashboard() {

const [lang ,setLang]=useState('');
const navigate =useNavigate();
function handleSelectChange(event) {
    setLang(event.target.value);
  }
  
 function selectLang(params) {
    
    navigate('/interview', { state: { value: lang } });
}  
 
  console.log(lang)
  return (
   <><div class="d-flex justify-content-center">
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Select Language</label>
    <select className="w-100 mt-2" id="country" name="language"  value={lang} onChange={handleSelectChange}>
                                        <option value="">Select Language</option>
                                        <option value="java">Java </option>
                                        <option value="python">Python</option>
                                      
                                    </select>
   
    <small id="emailHelp" class="form-text text-muted">Keep practicing to imporve your skills...</small>
  </div>
  
  <button onClick={selectLang} class="btn btn-primary mt-2">Start Interview</button>
</form>
         </div>     
   </>
  );
}
