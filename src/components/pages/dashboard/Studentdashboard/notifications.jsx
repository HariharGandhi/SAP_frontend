import React, { useEffect, useState } from "react";
import NotificationPlacementapi from "../../../../services/NotificationPlacementapi";

const Notification = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    NotificationPlacementapi.getall().then((res)=> {
      console.log(res.data);
      setData(res.data);
    });

    
  };

  useEffect(() => {
    getData();
    return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
  }, []);

  return (
    <div>
      {data.map((ele) => {
        return (
          <div className="box" key={ele.id}>
            <label>
              <h3>{ele.title} : {ele.body}</h3>
            </label>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
