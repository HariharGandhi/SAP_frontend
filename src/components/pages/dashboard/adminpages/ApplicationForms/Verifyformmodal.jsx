import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import "./Verifyformmodal.css"
import {BASE_URL} from "../../../../../services/Globalvalues";
const useStyles = makeStyles({
  // your styles here
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    marginRight: '10px',
  },
});


const VerifyFormmodal = () => {
    const Uid = Number(localStorage.getItem('Userid'))
    const classes = useStyles();
   
  const [data, setData] = useState([]);
  //const [search, setSearch] = useState('')
  useEffect(() => {
            (async () => {
              try {
                const { data } = await axios.get(BASE_URL + `api/getDetailsByUserid/{UserId}`,{
                  params : {
                    UserId : Uid
                  }
                });
                setData(data);
               
                //setSid(data.records.student_id);
              } catch (error) {
               // console.log(error);
              }
            })();
          },[Uid]);

  return (
    <>
    
      <div className="container">
  <Card key={data.id}>
    <CardHeader title={`Name: ${data.name}`} subheader={`SAP Module: ${data.sapModule}`} />
    <CardContent>
     
      <div className={classes.row}>
        <h4 className={classes.label}>Email:</h4>
        <p>{data.email}</p>
      </div><hr />
      <div className={classes.row}>
        <h4 className={classes.label}>Branch:</h4>
        <p>{data.branch}</p>
      </div><hr />
      <div className={classes.row}>
        <h4 className={classes.label}>Contact Number:</h4>
        <p>{data.contactNumber}</p>
      </div><hr />
      <div className={classes.row}>
        <h4 className={classes.label}>Year of Passout:</h4>
        <p>{data.passoutYear}</p>
      </div><hr />
      <div className={classes.row}>
        <h4 className={classes.label}>Type of student:</h4>
        <p>{data.studentType}</p>
      </div><hr />
      <div className={classes.row}>
        <h4 className={classes.label}>Adhar Card Number:</h4>
        <p>{data.adhaarCard}</p>
      </div><hr />
      <div className={classes.row}>
        <h4 className={classes.label}>Application Form Status:</h4>
        <p>{data.applicationFromStatus}</p>
      </div><hr />
      <div className={classes.row}>
        <h4 className={classes.label}>Is Query present in application:</h4>
        <p>{data.isQueryInApplication ? "Yes" : "No"}</p>
      </div><hr />
    </CardContent>
  </Card>
    

      </div>
    </>
  );
};
export default VerifyFormmodal;
