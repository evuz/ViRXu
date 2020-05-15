import React, { FC, useState, useEffect } from 'react';

type AvatarProps = {
  photo: string;
  name: string;
};

const randomImage = (name) => `https://eu.ui-avatars.com/api/?name=${name}&size=128`;

export const Avatar: FC<AvatarProps> = ({ photo, name }) => {
  const [url, setUrl] = useState(photo);

  useEffect(() => {
    setUrl(photo);
  }, [photo]);

  function fallback() {
    setUrl(randomImage(name));
  }

  return (
    <div className="Avatar">
      <img className="Avatar__img" onError={fallback} src={url || ''} alt={name} />
    </div>
  );
};
