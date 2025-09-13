import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { imgSrc } from "../../../config";

const AdCard = ({ ad }) => (
  <Card className="h-100">
    <div style={{ height: 200, overflow: "hidden" }}>
      {ad.photo && (
        <img
          src={imgSrc(ad.photo)}
          alt={ad.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </div>
    <Card.Body>
      <Card.Title className="fs-6 mb-1">{ad.title}</Card.Title>
      <div className="text-muted mb-2">{ad.location}</div>
      <div className="fw-semibold mb-3">{ad.price} zł</div>
      <Button as={Link} to={`/ad/${ad._id}`} variant="primary" size="sm">
        Read more
      </Button>
    </Card.Body>
  </Card>
);

export default AdCard;
