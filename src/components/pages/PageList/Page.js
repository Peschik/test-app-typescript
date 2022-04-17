import { Col } from 'react-bootstrap';
import './page.scss';

const Page = ({content}) => {
    return (
            <Col  sm={8} lg={10}>
                {content}
            </Col>
    )
}


export default Page;