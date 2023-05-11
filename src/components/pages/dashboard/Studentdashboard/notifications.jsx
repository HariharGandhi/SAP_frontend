import React, { useEffect, useState } from "react";
import NotificationPlacement from "../../../../services/NotificationPlacementapi";

const Notification = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    NotificationPlacement.getall().then((res)=> {
    
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
