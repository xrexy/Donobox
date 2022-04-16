import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFundraiser } from '../../utils/api';

interface Props {}
export const ViewFundraiser: React.FC<Props> = () => {
  const params = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fundraiserId, setFundraiserId] = useState(params.fundraiserId);
  const [fundraiser, setFundraiser] = useState<Fundraiser>();

  useEffect(() => {
    if (!fundraiserId) {
      navigate('/');
      return;
    }

    getFundraiser(fundraiserId).then((res) => {
      if (!res.data) {
        navigate('/');
        return;
      }
      setFundraiser(res.data);
    });
  }, [fundraiserId, navigate]);

  return (
    <>
      {fundraiser ? (
        <h1>{fundraiser.title}</h1>
      ) : (
        <h1>No fundraiser with that ID found</h1>
      )}
    </>
  );
};
