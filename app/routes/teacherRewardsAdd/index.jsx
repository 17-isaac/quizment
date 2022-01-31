import { useMemo, useEffect, useState } from 'react';
import { useLoaderData, useActionData, json, useLocation, Form, redirect } from 'remix';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getData } from '~/features/counterSlice';
import { db } from '../../utils/db.server';
import { store } from 'react-notifications-component';
import Button from 'react-bootstrap/Button';
import { io } from 'socket.io-client';
import { Prisma } from '@prisma/client';


export async function loader() {
  const data = await db.rewards.findMany();
  return data;
};

export let action = async ({ request }) => {
  const sID = 18;
  let formData = await request.formData();
  let newRName = formData.get('newRewardName');    
  let newRPts = formData.get('newRewardPoints');
  newRPts = parseInt(newRPts);
  let newRPic = formData.get('newRewardPicture');
  if(newRPic == null || ''){
    newRPic = 'https://firebasestorage.googleapis.com/v0/b/quizment-ae4a6.appspot.com/o/img%2Fdefault-image.png?alt=media&token=369e00f7-926d-4b3c-abbb-958828b303d5';
    try{
      const data = db.rewards.create({
        data: { rewardName: newRName, ptsRequired: newRPts, url: newRPic, isAvailable: 1 }
      })
      return json({newReward : newRName});
  
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      return e;
    }  
  }else{
    const storage = getStorage();
    const storageRef = ref(storage, 'img/' + newRPic.name);
    var file = newRPic;
    // Create file metadata including the content type
    /** @type {any} */
    const metadata = {
        contentType: newRPic.type,
    };
    uploadBytes(storageRef, file, metadata);

    await getDownloadURL(storageRef).then((downloadURL) => {
        console.log('File available at', downloadURL);
        try{
          const data = db.rewards.create({
            data: { rewardName: newRName, ptsRequired: newRPts, url: downloadURL, isAvailable: 1 }
          })
          return json({newReward : newRName});
      
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(e);
          }
          return e;
        }  
  })
}
}

export default function teacherRewards() {
  
  // to test socket.io
  const [username, setUsername] = useState("");
  const user = useSelector(getData).payload.myStore.value;
  //const [socket, setSocket] = useState(null);

  const reward = useLoaderData();
  const isAvailable = 1;
  const action = useActionData();
  let location = useLocation();
  let socket;

  useEffect(() => {
    if (action == null) {
      // no action done, do nothing
    } else {
      // add action done
      if (action.newReward) {
        notiAddSuccess(action.newReward);
        
      } else {
        notiAddFail(JSON.stringify(action.meta));
      }
    }
  }, [action])

  useEffect(() => {
    socket = io(location);
    socket?.emit("newUser", user);
  }, [socket, user]);

  function notiAddSuccess(reward) {
    store.addNotification({
      title: "Success",
      message: reward + " is successfully added !",
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  function notiAddFail(error) {
    return store.addNotification({
      title: "Error",
      message: "Can't add new reward ! Error details : " + error,
      type: "danger",
      insert: "top",
      container: "top-center",
      animationIn: ["animated", "bounceIn"],
      animationOut: ["animated", "bounceOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  return (
    <>
      <h1>Add Rewards</h1>
      <div className="Rewards Add">
          <Form method="post">
            <p><label>Reward Name : <input name='newRewardName' type="text"></input></label></p>
            <p><label>Points Required : <input name='newRewardPoints' type="number"></input></label></p>
            <label>Reward Picture : <input name='newRewardPicture' type="file"></input></label>
            <Button type="submit" variant="warning">Add</Button>
          </Form>
      </div>
    </>
  );
}