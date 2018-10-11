import * as React from 'react';
import { Card } from 'antd';
import { withFindListings, WithFindListings } from '@abb/controllers';
import { Link } from 'react-router-dom';

const { Meta } = Card;

class C extends React.PureComponent<WithFindListings> {
  render() {
    const { listings, loading } = this.props;
    return (
      <div>
        {loading && <div>...loading</div>}
        {listings.map(l => (
          <Link to={`listing/${l.id}`} key={`${l.id}-card`}>
            <Card
              hoverable={true}
              style={{ width: 240 }}
              cover={l.pictureUrl && <img alt={l.name} src={l.pictureUrl} />}
            >
              <Meta title={l.name} description={l.owner.email} />
            </Card>
          </Link>
        ))}
      </div>
    );
  }
}

export const FindListingsConnector = withFindListings(C);
