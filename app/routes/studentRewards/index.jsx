import { useEffect, useState } from 'react';
import { useLoaderData, useActionData, json, useLocation, Form, redirect } from 'remix';
import { useSelector } from 'react-redux';
import { getData } from '~/features/counterSlice';
import { db } from '../../utils/db.server';
import { store } from 'react-notifications-component';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { io } from 'socket.io-client';

export async function loader() {
  const data = await db.rewards.findMany();
  return data;
};

export let action = async ({ request }) => {
  const sID = 18;
  let formData = await request.formData()
  let rID = formData.get('rewardID');
  let rPts = formData.get('rewardPts');
  let rName = formData.get('rewardName');
  rID = parseInt(rID);
  rPts = parseInt(rPts);

  const data = {
    student: await db.student.findUnique({
      where: { studentID: sID },
      select: { redeemedPts: true, totalPts: true }
    })
  }

  const redeemPts = data.student.redeemedPts;

  if (redeemPts >= rPts) {

    let newPts = redeemPts - rPts;

    const data2 = {
      reward: await db.rewardHistory.create({
        data: { studentID: sID, rewardID: rID, isCollected: 1 }
      })
    }

    const data3 = {
      points: await db.student.update({
        where: { studentID: sID },
        data: { redeemedPts: newPts }
      })
    }
    return json({ rewardNameInput: rName }, redirect("/studentRewards"));

  } else {
    // cannot redeem
    let points = rPts - redeemPts;
    console.log("not enough");
    return json({ lackingpoints: points });
  }
}


export default function studentRewards() {
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
      // redeem action done, check if success or fail

      if (action.lackingpoints) {
        notiRedeemFail(action.lackingpoints);

      } else {
        notiRedeemSuccess(action.rewardNameInput);
      }
    }
  }, [action])

  useEffect(() => {
    socket = io(location);
    socket?.emit("newUser", user);
  }, [socket, user]);

  function notiRedeemSuccess(rewardName) {
    store.addNotification({
      title: "Success",
      message: "Congratulations! You've successfully redeemed " + rewardName + " !",
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  function notiRedeemFail(points) {
    return store.addNotification({
      title: "Error",
      message: "You are insufficient of " + points + " points to redeem this reward. Work harder!",
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
        <Row xs={1} md={2} lg={3} className="g-4">
          {reward && reward.map(reward =>
            <Col key={reward.rewardID}>
              <Card border={isAvailable == reward.isAvailable ? "warning" : "danger"}>
                <Card.Img className="cardPic" variant="top" src={reward.url}
                  style={{ width: '10em', height: '10em' }} />
                <Card.Body className="cardBody">
                  <Form method="post">
                    <Card.Title>{reward.rewardName}</Card.Title>
                    <input name='rewardID' value={reward.rewardID} type='hidden'></input>
                    <input name='rewardPts' value={reward.ptsRequired} type='hidden'></input>
                    <input name='rewardName' value={reward.rewardName} type='hidden'></input>
                    <Card.Text>Points : {reward.ptsRequired}</Card.Text>
                    {isAvailable == reward.isAvailable
                      ? <Button type="submit" variant="warning">Redeem</Button>
                      : <p>Currently unavailable</p>}
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