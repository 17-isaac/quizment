import { useEffect, useState } from 'react';
import { useLoaderData, useActionData, json, useLocation, Form, redirect } from 'remix';
import { useSelector } from 'react-redux';
import { getData } from '~/features/counterSlice';
import { db } from '~/utils/db.server';
import { store } from 'react-notifications-component';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { Prisma } from '@prisma/client';

export async function loader() {
  const data = await db.rewards.findMany();
  return data;
};

export let action = async ({ request }) => {
  const sID = 18;
  let formData = await request.formData();

    let rID = formData.get('rewardID');
    let rName = formData.get('rewardName');
    rID = parseInt(rID);
  
    try{
      const data = await db.rewards.delete({
        where: { rewardID : rID }
      })
      return json({rewardName : rName});
  
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      return e;
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
      // delete action done
      if (action.rewardName) {
        notiAddSuccess(action.rewardName);

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
      message: reward + " is successfully deleted !",
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
      message: "Can't delete the reward ! Error details : " + error,
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
      <h1>Rewards</h1>
      <div className="Rewards">
      <p>Add Reward <Button variant="warning" onClick={redirect("/teacherRewardsAdd")}><img src="https://img.icons8.com/ios-glyphs/25/ffffff/add--v1.png"/></Button></p>
        <Row xs={3} md={3} lg={3} className="g-3">
          {reward && reward.map(reward =>
            <Col key={reward.rewardID}>
              <Card border="dark">
                <Card.Img className="cardPic" variant="top" src={reward.url}
                  style={{ width: '5em', height: '5em' }} />
                <Card.Body className="cardBody">
                  <Form method="post">
                    <Card.Title>{reward.rewardName}</Card.Title>
                    <Card.Text>Points : {reward.ptsRequired}</Card.Text>
                    <Button variant="primary" onClick={redirect("/teacherRewardsEdit")} ><img src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/25/ffffff/external-edit-interface-kiranshastry-solid-kiranshastry.png"/></Button>
                    <input name='rewardID' value={reward.rewardID} type='hidden'></input>
                    <input name='rewardName' value={reward.rewardName} type='hidden'></input>
                    <Button type="submit" variant="danger"><img src="https://img.icons8.com/ios-glyphs/25/ffffff/filled-trash.png"/></Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}