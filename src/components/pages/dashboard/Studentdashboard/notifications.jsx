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
              {ele.title}:
              <p>{ele.body}</p>
            </label>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
