import React, { FC } from 'react';
import { useLocation, Link, RouteComponentProps } from 'wouter';

import { Button } from '../components/Button';
import { domain } from '../../Services/domain';
import { copyUrlToClipboard } from '../../Utils/copyUrlToClipboard';

export const CreateRoom: FC<RouteComponentProps> = ({ params }) => {
  const [loc, setLocation] = useLocation();
  const { roomId } = params;
  console.log(loc);
  function click() {
    domain
      .get('createRoom')
      .execute({ name: 'New Room' })
      .then((room) => {
        console.log(room);
        setLocation(`${loc}/${room.id}`);
      });
  }

  return (
    <main className="CreateRoom">
      {roomId ? (
        <div>
          <Link to={`/room/${roomId}`}>
            <Button>Go room</Button>
          </Link>
          Share this room with your friend!
          <Button onClick={() => copyUrlToClipboard(`/room/${roomId}`)}>Copy room url</Button>
        </div>
      ) : (
        <Button onClick={click}>Create a new room</Button>
      )}
    </main>
  );
};
